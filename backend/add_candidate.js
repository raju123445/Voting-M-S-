const conn = require("../connection");
const multer = require("multer");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" }); // Files will be saved in the "uploads" folder

exports.add_candidate = (req, res) => {
    const { candidate_id, candidate_name, party, position, bio } = req.body;
    const symbol = req.file ? req.file.filename : null;

    if (!symbol) {
        return res.status(400).send("Error: Symbol upload is required.");
    }

    const query = "INSERT INTO candidates (candidate_id, name, party, symbol_path, position, bio) VALUES (?, ?, ?, ?, ?, ?)";
    conn.query(query, [candidate_id, candidate_name, party, symbol, position, bio], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).send("Failed to insert data.");
        } else {
            console.log("Data successfully inserted:", result);
            res.send("Candidate data successfully inserted.");
        }
    });
};
