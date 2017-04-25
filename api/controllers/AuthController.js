/**
 * Authentication Controller
 *
 */
var AuthController = {

  login: function (req, res) {
    res.view({
      errors: req.flash('error')
    });
  },

  logout: function (req, res) {
    req.session.authenticated = false;
    req.session.user = {};
    req.logout();
    res.redirect('/');
  },

  register: function (req, res) {
    res.view({
      errors: req.flash('error')
    });
  },

  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  callback: function (req, res) {
    passport.callback(req, res, function (err, user) {
      req.login(user, function (err) {
        // If an error was thrown, redirect the user to the login which should
        // take care of rendering the error messages.
        if (err) {
          res.redirect('/login');
        }
        // Upon successful login, send the user to the homepage were req.user
        // will available.
        else {
          req.session.authenticated = true;
          req.session.user = req.user;
        	console.log('currently logged in user is: ' + req.user.username);
          res.redirect('/');
        }
      });
    });
  }
};

module.exports = AuthController;
