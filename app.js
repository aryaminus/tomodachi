const express = require("express"),
  path = require("path"),
  { Client } = require("pg"),
  passport = require("passport"),
  FacebookTokenStrategy = require("passport-facebook-token"),
  cors = require("cors"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser");

const config = require("./configuration/config"),
  { generateToken, sendToken } = require("./configuration/token");

const app = express(),
  corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"]
  };

const port = process.env.PORT || 4000;

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
            "SELECT * from users where user_id=" + profile.id,
            (err, rows) => {
              if (err) throw err;
              if (rows && rows.rowCount === 0) {
                console.log("There is no such user, adding now");
                client.query(
                  "INSERT into users(user_id,user_name) VALUES('" +
                    profile.id +
                    "','" +
                    profile.displayName +
                    "')"
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
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

app.post(
  "/auth/facebook",
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

app.get("/api/contacts/get/:id", (req, res) => {
  client.query(
    "SELECT * from contacts where user_id=" + req.params.id,
    (err, rows) => {
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
});

app.post("/api/contacts/add", (req, res) => {
  client.query("SELECT * from contacts", (err, rows) => {
    if (err) throw err;
    client.query(
      "INSERT into contacts(user_id,firstName, lastName, email, phone) VALUES('" +
        req.body.user_id +
        "','" +
        req.body.firstName +
        "','" +
        req.body.lastName +
        "','" +
        req.body.email +
        "','" +
        req.body.phone +
        "')"
    );
    return res.json({
      data: "Field Added"
    });
  });
});

app.delete("/api/contacts/delete/:id", (req, res) => {
  client.query("SELECT * from contacts", (err, rows) => {
    if (err) throw err;
    client.query("DELETE FROM contacts WHERE id=" + req.params.id);
    return res.json({
      data: "Field Deleted"
    });
  });
});

app.get("/api/contacts/edit/:id", (req, res) => {
  client.query("SELECT * from contacts", (err, rows) => {
    if (err) throw err;
    client.query(
      "SELECT * FROM contacts WHERE user_id=" +
        req.params.user_id +
        " AND id=" +
        req.params.id
    );
    return res.json({
      data: "Field Deleted"
    });
  });
});

app.put("/api/contacts/update/:id", (req, res) => {
  client.query("SELECT * from contacts", (err, rows) => {
    if (err) throw err;
    client.query(
      `UPDATE contacts SET firstname = '${req.query.firstName}', lastname = '${
        req.query.lastName
      }', email = '${req.query.email}', phone = '${
        req.query.phone
      }' WHERE id = ${req.params.id}`
    );
    return res.json({
      data: "Field Updated"
    });
  });
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
