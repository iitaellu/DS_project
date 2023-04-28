# DS_project

This is very very simple distributed system project where is separated micro servises: login as doctor, login as patient, read patinet profile, read messages, send message to old message channel, send whole now message to doctor

## How to run
You need to download this project and open it in some coding environment. You also need some program to run backend code (for example Postman).
Run in terminal command: npm start and server is up.

There is some database information:

PATIENTS
Mary
{
  "_id": {
    "$oid": "644663f1f241ee52a3472953"
  },
  "doctors": [
    10,
    "Ruby"
  ],
  "medicines": [
    "Ibumax"
  ],
  "secretcode": "SECRET1234",
  "username": "Mary"
}

Harry
{
  "_id": {
    "$oid": "6446651bf241ee52a3472965"
  },
  "doctors": [
    "Ruby"
  ],
  "medicines": [
    "Ibumax",
    "Birana"
  ],
  "secretcode": "CODE123456",
  "username": "Harry"
}

DOCTORS
Smith
{
  "_id": {
    "$oid": "644665a8f241ee52a3472968"
  },
  "username": "Smith",
  "password": "Password",
  "patiens": [
    "Mary"
  ]
}

Ruby
{
  "_id": {
    "$oid": "64466614f241ee52a347296e"
  },
  "patiens": [
    "Mary",
    "Harry"
  ],
  "username": "Ruby",
  "password": "passWord1234"
}

MESSAGES
message 1
{
  "_id": {
    "$oid": "644666a2f241ee52a3472971"
  },
  "msg": [
    [
      0,
      "644663f1f241ee52a3472953",
      "I have some questions"
    ],
    [
      1,
      "64466614f241ee52a347296e",
      "Hello. How can I help?"
    ],
    [
      2,
      "644663f1f241ee52a3472953",
      "I have used medicin you recommended but I get very tired. Can you tell me other choises?"
    ]
  ],
  "read": true,
  "doctor": "64466614f241ee52a347296e",
  "patient": "644663f1f241ee52a3472953"
}

message 2
{
  "_id": {
    "$oid": "64494840d2fed62319da1453"
  },
  "patient": "644663f1f241ee52a3472953",
  "doctor": "64466614f241ee52a347296e",
  "msg": [
    [
      0,
      "644663f1f241ee52a3472953",
      "I have some quiestions of my medicines. Do you have time to discuss about them?"
    ]
  ],
  "read": true,
  "__v": 0
}

message3
{
  "_id": {
    "$oid": "644bcd1e6094341fd5de931b"
  },
  "patient": "6446651bf241ee52a3472965",
  "doctor": "64466614f241ee52a347296e",
  "msg": [
    [
      0,
      "6446651bf241ee52a3472965",
      "I'd like to talk about my new medicine"
    ],
    [
      1,
      "64466614f241ee52a347296e",
      "How can I help?"
    ]
  ],
  "read": true,
  "__v": 0
}


## Link to video
https://lut-my.sharepoint.com/:v:/g/personal/ida_kirveskoski_student_lut_fi/EQWIquFWDz5MtJFK9vzP6ZUBdPWJGFEaBLxBy5cpcy6TiA?e=xoo8sh 

## Sources
https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ
https://stackoverflow.com/questions/25896753/passportjs-using-multiple-passports-within-express-application
https://version.lab.fi/Erno.Vanhala/web-applications-week-5/-/blob/master/public/js/wall.js
https://version.lab.fi/Erno.Vanhala/web-applications-week-7/-/blob/master/models/User.js
https://version.lab.fi/Erno.Vanhala/web-applications-week-4
https://www.youtube.com/watch?v=qrDlIiq9zAc
