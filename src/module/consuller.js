const axios = require('axios');
const path = require('path');


class IvrConsullerManagement {

    constructor(url) {
        this.url = url;
        this.callsStatus = [];
        this.config = require(path.join(__dirname, '../../channelsList.json'));
    }

    async getYmRead(ymData, key) {
        if (this.callsStatus[ymData.ApiCallId][key] == undefined) {
            this.callsStatus[ymData.ApiCallId][key] = 0;
            return 0;
        } else {
            this.callsStatus[ymData.ApiCallId][key]++;
            return this.callsStatus[ymData.ApiCallId][key];
        }
    }

    async getYmReadRequired(ymData, key) {
        if (this.callsStatus[ymData.ApiCallId] == undefined) {
            this.callsStatus[ymData.ApiCallId] = [];
        }

        if (this.callsStatus[ymData.ApiCallId][key] == undefined) {
            return `${key}0`;
        }

        return `${key}${this.callsStatus[ymData.ApiCallId][key]}`;
    }

    async getStatus(ymData) {
        try {
            var status = await axios.get(this.url + 'relay_cgi_load.cgi');
            status = status.data.split("&");
            let ymAnswer = `read=f-YM_LOCAL/mqtt/mainInfo.`

            var i;
            for (i = 0; i < status.length; i++) {
                if (i < 3 || i == status.length - 1) {
                    continue;
                }
                switch (this.config.channels[i - 3].ivrSayType) {
                    case 'NULL':
                        continue;
                    case 'TTS':
                        ymAnswer += `f-YM_LOCAL/mqtt/chanelNumber.d-${i - 2}.t-${this.config.channels[i - 3].name}.f-YM_LOCAL/mqtt/${status[i] == 1 ? 'on' : "off"}.`;
                        break;
                    case 'FILE':
                        ymAnswer += `f-YM_LOCAL/mqtt/chanelNumber.d-${i - 2}.f-${this.config.channels[i - 3].ivrSayFileLocation}.f-YM_LOCAL/mqtt/${status[i] == 1 ? 'on' : "off"}.`;
                        break
                    default:
                        ymAnswer += `f-YM_LOCAL/mqtt/chanelNumber.d-${i - 2}.f-YM_LOCAL/mqtt/${status[i] == 1 ? 'on' : "off"}.`;
                }
            }

            ymAnswer += `f-YM_LOCAL/mqtt/menu=AC${await this.getYmRead(ymData, 'AC')},yes,1,1,7,No,no,no,*/`

            return ymAnswer;
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async onChip(Number) {
        try {
            axios.get(this.url + `relay_cgi.cgi?type=0&relay=${Number - 1}&on=1&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log(response.data);
            });

            let ymAnswer = `id_list_message=f-YM_LOCAL/mqtt/EndAct&go_to_folder=/0`
            console.log('ym: ' + ymAnswer)
            return ymAnswer;
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async offChip(Number) {
        try {
            axios.get(this.url + `relay_cgi.cgi?type=0&relay=${Number - 1}&on=0&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log(response.data);
            });

            let ymAnswer = `id_list_message=f-YM_LOCAL/mqtt/EndAct&go_to_folder=/0`
            console.log('ym: ' + ymAnswer)
            return ymAnswer;
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async delayChip(Number) {
        try {
            axios.get(this.url + `relay_cgi.cgi?type=2&relay=${Number - 1}=1&on=1&time=5&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log(response.data);
            });

            let ymAnswer = `id_list_message=f-YM_LOCAL/mqtt/EndAct&go_to_folder=/0`
            console.log('ym: ' + ymAnswer)
            return ymAnswer;
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async checkButtonAvailability(channel, actions, res, next) {
        if (typeof this.config.channels[channel].actions === "string") {
            switch (this.config.channels[channel].actions) {
                case 'all':
                    return next()
                default:
                    res.status(403);
                    res.send("פעולה אסורה");
            }
        } else {
            if (this.config.channels[channel].actions.includes(actions)) {
                return next()
            } else {
                res.status(403);
                res.send("פעולה אסורה");
            }
        }
    }

    async checkButtonAvailabilityOnIVR(channel, actions) {
        if (typeof this.config.channels[channel].actions === "string") {
            switch (this.config.channels[channel].actions) {
                case 'all':
                    return true
                default:
                    return false
            }
        } else {
            if (this.config.channels[channel].actions.includes(actions)) {
                return true
            } else {
                return false
            }
        }
    }
}

module.exports = IvrConsullerManagement