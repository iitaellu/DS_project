/*Help From:
https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ
https://stackoverflow.com/questions/25896753/passportjs-using-multiple-passports-within-express-application
https://version.lab.fi/Erno.Vanhala/web-applications-week-5/-/blob/master/public/js/wall.js
https://version.lab.fi/Erno.Vanhala/web-applications-week-7/-/blob/master/models/User.js
https://version.lab.fi/Erno.Vanhala/web-applications-week-4
https://www.youtube.com/watch?v=qrDlIiq9zAc */



const express = require('express');
const router = express.Router();
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const doctorPassport = require('passport');
const Message = require("../models/messages");
const messages = require('../models/messages');
const doctor = require('../models/doctor');


//LoginAsDoctor
router.get('/authenticateDoctor', (req, res, next) => {
    res.send("LOGIN AS DOCTOR")
});

router.post('/authenticateDoctor', (req, res, next) => {
    //const username = req.body.username;
    const password = req.body.password;

    Doctor.findOne({username: req.body.username}, (err, doctor)=>{
        //Should send id of failure
        if(err) throw err; //res.render('/failure')
        if(!doctor) {
            //Error number 1 send to 
            return res.json({success: false, msg: 'User not found'});
            //res.render('/failure')
            //return res.status(403).json({message: "Login faile :("});
        }
        else{
            if(password == doctor.password){
                const jwtPayload = {
                    id: doctor._id,
                    username: doctor.username
                }
                const token = jwt.sign(jwtPayload, config.secret, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                success: true, 
                token: 'JWT '+token,
                name: doctor.username
                });
            } else{
                //res.render('/failure')
                return res.json({success: false, msg: 'Wrong password'});
            }
              
        }
    })
});

router.get('/authenticatePatient', (req, res, next) => {
    res.send("LOGIN AS PATIENT")
});

//Authenticate Patient
router.post('/authenticatePatient', (req, res, next) => {
    //const username = req.body.username;
    const secret = req.body.secretcode;

    Patient.findOne({username: req.body.username}, (err, patient)=>{
        //Should send id of failure
        if(err) throw err; //res.render('/failure')
        if(!patient) {
            return res.json({success: false, msg: 'User not found'});
            //res.render('/failure')
            //return res.status(403).json({message: "Login faile :("});
        }
        else{
            if(secret == patient.secretcode){
                const jwtPayload = {
                    id: patient._id,
                    username: patient.username
                }
                const token = jwt.sign(jwtPayload, config.secret, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                success: true, 
                token: 'JWT '+token,
                name: patient.username
                });
            } else{
                //res.render('/failure')
                return res.json({success: false, msg: 'Incorrect identification'});
            }
              
        }
    })
});

//User info (User info and unread messages)
router.get('/profilePatient', passport.authenticate('jwt', {session:false}), async (req, res, next)=>{
    unread = 0;
    const msgs = await Message.find({})
    for(let i = 0; i<msgs.length; i++){
        if(msgs[i].patient == req.body.patient && msgs[i].read == false){
            unread++           
        }
    }
    res.json({user: req.user.username, unread: "you have unread messages in " + unread + " discussions"});
});

//after cliking message
router.get('/readMessages', (req, res, next)=>{
    const id = req.body.messageID;
    Message.findById(id, (err, message) => {
        if(err) throw err;
        if(message){
            Message.findByIdAndUpdate(req.body.messageID, {$set:{ read: true}}, (err, doc)=> {
                if(err) throw err;
                let messages = [];
                for (let i = 0; i < doc.msg.length; i++){
                    if (doc.msg[i][1] == message.patient){
                        oneMessage = "P: "+ doc.msg[i][2];
                        messages.push(oneMessage);
                    }
                    if(doc.msg[i][1] == message.doctor){
                        oneMessage = "D: "+ doc.msg[i][2];
                        messages.push(oneMessage);
                    }
                }
                res.json({message: messages})                
            })
        }
        else{
            return res.json({success: false, msg: 'messages not found'});
        }
    })
    //res.json({message: req.body});
});

//Send messsage in old message
router.post('/sendMessage', (req, res, next) => {

    const id = req.body.messageID;
    Message.findById(id, (err, message) => {
        if(err) throw err;
        if(message){
            msg = message.msg;

            newMsg= [msg.length, req.body.sender, req.body.message]
            msg.push(newMsg)
            //msg.add(req.body.message)
            //FROM https://www.youtube.com/watch?v=qrDlIiq9zAc
            Message.findByIdAndUpdate(req.body.messageID, {$set:{ msg: msg, read: false}}, (err, doc)=> {
                if(err) throw err;
                res.json(doc)
            })
        }
        else{
            return res.json({success: false, msg: 'messages not found'});
        }
    })
})

//Send new messsage
router.post('/sendNewMessage', (req, res, next) => {

    msg = [0, req.body.patient, req.body.msg];

    let newMessage = new Message ({
        patient: req.body.patient,
        doctor: req.body.doctor,
        msg: [msg],
        read: false
    })

    newMessage.save();
    res.send("Message sent")
})

//User info
/*router.get('/profileDoctor', doctorPassport.authenticate('jwt', {session:false}), (req, res, next)=>{
    res.json({user: req.user.username});
})*/

//router.get('/messages')

//Database handling

/*router.get('/false', (req, res, next) => {

    res.send("error find")
})*/


module.exports = router;