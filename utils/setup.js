// https://discord.com/api/webhooks/874603485574885387/D8B3U_KREyUXFjw6_uDWLs2oaMV20FzIRBbMCyZL2Yup-qx-qOWE0lvGoAfCrMkNnsdW

const { servicePrompt, updateSecrets } = require("./prompts");
const { printError, getArguments, checkVerbose } = require("./helpers");
const fs = require("fs");

let VERBOSE = false;
const filename = ".secret.json";

async function setupInformation() {
  const args = getArguments();
  VERBOSE = args.some((arg) => checkVerbose(arg));

  try {
    const services = await servicePrompt.run();

    if (services.length < 1) {
      console.log("No services selected. Quitting...");
      process.exit(0);
    }

    let data = {};
    data = await updateSecrets(data, services);

    fs.writeFile(
      `${__dirname}/../${filename}`,
      JSON.stringify(data),
      { flag: "w" },
      function (err) {
        if (err) {
          printError("Error saving to file.", err, VERBOSE);
          process.exit(0);
        }
        console.log("\033[1;32mSetup successfull!\033[0m");
      }
    );

    return data;
  } catch (error) {
    if (error && error != "") {
      printError(
        "An error occured. Please run setup.js again!",
        error,
        VERBOSE
      );
    }
    process.exit(0);
  }
}

module.exports = { setupInformation };
