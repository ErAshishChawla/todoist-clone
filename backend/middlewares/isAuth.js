async function isAuth(req, res, next) {
  const { uid } = req.cookies;

  if (!uid) {
    return res.status(401).json({
      errorMessage: "Unauthorized User",
    });
  }

  console.log("User is authenticated");
  next();
}

module.exports = isAuth;
