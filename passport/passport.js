const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => {}
  )
);
