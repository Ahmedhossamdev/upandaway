

function checkAdminRole(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        // If the user is authenticated and has the 'admin' role, proceed to the next middleware
        next();
    }
    else {
        res.status(404).render('auth-message.ejs');
    }
}

module.exports = checkAdminRole;
