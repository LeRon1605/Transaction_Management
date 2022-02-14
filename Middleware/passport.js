const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../db/User');
const bcrypt = require('bcryptjs');
const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try{
        const user = await User.findOne({ username });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) done(null, user);
            else done(null, false);
        }else done(null, false);
      }catch(err){ 
          done(err, false);
      }
    }
));

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'LeRon'
}, async (payload, done) => {
    try{
        const user = await User.findById(payload.sub);
        if (user) done(null, user);
        else done(null, false);
    }catch(err){
        done(err, false);
    }
}));
