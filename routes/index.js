var express = require('express');
var router = express.Router();

var emailID = 'tameeshb@gmail.com';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailID,
    pass: 'Pswd4gmail.'
  }
});




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post('/text', function(req, res, next){
	if(!req.body.authID || req.body.authID!="anw2k18iitp")
		return res.send("503");
	var mailOptions = {
	  from: emailID,
	  to: req.body.emailTo,
	  subject: req.body.emailSub,
	  html: req.body.body,
	  text:req.body.body
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
		return res.send("503");

	// var req.body.body.replace("***IMAGEFILEURLHERE***", "cid:"+req.body.anwID);
	var mailOptions = {
	  from: emailID,
	  to: req.body.emailTo,
	  subject: req.body.emailSub,
	  html: req.body.body,
	  text:req.body.body,
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
