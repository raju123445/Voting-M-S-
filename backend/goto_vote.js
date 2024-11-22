// const conn = require("../connection");

// exports.go_to_vote = (req, res) => {
//         var query="select * from candidates";
//         conn.query(query, (errro,results)=>{
//             if(errro){
//                 console.log(error);
//                 }else{
//                 res.render("/gotovote",{candidate : results}); }// Render the vote page
//         })
//     };

    const conn = require("../connection");

exports.go_to_vote = (req, res) => {
    var query = "SELECT * FROM candidates";
    conn.query(query, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching candidates");
        } else {
            res.render("gotovote", { candidate: results }); // Render the vote page
        }
    });
};