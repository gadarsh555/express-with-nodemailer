var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){

    /* res.send("<h1>hello man of steel</h1>"); */
    res.render('index',{title:'Computer Not Working ?'});
});
app.get('/about',function(req,res){

    /* res.send("<h1>hello man of steel</h1>"); */
    res.render('about',{title:'About Us',para:'THis is about us page v2.0'});
});
app.get('/contact',function(req,res){

    /* res.send("<h1>hello man of steel</h1>"); */
    res.render('contact',{title:'Contact Us',para:'contact us in any case, you will get respopnse !'});
});
app.post('/contact/send',function(req,res){

  var transporter = nodemailer.createTransport({
      service : 'Gmail',
      auth : {
          user :  req.body.email,/* 'gadarsh555@gmail.com', */
          pass : 'youcantseeme'
      }
  });
  
   var mailOptions = {
       from : req.body.email,
       to : 'gadarsh780@gmail.com',
       subject : 'Website Submission',
       text : req.body.name+' , email id : '+req.body.email+' has sent you a message. The message is : '+req.body.text+' .',
       html : '<p>The message details are : </p><ul><li>Name : '+req.body.name+'</li><li>Email : '+req.body.email+'</li><li>Body : '+req.body.text+'</li></ul>' 
   };

   transporter.sendMail(mailOptions,function(error,info){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log('Message sent with '+info.response);
            }
            res.redirect('/');
   });


});


app.listen(3000);
console.log("server is running");