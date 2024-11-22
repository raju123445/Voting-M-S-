const conn = require("../connection"); // Ensure the database connection is properly set up

// // Route to handle voting
// exports.voted = (req, res) => {
//     const candidate_id = req.body.candidate_id; // Get candidate_id from the form
//     const voter_id = req.session.voter_id; // Assume a logged-in voter has a session ID

//     if (!voter_id) {
//         return res.status(401).send("You must be logged in to vote.");
//     }

//     // Check if the voter has already voted
//     const checkQuery = "SELECT * FROM votes WHERE voter_id = ?";
//     conn.query(checkQuery, [voter_id], (checkErr, checkResults) => {
//         if (checkErr) {
//             console.log(checkErr);
//             return res.status(500).send("Database error.");
//         }

//         if (checkResults.length > 0) {
//             // If voter already voted
//             return res.status(400).send("You have already voted.");
//         }

//         // Insert the vote into the database
//         const insertQuery = "INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)";
//         conn.query(insertQuery, [voter_id, candidate_id], (insertErr, insertResults) => {
//             if (insertErr) {
//                 console.log(insertErr);
//                 return res.status(500).send("Error casting vote.");
//             }
//             console.table(insertResults);
//             res.redirect("/vote-confirmation"); // Redirect to a confirmation page
//         });
//     });
// };


exports.voted = (req, res) => {
    const voter_id = req.session.user ? req.session.user.voter_id : null; // Retrieve voter_id from session
    const candidate_id = req.body.candidate_id; // Get candidate_id from the form

    if (!voter_id) {
        return res.redirect("/"); // Redirect to login if not authenticated
    }

    // Check if the voter has already voted
    const checkQuery = "SELECT * FROM votes WHERE voter_id = ?";
    conn.query(checkQuery, [voter_id], (checkErr, checkResults) => {
        if (checkErr) {
            console.log(checkErr);
            return res.status(500).send("Database error.");
        }

        if (checkResults.length > 0) {
            // If voter already voted
            return res.status(400).send("You have already voted.");
        }

        // Insert the vote into the database
        const insertQuery = "INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)";
        conn.query(insertQuery, [voter_id, candidate_id], (insertErr, insertResults) => {
            if (insertErr) {
                console.log(insertErr);
                return res.status(500).send("Error casting vote.");
            }

            return res.redirect("/vote-confirmation"); // Redirect to confirmation page
        });
    });
};
