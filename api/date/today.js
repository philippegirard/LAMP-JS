module.exports = (req, res, next) => {
    let today = new Date();

    return res.json({today: today.toISOString()});
};