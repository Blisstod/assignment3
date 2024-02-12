
class Helper{
    isAuthenticated(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        }
        return res.redirect('/login');
    }

    isAdmin(req, res, next) {
        if (req.session.user && req.session.user.isAdmin) {
            return next();
        } else {
            res.status(403).send('Access Denied: Admins only');
        }
    }
}

module.exports = new Helper();