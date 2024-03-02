const notFound = (req, res) => {
    return res.status(404).json({
        status: false,
        message: "Not found",
    });
};

const errorHandler = (err, req, res) => {
    return res.status(500).json({
        status: false,
        message: err.message,
    });
};

module.exports = { notFound, errorHandler }