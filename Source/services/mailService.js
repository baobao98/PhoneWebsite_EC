const nodemailer = require("nodemailer");
var numeral = require('numeral');

let mailOptions;

// step 1 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'auto.system.service.bao@gmail.com',
        pass: '@phuocbao98',
    }
});

// // step 2
let option = async (products, email, code, name, date) => {
    let total = 0;
    let htmldynamic = '';
    await products.forEach(pro => {
        priceFormat = numeral(pro.product.price).format('0,0');
        htmldynamic += `<tr><td><b>${pro.product.name}</b></td><td><b>${pro.quantity}</b></td><td><b>${priceFormat} VND</b></td></tr>`
        total += pro.quantity * pro.product.price
    })
    totalFormat = await numeral(total).format('0,0');
    mailOptions = {
        from: 'auto.system.service.bao@gmail.com',
        to: email,
        subject: 'Thế giới di động B&H',
        html: `<html> <head> <style>.banner-color{background-color: #eb681f;}.title-color{color: #0066cc;}.button-color{background-color: #0066cc;}.tabledetail td, th{width:100%; border: 1px solid black; text-align: center;}@media screen and (min-width: 500px){.banner-color{background-color: #0066cc;}.title-color{color: #eb681f;}.button-color{background-color: #eb681f;}}</style> </head> <body> <div style="background-color:#ececec;padding:0;margin:0 auto;font-weight:200;width:100%!important"> <table align="center" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center"> <center style="width:100%"> <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="margin:0 auto;max-width:512px;font-weight:200;width:inherit;font-family:Helvetica,Arial,sans-serif" width="512"> <tbody> <tr> <td bgcolor="#F3F3F3" width="100%" style="background-color:#f3f3f3;padding:12px;border-bottom:1px solid #ececec"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;width:100%!important;font-family:Helvetica,Arial,sans-serif;min-width:100%!important" width="100%"> <tbody> <tr> <td align="left" valign="middle" width="50%"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">B&H Company</span></td><td valign="middle" width="50%" align="right" style="padding:0 0 0 10px"><span style="margin:0;color:#4c4c4c;white-space:normal;display:inline-block;text-decoration:none;font-size:12px;line-height:20px">${date}</span></td><td width="1">&nbsp;</td></tr></tbody> </table> </td></tr><tr> <td align="left"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" bgcolor="#8BC34A" style="padding:20px 48px;color:#ffffff" class="banner-color"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%"> <h1 style="padding:0;margin:0;color:#ffffff;font-weight:500;font-size:20px;line-height:24px">Automatic Electronic Bill</h1> </td></tr></tbody> </table> </td></tr><tr> <td align="center" style="padding:20px 0 10px 0"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%" style="padding: 0 15px;text-align: justify;color: rgb(76, 76, 76);font-size: 12px;line-height: 18px;"> <h3 style="font-weight: 600; padding: 0px; margin: 0px; font-size: 16px; line-height: 24px; text-align: center;" class="title-color">Hi ${name},</h3> <p style="margin: 20px 0 30px 0;font-size: 15px;text-align: center;">Thanks for purchase at our shop. Here is your bill:</p><h3 style="color: green;font-weight: 600; padding: 0px; margin: 0px; font-size: 13px; line-height: 36px; text-align: center;" class="title-color">Invoice Code:  ${code}</h3> <table class="tabledetail"> <tr> <th><i>Product</i></th> <th><i>Quantity</i></th> <th>Price</th> </tr>${htmldynamic}</table><div style="text-align: right; font-size: 16px; color: red;"><span><b>Total: </b></span><b> ${totalFormat} VND</b></div> <div style="font-weight: 200; text-align: center; margin: 25px;"><a style="padding:0.6em 1em;border-radius:600px;color:#ffffff;font-size:14px;text-decoration:none;font-weight:bold" class="button-color">Check order status here</a></div></td></tr></tbody> </table> </td></tr><tr> </tr><tr> </tr></tbody> </table> </td></tr></tbody> </table> </td></tr><tr> <td align="left"> <table bgcolor="#FFFFFF" border="0" cellspacing="0" cellpadding="0" style="padding:0 24px;color:#999999;font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" valign="middle" width="100%" style="border-top:1px solid #d9d9d9;padding:12px 0px 20px 0px;text-align:center;color:#4c4c4c;font-weight:200;font-size:12px;line-height:18px">Regards, <br><b>Bao Huy shop</b> </td></tr></tbody> </table> </td></tr><tr> <td align="center" width="100%"> <table border="0" cellspacing="0" cellpadding="0" style="font-weight:200;font-family:Helvetica,Arial,sans-serif" width="100%"> <tbody> <tr> <td align="center" style="padding:0 0 8px 0" width="100%"></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </center> </td></tr></tbody> </table> </div></body></html>`
    };

}

// // Step 3
let send = () => {
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Mail sent');
        }
    });
}


module.exports.option = option
module.exports.send = send
