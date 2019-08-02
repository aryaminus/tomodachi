const express = require("express"),
  path = require("path"),
  { Client } = require("pg"),
  passport = require("passport"),
  FacebookTokenStrategy = require("passport-facebook-token"),
  cors = require("cors"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser");

const config = require("./configuration/config"),
  {
    generateToken,
    sendToken,
    validateToken
  } = require("./configuration/token");

const app = express(),
  corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"]
  };

const port = process.env.PORT || 5000;

//Define Postgres parameters
// let connectionString = "postgresql://localhost/arms";
let connectionString =
  "postgres://gtosqajvewsfyx:6e7aaefd0cf08f6e54f48cdd4029d21a226b53d6dbda9cb43b42e5164c5d5e38@ec2-107-20-185-16.compute-1.amazonaws.com:5432/d7ij3pco2968rk";
const client = new Client({
  connectionString: connectionString,
  ssl: true
});
client.connect();

// Use the FacebookStrategy within Passport.
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.facebook_api_key,
      clientSecret: config.facebook_api_secret
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        //Check whether the User exists or not using profile.id
        if (config.use_database) {
          // if sets to true
          client.query(
            "SELECT * from users where user_id = $1",
            [profile.id],
            function(err, rows) {
              if (err) throw err;
              if (rows && rows.rowCount === 0) {
                console.log("There is no such user, adding now");
                client.query(
                  "INSERT into users(user_id,user_name) VALUES($1, $2)",
                  [profile.id, profile.displayName]
                );
              } else {
                console.log("User already exists in database");
              }
            }
          );
        }
        return done(null, profile);
      });
    }
  )
);

app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function(req, res) {
//   res.render("index", { user: req.user });
// });

app.get("/token", validateToken, function(req, res) {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    return res.json({
      data: req.decoded
    });
  }
});

app.post(
  "/api/auth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id
    };
    next();
  },
  generateToken,
  sendToken
);

app.get("/api/contacts/get/:id", validateToken, (req, res) => {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    client.query(
      "SELECT * from contacts where user_id = $1",
      [req.params.id],
      function(err, rows) {
        if (err) throw err;
        if (rows) {
          return res.json({
            data: rows.rows
          });
        } else {
          return res.json({
            data: "No content"
          });
        }
      }
    );
  }
});

app.post("/api/contacts/add", validateToken, (req, res) => {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    client.query("SELECT * from contacts", function(err, rows) {
      if (err) throw err;
      client.query(
        "INSERT into contacts(user_id,firstName, lastName, email, phone) VALUES($1, $2, $3, $4, $5)",
        [
          req.body.user_id,
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.phone
        ]
      );
      return res.json({
        data: "Field Added"
      });
    });
  }
});

app.delete("/api/contacts/delete/:id", validateToken, (req, res) => {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    client.query("SELECT * from contacts", function(err, rows) {
      if (err) throw err;
      client.query("DELETE FROM contacts WHERE id = $1", [req.params.id]);
      return res.json({
        data: "Field Deleted"
      });
    });
  }
});

app.get("/api/contacts/edit/:id", validateToken, (req, res) => {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    client.query("SELECT * from contacts", function(err, rows) {
      if (err) throw err;
      client.query("SELECT * FROM contacts WHERE user_id = $1 AND id = $2", [
        req.params.user_id,
        req.params.id
      ]);
      return res.json({
        data: "Field Deleted"
      });
    });
  }
});

app.put("/api/contacts/update/:id", validateToken, (req, res) => {
  if (!req.decoded) {
    return res.send(401, "Authentication error. Token not entered or invalid");
  } else {
    client.query("SELECT * from contacts", function(err, rows) {
      if (err) throw err;
      client.query(
        "UPDATE contacts SET firstname = $1, lastname = $2, email = $3, phone = $4 WHERE id = $5",
        [
          req.query.firstName,
          req.query.lastName,
          req.query.email,
          req.query.phone,
          req.params.id
        ]
      );
      return res.json({
        data: "Field Updated"
      });
    });
  }
});

// app.get("/account", ensureAuthenticated, function(req, res) {
//   res.render("account", { user: req.user });
// });

// app.get("/logout", function(req, res) {
//   req.logout();
//   res.redirect("/");
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
