module.exports = {
  requireAuth: (req, res, next) => {
    const send401 = () => res.status(401).json({ message: 'You are not logged in.' });

    if (!req.isAuthenticated()) {
      return send401();
    }

    if (!req.user) {
      console.log("CRITICAL: This should not happen.");
      return send401();
    }

    return next();
  }
}