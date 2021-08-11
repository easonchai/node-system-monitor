const { deviceInfo } = require("../utils/info");
const { format } = require("../utils/output");
const ora = require("ora");
const fs = require("fs");
const path = require("path");
const filename = "system.json";

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

async function printDeviceInfo() {
  const spinner = ora({
    color: "cyan",
    text: "Retrieving device info...",
  });

  spinner.start();
  const system = await deviceInfo();
  saveToDisk(system);
  spinner.stop();

  console.log(format(system));
}

printDeviceInfo();
