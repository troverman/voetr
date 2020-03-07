var App = {
    logout: function (req, res) { req.logout(); res.redirect('/');},
    provider: function (req, res) {passport.endpoint(req, res);},
    callback: function (req, res) {
        passport.callback(req, res, function (err, user) {
            req.login(user, function (err) {
                if (err) {res.redirect('/login');}
                else { console.log('currently logged in user is: ' + req.user.username); req.session.user = req.user; res.redirect('/');}
            });
        });
    }
};
module.exports = App;
