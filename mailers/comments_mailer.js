const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
            from:'kamal69974@gmail.com',
            to: comment.user.email,
            subject:'New comment Published',
            html:'<h1> new comment is sucessfuly published</h1>'
    },(err,info) => {
            if(err){ console.log('error in sending mail', err); return;}

            console.log('message sent', info);
            return;
    });
}