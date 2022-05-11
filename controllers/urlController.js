const fs = require('fs');
const validUrl = require('valid-url');

const writeFile = async (url, req, res) => {
    await fs.writeFile(`${__dirname}/../data/1`, url, (err) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ original_url: url, short_url: 1 });
        }
    });
};

exports.getUrl = (req, res) => {
    const shortUrl = req.params.short_url;
    // readFile
    fs.readFile(`${__dirname}/../data/${shortUrl}`, 'utf8', (err, data) => {
        if (err) {
            res.json({ error: `No short URL found for the given input` });
        } else {
            res.redirect(data);
        }
    });
};

exports.postUrl = (req, res) => {
    // get the url from the body
    const url = req.body.url;
    // check if the url is valid
    if (validUrl.isUri(url)) {
        // writeFile
        writeFile(url, req, res);
    } else {
        // if not valid, response with an error
        res.json({ error: 'invalid url' });
    }
};
