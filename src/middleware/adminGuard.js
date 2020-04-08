module.exports = (req, res, next) => {
    const user = req.user;
    const userType = user.userType;
    if (userType === "admin") {
        return next();
    }
    return res.status(401).json("Access denied, insufficient privileges");
}