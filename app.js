const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000");
});

app.get("/", (req, res) => {
  res.send(
  );
});

app.post("/sendmail", (req, res) => {
  let user = req.body;
  sendMail(user, info => {
    console.log(`Email sent`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  const mailOptions = {
    from: '"Email tester"<email@email.com>', 
    to: '<email@outlook.com>', 
    subject: 'Novo formulário de contato!',
    html:
    `<h3>Novo e-mail de contato!</h3>
    <br/>
    <p>Name: <i>${user.name}</i></p>
    <p>E-mail:<i> ${user.email}</i></p>
    <p>Message: ${user.message}</p>`
    ,
  };


  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
