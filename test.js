const nodemailer = require("nodemailer");
require('dotenv').config();

console.log(process.env.SMTP_USER)
let transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

let SendMailer = async (to, randomCode) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to, // to user
        subject: "[Arzu] Verify code",
        text: "",
        html: `<b>Код подтверждения:</b> <code>${randomCode}</code>. <b>Никому</b> не давайте код, даже если его требуют от имени <b>Arzu!</b>
        <br><br>Этот код используется для входа в Ваш аккаунт в <b>Arzu</b>. Он никогда не нужен для чего-либо еще. 
        <br><br>Если Вы не запрашивали код для входа, проигнорируйте это сообщение.`,
      },
      (err, info) => {
        if (err) {
            console.log(err)
          reject(err)
        }
        console.log(info)
        resolve(info)
      }
    ); 
  })
}; 

SendMailer('azizbekcoderuz@gmail.com', 11111)