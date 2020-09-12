var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const cron = require("node-cron");
const fs = require("fs");
var schedule = require('node-schedule');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyagadhiya1111@gmail.com',
    pass: 'divya@1357'
  }
});

var mailOptions = {
  from: 'divyagadhiya1111@gmail.com',
  to: 'divyaa.tagline@gmail.com',
  subject: 'send email using expressjs',
  text: `Hello Good Morning`
};

let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
  console.log('Time for tea!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cron', function(req, res, next) {
  cron.schedule("* * * * *", function() {
    console.log("running a task every minute");
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent: ' + info.response);
      }
    });
  });
});


router.get('/emailsend', function(req, res, next) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent: ' + info.response);
    }
  });
});

module.exports = router;
