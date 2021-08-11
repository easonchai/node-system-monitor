const { deviceInfo } = require("./info");

let interval;
const intervalDuration = 60000;

function getDataOnInterval() {
  interval = setInterval(async () => {
    const data = await deviceInfo();
    // Save to file here
  }, intervalDuration);
}

function killInterval() {
  clearInterval(interval);
}

module.exports = {
  getDataOnInterval,
  killInterval,
};
