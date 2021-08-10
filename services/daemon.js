const fs = require("fs");
const path = require("path");
const { printError } = require("../utils/helpers");
const { setupInformation } = require("../utils/setup");

let VERBOSE = false;
const filename = ".secret.json";

async function runDaemon() {
  let data;
  VERBOSE = getArguments();

  try {
    data = fs.readFileSync(path.resolve(`./${filename}`), "utf8");
  } catch (error) {
    if (error && error.code == "ENOENT") {
      data = await setupInformation();
    } else if (error && error.code != "ENOENT") {
      printError("Error reading secret file...", error, VERBOSE);
      process.exit(0);
    }
  }

  if (data) {
    const jsonData = JSON.parse(data);
    if (jsonData["discord"]) {
      console.log("discord");
    }
    if (jsonData["telegram"]) {
      console.log("telegram");
    }
  } else {
    await setupInformation();
  }
}

runDaemon();
