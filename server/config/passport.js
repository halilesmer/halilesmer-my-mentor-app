import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import * as dotenv from "dotenv";
import MentorsModel from "../models/mentorsModel.js";
import MenteesModel from "../models/menteesModel.js";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  console.log('jwt_payload :>> ', jwt_payload);
  if(jwt_payload.user_type === "mentor"){
    MentorsModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
      console.log("user", user);
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }else {
     MenteesModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
       console.log("user", user);
       if (err) {
         return done(err, false);
       }
       if (user) {
         return done(null, user);
       } else {
         return done(null, false);
         // or you could create a new account
       }
     });
  }
  
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};
export { passportConfig };
