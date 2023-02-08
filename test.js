const nodemailer = require("nodemailer");
require('dotenv').config();

console.log(process.env.SMTP_USER)
let transporter = nodemailer.createTransport({
  service: "mail", 
  host: "mail.kvartirabar.uz",
  port: 25,
  secure: false,
  logger: true,
  debug: true,
  ignoreTLS: true,
  auth: {
    user: "arzu@kvartirabar.uz",
    pass: "!7WQGyn5!Z4M",
  },
});



    transporter.sendMail(
      {
        from: "arzu@kvartirabar.uz",
        to: "azizbekcoderuz@gmail.com", // to user
        subject: "[Arzu] Verify code",
        text: "",
        html: `<b>Код подтверждения:</b> <code>1212123</code>. <b>Никому</b> не давайте код, даже если его требуют от имени <b>Arzu!</b>
        <br><br>Этот код используется для входа в Ваш аккаунт в <b>Arzu</b>. Он никогда не нужен для чего-либо еще. 
        <br><br>Если Вы не запрашивали код для входа, проигнорируйте это сообщение.`,
      },
      (err, info) => {
        if (err) {
            console.log(err)
        }
        console.log(info)
      }
    ); 



