const nodemailer = require('nodemailer');
// 

module.exports.mail=async function(email,token) {
console.log(email,token,"email.....");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roserairaikwar132@gmail.com',
    pass: '97@Kawarai',
  }
});

let mailOptions = {
  from: 'roserairaikwar132@gmail.com',
  to: email,
  subject: 'This Mail Is Form Curd Api Project',
  html: `For Changeing your password please click<strong><a href="http://localhost:4000/v1/user/verifyToken/${token}">Here</a></strong>` 
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});
}
//enable less security app in google 
//link is this : https://www.google.com/settings/security/lesssecureapps



