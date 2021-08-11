const { deviceInfo } = require("./info");
const fs = require("fs");
const path = require("path");

function saveToDisk(data) {
  fs.writeFile(
    path.resolve(`${__dirname}/../${filename}`),
    JSON.stringify(data),
    { flag: "w" },
    function (err) {
      if (err) {
        printError("", err, VERBOSE);
      }
    }
  );
}

function getDataOnInterval(duration = 60000) {
  const interval = setInterval(async () => {
    const data = await deviceInfo();
    saveToDisk(data);
  }, duration);
  return interval;
}

function killInterval(interval) {
  clearInterval(interval);
}

module.exports = {
  getDataOnInterval,
  killInterval,
};
