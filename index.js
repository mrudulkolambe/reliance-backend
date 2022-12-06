const express = require('express');
const app = express()
const moment = require('moment')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors({
	origin: ['http://localhost:5500'],
}))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASSWORD
	}
}));

app.get('/', (req, res) => {
	res.send('hello world')
})

app.post('/self-contact', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: process.env.SMTP_EMAIL,
		subject: 'Message Recieved',
		text: ``,
		html: `${req.body.email}`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.json(error)
		} else {
			res.send('Email sent: ' + info.response);
		}
	});
})



app.listen('3001', () => {
	console.log('White-Stripe Backend started on port 3001')
})