const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {

    let token;
    if (req.header("Authorization")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Token expired!!! or Token Invalid!!!" });
    }

    try {
        const isValidToken = jwt.verify(token, process.env.JWT_SIGN);

        const userData = await User.findOne({ email: isValidToken.email }).select({ password: 0 });
        req.user = userData;
        req.userId = userData._id;
        req.token = token;
        next();
    } catch (error) {
        return res.status(404).json({ error });
    }
}

module.exports = authMiddleware;