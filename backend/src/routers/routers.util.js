const requireAuth = (req, res, next) => {
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

const requireAdmin = [requireAuth, (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: 'You must be admin' });
  }

  return next();
}]

module.exports = {
  requireAuth, requireAdmin
}