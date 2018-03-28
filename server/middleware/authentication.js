function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		console.log('you are not logged in atm');
		res.redirect('/login');
	}
}