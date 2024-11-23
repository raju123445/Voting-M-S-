exports.user_data =  (req, res) => {
    if (!req.session.user) {
        return res.redirect("/"); // Redirect to login if session doesn't exist
    }

    // res.json(req.session.user);

    const user = req.session.user; // Retrieve user info from session
    return res.render("user_dash", {
        name: user.name,
        email: user.email,
        voterId: user.voter_id,
        aadhar : user.aadhar_no,
    });
    
};