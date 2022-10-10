const mongoose = require('mongoose');

const dburl = process.env.MONGO_URI;
mongoose.Promise = Promise;

//establish Connection
mongoose.connect(dburl, {
    keepAlive: true,
    useNewUrlParser: true,
});

mongoose.set('bufferCommands', false);
/* Mongoose events */
const db = mongoose.connection;
// If the connection throws an error
db.on(
    'error',
    // eslint-disable-next-line no-console
    console.error.bind(console, 'Mongoose default connection error.'),
);
//Successfull Connection
db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Mongoose Connected to ' + dburl);
});
