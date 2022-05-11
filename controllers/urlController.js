const fs = require('fs');
const validUrl = require('valid-url');

const writeFile = async (url, req, res) => {
    const count = fs.readdirSync(`${__dirname}/../data`).length + 1;
    fs.writeFile(`${__dirname}/../data/${count}`, url, (err) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ original_url: url, short_url: count });
        }
    });
};

exports.getUrl = (req, res) => {
    const shortUrl = req.params.short_url;
    fs.readFile(`${__dirname}/../data/${shortUrl}`, 'utf8', (err, data) => {
        if (err) {
            res.json({ error: `No short URL found for the given input` });
        } else {
            res.redirect(data);
        }
    });
};

exports.postUrl = (req, res) => {
    const url = req.body.url;
    if (validUrl.isUri(url)) {
        writeFile(url, req, res);
    } else {
        res.json({ error: 'invalid url' });
    }
};
