// const conn = require("../connection");
// exports.user_login = (req, res) => {
//     const {voter_id,password} =req.body;
//     const query = "select voter_id, password from users";
//     conn.query(query,[voter_id,password],(error,result))
//     // res.send("Hi "+voter_id);
// };

const conn = require("../connection");
exports.user_login = (req, res) => {
    const { voter_id, password } = req.body;

    if (!voter_id || !password) {
        return res.status(400).send(`
            <script>
                alert('Please fill in all fields.');
                window.location='/';
            </script>
        `);
    }

    const query = "SELECT * FROM users WHERE voter_id = ? AND password = ?";
    conn.query(query, [voter_id, password], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send(`
                <script>
                    alert('Something went wrong. Please try again later.');
                    window.location='/';
                </script>
            `);
        }

        if (results.length > 0) {
            // Login successful
            req.session.user = {
                voter_id: results[0].voter_id,
                name: results[0].votername,
                email: results[0].email,
            }; // Store user info in the session

            console.log("User logged in:", req.session.user);
            return res.redirect("/user_dash"); // Redirect to dashboard
        } else {
            // Invalid credentials
            return res.status(401).send(`
                <script>
                    alert('Invalid Voter ID or Password. Please try again.');
                    window.location='/';
                </script>
            `);
        }
    });
};


