const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

var express = require("express");
var app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//app.set("view engine", "ejs");

/*app.get("/", function (req, res) {
  res.render("sample");
});*/

/*app.get("/", function (req, res) {
  res.send("Hello World");
});*/
/*app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});*/
app.get("/login", function (req, res) {
  res.sendFile(__dirname+"/login.html");
});
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
/*app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});*/
/*app.get("/signupSubmit", function (req, res) {
 // console.log(req.query.emailid);

  db.collection("users").add({
    email: req.query.emailid,
    firstname: req.query.firstname,
    lastname: req.query.lastname,
  });
});*/

app.get("/signupsubmit", (req, res) => {
  const Firstname = req.query.Firstname;
  const Lastname = req.query.Lastname;
  const Username = req.query.Username;
  const Password = req.query.Password;
  db.collection("Customers")
    .add({
      Firstname: Firstname,
      Lastname: Lastname,
      Username: Username,
      Password: Password,
    })
    .then(() => {
      res.sendFile(__dirname+"/login.html");
    });
});

app.get("/loginsubmit", (req, res) => {
  const Username = req.query.Username;
  // console.log("Email",Email);
  const Password = req.query.Password;
  // console.log("Password",password);
  db.collection("Customers")
    .where("Username", "==", Username)
    .where("Password", "==", Password)
    .get()
    .then((docs) => {
      //console.log(docs.size);
      if (docs.size > 0) {
        res.sendFile(__dirname+"/Project.html");
      } else {
        res.send("Login Failed");
        // res.alert("Invalid Username or Password");
      }
    });
});

/*db.collection('users').where("email","==",req.query.emailid)
  if(docs.length>0)
});*/

app.listen(3000);
// localhost:3000