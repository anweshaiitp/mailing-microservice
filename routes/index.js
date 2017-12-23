var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tameeshb@gmail.com',
    pass: 'Pswd4gmail.'
  }
});




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next){
	var mailOptions = {
	  from: 'tameeshb@gmail.com',
	  to: req.body.emailTo,
	  subject: req.body.emailSub,
	  text: req.body.body
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
