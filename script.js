const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const { user_reg } = require("./backend/user_reg.js");
const { user_login} = require("./backend/user_login.js");
const { user_data } = require("./backend/user_dashboard.js");
const { go_to_vote } = require("./backend/goto_vote.js");
const { voted } = require("./backend/vot_ed.js");
const { admin_login } = require("./backend/admin_login.js");
const { see_result } = require("./backend/a_see_result.js");
const { add_candidate } = require("./backend/add_candidate.js");


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.use('/uploads', express.static('uploads'));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Session management
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 6000000 },
    })
);

// Routes
app.get("/", (req, res) => {
    res.render("user_login"); // Render login page
});

app.get("/user_register", (req, res) => {
    res.render("user_register"); // Render registration page
});

app.get("/services", (req, res) => {
    res.render("services"); // Render services page
});

app.post("/user_register", user_reg); // Handle user registration

app.post("/get-login", user_login); 

app.get("/user_dash", user_data)  // Handle user login



app.get("/gotovote", go_to_vote);

// Logout route
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/"); // Redirect to login after logout
});

app.post("/voted",voted);

app.get("/vote-confirmation" ,(req,res)=>{
    res.render("vote-confirmation");
});


//ADMIN
app.get("/admin",(req,res)=>{
    res.render("admin_login");
});

app.post("/admin-login", admin_login);

app.get("/admin_dash" , (req,res)=>{
    res.render("admin_dash");
});

app.get("/add_candidate",(req,res) => {
    res.render("add_candidate");
});

app.post("/add-candidate",upload.single("symbol"), add_candidate);

// app.get("/see_result",(req,res) => {
//     res.render("a_see_result");
// });

app.get("/see_result", see_result);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
