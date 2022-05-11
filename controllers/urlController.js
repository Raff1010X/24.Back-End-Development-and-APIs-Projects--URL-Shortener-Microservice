const fs = require('fs');
const validator = require('validator');

exports.getUrl = (req, res) => {
    const shortUrl = req.params.short_url;
    fs.readFile(`${__dirname}/../data/${shortUrl}`, 'utf8', (err, url) => {
        if (err) {
            res.json({ error: 'No short URL found for the given input' });
        } else {
            res.redirect(url);
        }
    });
};

const countFiles = () =>
    new Promise((resolve, reject) => {
        fs.readdir(`${__dirname}/../data/`, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.length + 1);
            }
        });
    });

exports.postUrl = async (req, res) => {
    const url = req.body.url;
    if (validator.isURL(url)) {
        try {
            const count = await countFiles();
            fs.writeFile(`${__dirname}/../data/${count}`, url, (err) => {
                if (err) {
                    res.json({ error: err });
                } else {
                    res.json({ original_url: url, short_url: count });
                }
            });
        } catch (err) {
            res.json({ error: 'Error counting files' });
        }
    } else {
        res.json({ error: 'invalid url' });
    }
};
