const path = require('path');
const fs = require('fs');

function Logs() {
    this.createLogsFolder();
}
Logs.prototype.createLogsFolder = function() {
    fs.readdir(path.resolve(__dirname, 'logs'), (err, data) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdirSync(path.resolve(__dirname, 'logs'));
        }
    })
}
Logs.prototype.getTime = function() {
    const date = new Date();
    let ymd = [];
    let hms= [];
    ymd.push(date.getFullYear());
    ymd.push((date.getMonth() + 1).toString().padStart(2, '0'));
    ymd.push(date.getDate().toString().padStart(2, '0'));
    hms.push(date.getHours().toString().padStart(2, '0'));
    hms.push(date.getMinutes().toString().padStart(2, '0'));
    hms.push(date.getSeconds().toString().padStart(2, '0'));
    return {ymd, hms};
}
Logs.prototype.writeLog = function(log) {
    const { ymd, hms } = this.getTime();
    const fileName = ymd.join('-') + '.txt';
    const dirData = fs.readdirSync(path.resolve(__dirname, 'logs'));

    let logData = '';
    if (dirData.includes(fileName)) {
        logData = fs.readFileSync(path.resolve(__dirname, `logs/${fileName}`)).toString();
    }
    log = `${ymd.join('-')} ${hms.join(':')} ${log}`;
    fs.writeFileSync(path.resolve(__dirname, `logs/${fileName}`), `${logData}\r\n${log}`);
    console.log(log);
}

const logs = new Logs();

module.exports = logs.writeLog.bind(logs);
