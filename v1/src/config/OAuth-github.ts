import passport from "passport";
const GitHubStrategy = require("passport-github2").Strategy;

export default () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: `8f947242af8ad207925f`,
        clientSecret: `30223da17382fd70c35221b5f2f9f6f3da114021`,
        callbackURL: "http://localhost:4000/api/auth/github/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) {
        // called when user is authenticated
        // insert or update user data in database
        console.log(profile);
        cb(null, profile);
      }
    )
  );
};
