const express = require('express');
const app = express();
const port = process.env.port || 8080;
const nodemailer = require('nodemailer');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/mail",(req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send("Hello word!")
});
app.post('/mail', (req, res) => {
  const {from,to,cc,subject,html,text} = req.body;
  const mailOptions = {
        from: from,
        to: to,
        cc: cc,
        subject: subject,
        text: text,
        html: html
      };
    const transporter = nodemailer.createTransport({
      host: 'smtp.digitalserver.io',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'controlescolar@cpe.com.mx',
        pass: 'Pf9c7d70c',
      },
      tls: {
        rejectUnauthorized: false
       }
    });

      return transporter.sendMail(mailOptions,(err, info) =>{
        if (err) res.status(200).send({success: false, error: err});
        return res.status(200).send(
            {
                success: true,
                message: 'Email send!'
            }
        )
    }
);
}
)

//app.listen(3000,'localhost', () =>  console.log('Listening')
app.listen(8080,"0.0.0.0", () =>  console.log('Listening')
)