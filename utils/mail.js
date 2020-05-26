const nodemailer = require("nodemailer");
//创建发送邮件的对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", //发送方邮箱类型(qq)  通过node_modules/nodemailer/lib/well-know/services.json文件查找
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '3225241835@qq.com', // 发送方邮箱
    pass: 'lufqjtvebgycdahf', // smtp 验证码
  },
});

const SendEmail = (email, msg) => {
  //邮件信息
  let mailInfo = {
    from: '"taolike👻" <3225241835@qq.com>',
    to: email,
    subject: "验证码",
    text: msg,
  }

  //发送邮件
  return transporter.sendMail(mailInfo)
}
module.exports = {
  SendEmail,
}