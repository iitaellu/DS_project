const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret; 
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload.id)
        Doctor.findById(jwt_payload.id, (err, doctor) => {
            if(err){
                return done(err, false);
            }
            if(doctor) {
                return done(null, patient);
            }
            else{
                return done(null, false);
            }
        })
    }));
}