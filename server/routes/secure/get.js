const router = require('express').Router();
const mailer = require('./mailer');
const userController = require('../../controllers/userController');
const ejs = require("ejs");

// Private GET routes here:
// router.get('/secureData', secureGetController.secureData);
router.route('/users')
    .get(userController.getAllUsers);

router.route('/send_token')
    .post(userController.createToken, function(req,res) {
        console.log(req.body);
        // Send the message.
        ejs.renderFile(__dirname + '/mailer/htmlTemplate.ejs',
            {
                token: req.body.token,
                email: req.body.email
            }, 
            function(err,data) {
                var mailOptions = {
                    name: "Jon",
                    from: "jrjackso0310@gmail.com",
                    subject: "Run-Amok Signup Token",
                    to: req.body.email,
                    html: data
                }
                
                mailer.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.end("error");
                } else {
                    console.log("Message sent: " + response.response);
                    res.end("sent");
                }
                });
            }
        );
    });

module.exports = router;