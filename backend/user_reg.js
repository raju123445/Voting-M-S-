const conn = require("../connection");
exports.user_reg = (req, res) => {
    const { voter_id, voter_name, email, reg_date, password } = req.body;

    const query = "INSERT INTO users (voter_id, votername, email, registration_date, password) VALUES (?, ?, ?, ?, ?)";
    conn.query(query, [voter_id, voter_name, email, reg_date, password], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).send("Failed to insert data.");
        } else {
            console.log("Data successfully inserted");
            res.send("Your data was successfully inserted.");
        }
    });
};

// exports