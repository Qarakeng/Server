const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arzustartup@gmail.com",
    pass: "gccrcpdlljwndebo",
  },
});

let SendMailer = async (to: string, code: number) => {
  transporter.sendMail(
    {
      from: "ArzuStartUP@gmail.com",
      to, // to user
      subject: "[Arzu] Verify code",
      text: "",
      html: `<b>Код подтверждения:</b> <code>${code}</code>. <b>Никому</b> не давайте код, даже если его требуют от имени <b>Arzu!</b>
      <br><br>Этот код используется для входа в Ваш аккаунт в <b>Arzu</b>. Он никогда не нужен для чего-либо еще. 
      <br><br>Если Вы не запрашивали код для входа, проигнорируйте это сообщение.`,
    },
    (err: any, info: any) => {
      if (err) console.log(err) 
      console.log("ok", info);
    }
  ); 
}; 

export default SendMailer;
