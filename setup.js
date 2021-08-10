// https://discord.com/api/webhooks/874603485574885387/D8B3U_KREyUXFjw6_uDWLs2oaMV20FzIRBbMCyZL2Yup-qx-qOWE0lvGoAfCrMkNnsdW

const { MultiSelect, Input } = require("enquirer");

let VERBOSE = false;

const servicePrompt = new MultiSelect({
  name: "service",
  message: "Pick the service to set up",
  limit: 2,
  choices: [
    { name: "Discord", value: "discord" },
    { name: "Telegram", value: "telegram" },
  ],
});

const discordUrlPrompt = new Input({
  message: "Paste your Discord Webhook URL:",
  initial: "https://discord.com/api/webhooks/874...",
});

const telegramTokenPrompt = new Input({
  message: "Paste your Telegram Bot API Token:",
  initial: "6734...Js48",
});

// servicePrompt
//   .run()
//   .then((answer) => console.log("Answer:", answer))
//   .catch(console.error);

// discordUrlPrompt
//   .run()
//   .then((answer) => console.log("Answer:", answer))
//   .catch(console.error);

// telegramTokenPrompt
//   .run()
//   .then((answer) => console.log("Answer:", answer))
//   .catch(console.error);

function getArguments() {
  const args = process.argv.slice(2);

  switch (args.length) {
    case 0:
      return;
    case 1:
      setVerbose(args[0]);
      return;
    default:
      console.log("Too many arguments!");
      return;
  }
}

function setVerbose(argument) {
  console.log("here");
  if (argument === "-v" || argument === "--verbose") VERBOSE = true;
  else {
    console.log("Unknown argument", argument);
    process.exit(0);
  }
}

async function getInformation() {
  try {
    getArguments();
    const services = await servicePrompt.run();
  } catch (error) {
    if (error != "") {
      console.log("An error occured. Please run setup.js again!");
      if (VERBOSE) {
        console.log(error);
      } else {
        console.log("Run with --verbose for more information.");
      }
    }
  }
}

getInformation();
