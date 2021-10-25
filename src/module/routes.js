const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const path = require('path');
const config = require(path.join(__dirname, '../../channelsList.json'));
const consuller = require(path.join(__dirname, 'consuller.js'));

let cn = new consuller(process.env.MQTT_URL);

router.get('/', (req, res) => {
    axios.get(process.env.MQTT_URL + 'relay_cgi_load.cgi').then(function(response) {
        var status = response.data.split("&");
        res.render('main', { status: status , sysCode: req.query.systemCode, title: config.title});
    })
});

router.get('/getOriginalStatus', (req, res) => {
    axios.get(process.env.MQTT_URL + 'relay_cgi_load.cgi').then(function(response) {
        var status = response.data.split("&");
        res.json(status);
    })
});

router.get('/getChannels', (req, res) => {
    res.json(config.channels);
});

router.get('/getStatus', (req, res) => {
    try {
        axios.get(process.env.MQTT_URL + 'relay_cgi_load.cgi').then(function(response) {
            let status = response.data.split("&");
            //console.log(status.length);
            let mode = '';
            for (i = 0; i < status.length; i++) {
                //console.log(status[i]);
                if (i < 3 || i == status.length - 1) {
                    continue;
                }
                mode += `שבב: ${i - 2} הוא ${status[i] == 1 ? 'פועל' : "כבוי"} <br>`
            }
            res.send(mode);
        })
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.get('/getStatus/:chip', (req, res) => {
    try {
        axios.get(process.env.MQTT_URL + 'relay_cgi_load.cgi').then(function(response) {
            let status = response.data.split("&");
            //console.log(status);
            let mode = `שבב: ${req.params.chip} הוא ${status[parseInt(req.params.chip) + 2] == 1 ? 'פועל' : "כבוי"} <br>`
            res.send(mode);
        })
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.get('/onChip/:chip', (req, res, next) => cn.checkButtonAvailability(req.params.chip - 1, 'on', res, next), (req, res) => {
    try {
        axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=0&relay=${req.params.chip - 1}&on=1&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
            let status = response.data.split("&");
            //console.log(req);
            res.send(status);
        })
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.get('/offChip/:chip', (req, res, next) => cn.checkButtonAvailability(req.params.chip - 1, 'off', res, next), (req, res) => {
    try {
        axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=0&relay=${req.params.chip - 1}&on=0&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
            let status = response.data.split("&");
            //console.log(req);
            res.send(status);
        })
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.get('/delayChip/:chip/:time', (req, res, next) => cn.checkButtonAvailability(req.params.chip - 1, 'delay', res, next), (req, res) => {
    try {
        axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=2&relay=${req.params.chip - 1}=1&on=1&time=${req.params.time}&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
            let status = response.data.split("&");
            //console.log(req);
            res.send(status);
        })
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

module.exports = router;