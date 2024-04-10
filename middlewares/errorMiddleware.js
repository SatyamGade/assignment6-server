const errorMiddleware = async (error, req, res, next) => {
    const message = error.message || "Something happen in server side...";
    const status = error.status || 500;

    res.status(status).json({ message });
    next();
}

module.exports = errorMiddleware;