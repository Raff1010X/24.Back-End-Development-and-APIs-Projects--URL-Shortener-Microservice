exports.getUrl = (req, res) => {
    //{ error: 'invalid url' }
    res.json({ date: req.params.short_url });
};

exports.postUrl = (req, res) => {
    //{ original_url : 'https://freeCodeCamp.org', short_url : 1}
    res.json({ date: req.body.url });
};
