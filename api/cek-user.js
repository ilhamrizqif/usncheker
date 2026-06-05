module.exports = async (req, res) => {
    return res.status(200).json({
        query: req.query,
        url: req.url
    });
};
