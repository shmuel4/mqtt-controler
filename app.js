const express = require('express');
const path = require('path');
const app = express();
const routes = require(path.join(__dirname, 'src/module/routes.js'));
const ivrMainSystem = require(path.join(__dirname, 'src/module/ivr.js'));
const dotenv = require('dotenv');
dotenv.config();


function verify(req, res, next) {
    if (req.query.systemCode === process.env.SYSCODE) {
        next()
    } else {
        res.status(403);
        res.send("systemCode Not Allow");
    }
}

function loger(req, res, next) {
    console.log(req.query)
    if (req.query.hangup === "yes") {
        console.log('is hangup. end')
        res.send("hangup...");
    } else {
        next()
    }
}

app.listen(process.env.APP_PORT, () => {
    console.log(`mqtt-controler app listening on port ${process.env.APP_PORT}!`);
});

app.set('view engine', 'ejs');
app.use('/', (req, res, next) => verify(req, res, next), routes);
app.use("/ivr", (req, res, next) => loger(req, res, next), ivrMainSystem);