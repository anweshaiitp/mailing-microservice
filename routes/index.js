var express = require('express');
var fs = require("fs");
var ejs = require("ejs");

var router = express.Router();
var emailID = 'email@hotmail.com';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: emailID,
    pass: 'password'
  }
});




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.post('/text', function(req, res, next){
	if(!req.body.authID || req.body.authID!="<authkey>")
		return res.send("403");
	var mainUrl = "";
	if(req.body.url){
		mainUrl = req.body.url;
	}
	ejs.renderFile(__dirname + "/text.ejs", { name: req.body.name,title:req.body.title,btnname:req.body.btnname, url: mainUrl ,body:req.body.bodyhtml }, function (err, data) {
	if (err) {
	    console.log(err);
	} else {
	    var mainOptions = {
	        from: "Anwesha Web Team <"+emailID+">",
	        to: req.body.emailTo,
			subject: req.body.emailSub,
	        html: data,
			text:req.body.bodyplain
	    };
	    // console.log("html data ======================>", mainOptions.html);
	    transporter.sendMail(mainOptions, function(error, info){
	    	  if (error) {
	    	    console.log(error);
	    	  } else {
	    	    console.log('Email sent: ' + info.response);
	    	  }
	    	});
	}

	});

	res.json({'to':req.body.emailTo, 'sub':req.body.emailSub});
});

router.post('/qr', function(req, res, next){
	if(!req.body.authID || req.body.authID!="anw2k18iitp")
		return res.send("403");

	ejs.renderFile(__dirname + "/qr.ejs", { name: req.body.name, url:req.body.url,body:req.body.bodyhtml }, function (err, data) {
	if (err) {
	    console.log(err);
	} else {
	    var mainOptions = {
	        from: "Anwesha Web Team <"+emailID+">",
	        to: req.body.emailTo,
			subject: req.body.emailSub,
	        html: data,
			text:req.body.bodyplain,
	        attachments: [
	          {
	            filename: "anw"+req.body.anwID+".png",
	            path: "https://anwesha.info/qr/anw"+req.body.anwID+".png", // <-- should be path instead of content
	            cid: "anw"+req.body.anwID+".png"
	          }
	        ]
	    };
	    // console.log("html data ======================>", mainOptions.html);
	    transporter.sendMail(mainOptions, function(error, info){
	    	  if (error) {
	    	    console.log(error);
	    	  } else {
	    	    console.log('Email sent: ' + info.response);
	    	  }
	    	});
	}

	});
	// var req.body.body.replace("***IMAGEFILEURLHERE***", "cid:"+req.body.anwID);
	

	
	res.json({'to':req.body.emailTo, 'sub':req.body.emailSub});
});

module.exports = router;
