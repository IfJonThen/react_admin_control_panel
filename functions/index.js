const functions = require('firebase-functions');
// import functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var nodemailer=require("nodemailer");

exports.addMessage = functions.https.onRequest((req,res)=>{
    const original =req.query.text;
    admin.database().ref('/messages').push({original:original}).then(snapshot=>{
        res.redirect(303,snapshot.ref)
    });
});
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
})
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        // Grab the current value of what was written to the Realtime Database.
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });

exports.sendEmail = functions.https.onRequest((req,res)=>{
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
        }
    });
    var mailOptions={
        from:"IX Admin <sender@sender.com>",
        subject: "Your Schedule for ",
        html: "<b>Hello world </b>"
    }
    var t = req.query.text;
    var array = [t];
    mailOptions["to"]=t;
    // mailOptions["text"]={path:'/var/data/..'};
    mailOptions["text"]="hello world";
    smtpTransport.sendMail(mailOptions,function(error,response){
        if (error){
            res.send("error!!!!");
            console.log(error);
        }
        else{
            res.send("success!!!!");
            console.log("message sent: "+ response.message)
        }
    });
});