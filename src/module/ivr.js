const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const path = require('path');
const consuller = require(path.join(__dirname, 'consuller.js'));

let cn = new consuller(process.env.MQTT_URL);

router.get('/', async(req, res) => {
    ymData = req.query;
    //console.log(typeof ymData.AC)
    if (ymData.AC == undefined) {
        // אם ריק מחזיר סטטוס
        res.send(await cn.getStatus());
    } else if (ymData.AC == 1 && ymData.Number == undefined) {
        res.send('read=f-YM_LOCAL/mqtt/selectOn=Number,no,1,1,7,No,yes,no,*/');
    } else if (ymData.AC == 1 && ymData.Number != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData.Number - 1, 'on')) {
            res.send(await cn.onChip(ymData.Number));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else if (ymData.AC == 2 && ymData.Number == undefined) {
        res.send('read=f-YM_LOCAL/mqtt/selectOff=Number,no,1,1,7,No,yes,no,*/');
    } else if (ymData.AC == 2 && ymData.Number != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData.Number - 1, 'off')) {
            res.send(await cn.offChip(ymData.Number));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else if (ymData.AC == 3 && ymData.Number == undefined) {
        res.send('read=f-YM_LOCAL/mqtt/selectDelay=Number,no,1,1,7,No,yes,no,*/');
    } else if (ymData.AC == 3 && ymData.Number != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData.Number - 1, 'delay')) {
            res.send(await cn.delayChip(ymData.Number));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else {
        res.send('ERROR');
    }
});

module.exports = router;