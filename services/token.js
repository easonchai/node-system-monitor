const fs = require("fs");
const path = require("path");
const {
  addOrEditPrompt,
  editPrompt,
  addPrompt,
  updateSecrets,
} = require("../utils/prompts");
const secretFilename = ".secret.json";

async function promptUser() {
  const choice = await addOrEditPrompt.run();
  let availableChoices = ["Discord", "Telegram"];
  let existingSecrets;
  let secret = {};

  try {
    secret = JSON.parse(
      fs.readFileSync(path.resolve(`./${secretFilename}`), "utf8")
    );

    existingSecrets = Object.keys(secret);

    for (const key of existingSecrets) {
      availableChoices = availableChoices.filter(
        (item) => item.toLowerCase() != key.toLowerCase()
      );
    }
  } catch (error) {
    existingSecrets = [];
  }

  if (choice == "Add") {
    if (availableChoices.length < 1) {
      console.log("All secrets have been set up. You can't add any more");
      process.exit(0);
    }

    const services = await addPrompt(availableChoices).run();
    if (services.length < 1) {
      process.exit(0);
    }

    secret = await updateSecrets(secret, services);
  } else if (choice == "Edit") {
    if (existingSecrets.length < 1) {
      console.log("No secrets exist. Add a secret first!");
      process.exit(0);
    }

    existingSecrets = existingSecrets.map(
      (item) => item.charAt(0).toUpperCase() + item.substr(1, item.length)
    );

    const selectedChoices = await editPrompt(existingSecrets).run();
    secret = await updateSecrets(secret, selectedChoices);
  }

  fs.writeFile(
    `${__dirname}/../${secretFilename}`,
    JSON.stringify(secret),
    { flag: "w" },
    function (err) {
      if (err) {
        printError("Error saving to file.", err, VERBOSE);
        process.exit(0);
      }
      console.log("\033[1;32mSetup successfull!\033[0m");
    }
  );
}

promptUser();
