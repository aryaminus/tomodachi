module.exports = {
  facebook_api_key: "2430182417265110",
  facebook_api_secret: "70c6aa87a216b2f8e7ec75d94f314213",
  callbackURL: "https://tomodachi977.herokuapp.com/api/auth/facebook/callback",
  profileURL:
    "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email",
  // callback_url: "http://localhost:3000/auth/facebook/callback",
  use_database: true,
  host: "localhost",
  username: "root",
  password: "5432",
  database: "arms"
};
