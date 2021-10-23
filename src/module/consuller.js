const axios = require('axios');


class ConsullerManagement {

    constructor(url) {
        console.log(`ConsullerManagement new in url ${url}`)
        this.url = url;
    }

    async getStatus() {
        try {
            var status = await axios.get(process.env.MQTT_URL + 'relay_cgi_load.cgi');
            status = status.data.split("&");
            let ymAnswer = `read=f-YM_LOCAL/mqtt/mainInfo.`

            var i;
            for (i = 0; i < status.length; i++) {
                if (i < 3 || i == status.length - 1) {
                    continue;
                }
                ymAnswer += `f-YM_LOCAL/mqtt/chanelNumber.d-${i - 2}.f-YM_LOCAL/mqtt/${status[i] == 1 ? 'on' : "off"}.`
            }

            ymAnswer += `f-YM_LOCAL/mqtt/menu=AC,yes,1,1,7,No,no,no,*/`

            return ymAnswer;
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async onChip(Number) {
        try {
            axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=0&relay=${Number - 1}&on=1&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log('end Api');
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
            axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=0&relay=${Number - 1}&on=0&time=0&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log('end Api');
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
            axios.get(process.env.MQTT_URL + `relay_cgi.cgi?type=2&relay=${Number - 1}=1&on=1&time=5&pwd=${process.env.MQTT_PASS}&`).then(function(response) {
                console.log('end Api');
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
}

module.exports = ConsullerManagement