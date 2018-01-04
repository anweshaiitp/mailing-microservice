var express = require('express');
var router = express.Router();

var emailID = 't3byt3@gmail.com';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailID,
    pass: 'Pswd4t3.'
  }
    // // pool: true,
    // host: 'mail.anwesha.info',
    // port: 587,
    // secure: false, // use TLS
    // auth: {
    //     user: 'devteam@anwesha.info',
    //     pass: '@nwesh@2k18'
    // }
});




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post('/text', function(req, res, next){
	if(!req.body.authID || req.body.authID!="anw2k18iitp")
		return res.send("403");
	var mailOptions = {
	  from: "Anwesha Web Team <"+emailID+">",
	  to: req.body.emailTo,
	  subject: req.body.emailSub,
	  html: req.body.bodyhtml,
	  text:req.body.bodyplain,
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
	res.json({'to':req.body.emailTo, 'sub':req.body.emailSub});
});

router.post('/qr', function(req, res, next){
	if(!req.body.authID || req.body.authID!="anw2k18iitp")
		return res.send("403");

	// var req.body.body.replace("***IMAGEFILEURLHERE***", "cid:"+req.body.anwID);
	var mailOptions = {
	  from: "Anwesha Web Team <"+emailID+">",
	  to: req.body.emailTo,
	  subject: req.body.emailSub,
	  html: req.body.bodyhtml,
	  text:req.body.bodyplain,
	  attachments: [
	    {
	      filename: "anw"+req.body.anwID+".png",
	      path: "https://anwesha.info/qr/anw"+req.body.anwID+".png", // <-- should be path instead of content
	      cid: "anw"+req.body.anwID+".png"
	    }
	  ]
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
	res.json({'to':req.body.emailTo, 'sub':req.body.emailSub});
});

module.exports = router;
