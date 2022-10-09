const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 8080);
app.set('ip', process.env.IP || '127.0.0.1');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.info(
        `YelpCamp server staarted on ip ${app.get('ip')} and port ${app.get(
            'port',
        )}...`,
    );
});
