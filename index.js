const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');


const apiRoutes = require('./server/routes');

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );

    res.header(
        "access-control-expose-headers",
        ",Authorization " + ",Content-Length"
    );
    next();
});


try {
    const uri = 'mongodb+srv://dbUser:ONexEWcGXw8YGDsp@cluster0-e5adh.mongodb.net/block-chain?retryWrites=true';

    const mongoUrl =  'mongodb://dbUser:ONexEWcGXw8YGDsp@meghana-shard-00-00-tckms.mongodb.net:27017,meghana-shard-00-01-tckms.mongodb.net:27017,meghana-shard-00-02-tckms.mongodb.net:27017/block-chain?ssl=true&replicaSet=Meghana-shard-0&authSource=admin&retryWrites=true';

    mongoose.connect(mongoUrl, {useNewUrlParser: true}).then(
        () => { console.log('database connected') },
    ).catch(err => {
        console.log(err);
        // process.exit();
    });

/*    mongoose.connect(mongoUrl, {  useNewUrlParser: true })
        .then(
            () => { console.log('database connected') },
            err => {  console.log('############'); console.log(err) }
        );*/
    mongoose.set('useCreateIndex', true);
} catch (e) {

    console.error(e);
}



app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use('/api', apiRoutes);

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware);

// Support history api
app.use(history({
    index: 'dist/index.html'
}));

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile( __dirname+'/dist/index.html'));


const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
