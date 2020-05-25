const nodemailer = require("nodemailer");
//创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",  //发送方邮箱类型(qq)  通过node_modules/nodemailer/lib/well-know/services.json文件查找
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '3225241835@qq.com', // 发送方邮箱
      pass: 'lufqjtvebgycdahf', // smtp 验证码
    },
});

//邮件信息
let mailInfo = {
    from: '"Fred Foo 👻" <3225241835@qq.com>', // sender address
    to: "1439766251@qq.com", // list of receivers
    subject: "验证码", // Subject line
    text: "您的验证码是123456，有效期5分钟", // plain text body
    // html: "<b>Hello world?</b>", // html body
}

//发送邮件
transporter.sendMail(mailInfo)