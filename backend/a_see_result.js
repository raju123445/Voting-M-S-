// const conn = require("../connection");

// exports.see_result = (req, res) => {
//     var query = "SELECT * FROM votes";
//     conn.query(query, (error, results) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error fetching candidates");
//         } else {
//             res.render("a_see_result", { votes: results }); // Render the vote page
//         }
//     });
// };


const conn = require("../connection");

exports.see_result = (req, res) => {
    const queryVotes = "SELECT * FROM votes";
    const queryWinner = `
        SELECT candidate_id, COUNT(*) AS votes
        FROM votes
        GROUP BY candidate_id
        ORDER BY votes DESC
        LIMIT 1
    `;

    conn.query(queryVotes, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching votes");
        } else {
            conn.query(queryWinner, (err, winnerResult) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error calculating winner");
                } else {
                    const winner = winnerResult.length > 0 ? winnerResult[0] : null;
                    res.render("a_see_result", {
                        votes: results,
                        winner: winner, // Pass the winner data
                    });
                }
            });
        }
    });
};
