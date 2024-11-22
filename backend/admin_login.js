const conn = require("../connection");
exports.admin_login = (req, res) => {
    const { admin_id, password } = req.body;

    if (!admin_id || !password) {
        return res.status(400).send(`
            <script>
                alert('Please fill in all fields.');
                window.location='/';
            </script>
        `);
    }

    const query = "SELECT * FROM admin WHERE admin_id = ? AND password = ?";
    conn.query(query, [admin_id, password], (error, results) => {
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
                admin_id: results[0].admin_id,
                name: results[0].userername,
                // email: results[0].email,
            }; // Store user info in the session

            console.log("User logged in:", req.session.user);
            return res.redirect("/admin_dash"); // Redirect to dashboard
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
