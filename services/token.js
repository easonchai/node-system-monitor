const fs = require("fs");
const path = require("path");
const { addOrEditPrompt, editPrompt, addPrompt } = require("../utils/prompts");
const secretFilename = ".secret.json";

async function promptUser() {
  const choice = await addOrEditPrompt.run();
  let availableChoices = ["Discord", "Telegram"];
  let existingSecrets;

  try {
    const parsedSecret = JSON.parse(
      fs.readFileSync(path.resolve(`./${secretFilename}`), "utf8")
    );

    existingSecrets = Object.keys(parsedSecret);

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

    // Add whatever we dont have
  } else if (choice == "Edit") {
    const selectedChoices = await editPrompt(existingSecrets).run();

    // Do something
  }
}

promptUser();
