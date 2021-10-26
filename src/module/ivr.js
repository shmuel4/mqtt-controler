const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const path = require('path');
const consuller = require(path.join(__dirname, 'consuller.js'));
let cn = new consuller(process.env.MQTT_URL);

router.get('/', async(req, res) => {
    let ymData = req.query;
    //console.log(typeof ymData.AC)
    if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == undefined) {
        // אם ריק מחזיר סטטוס
        res.send(await cn.getStatus(ymData));
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 1 && ymData[await cn.getYmReadRequired(ymData, 'Number')] == undefined) {
        res.send(`read=f-YM_LOCAL/mqtt/selectOn=Number${await cn.getYmRead(ymData, 'Number')},no,1,1,7,No,yes,no,*/`);
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 1 && ymData[await cn.getYmReadRequired(ymData, 'Number')] != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData[await cn.getYmReadRequired(ymData, 'Number')] - 1, 'on')) {
            res.send(await cn.onChip(ymData[await cn.getYmReadRequired(ymData, 'Number')]));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 2 && ymData[await cn.getYmReadRequired(ymData, 'Number')] == undefined) {
        res.send(`read=f-YM_LOCAL/mqtt/selectOff=Number${await cn.getYmRead(ymData, 'Number')},no,1,1,7,No,yes,no,*/`);
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 2 && ymData[await cn.getYmReadRequired(ymData, 'Number')] != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData[await cn.getYmReadRequired(ymData, 'Number')] - 1, 'off')) {
            res.send(await cn.offChip(ymData[await cn.getYmReadRequired(ymData, 'Number')]));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 3 && ymData[await cn.getYmReadRequired(ymData, 'Number')] == undefined) {
        res.send(`read=f-YM_LOCAL/mqtt/selectDelay=Number${await cn.getYmRead(ymData, 'Number')},no,1,1,7,No,yes,no,*/`);
    } else if (ymData[await cn.getYmReadRequired(ymData, 'AC')] == 3 && ymData[await cn.getYmReadRequired(ymData, 'Number')] != undefined) {
        if (await cn.checkButtonAvailabilityOnIVR(ymData[await cn.getYmReadRequired(ymData, 'Number')] - 1, 'delay')) {
            res.send(await cn.delayChip(ymData[await cn.getYmReadRequired(ymData, 'Number')]));
        } else {
            res.send("id_list_message=f-YM_LOCAL/mqtt/NotAllowAction&go_to_folder=/0");
        }
    } else {
        res.send(await cn.getStatus(ymData));
    }
});

module.exports = router;