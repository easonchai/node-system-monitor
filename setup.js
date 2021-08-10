// https://discord.com/api/webhooks/874603485574885387/D8B3U_KREyUXFjw6_uDWLs2oaMV20FzIRBbMCyZL2Yup-qx-qOWE0lvGoAfCrMkNnsdW

const { MultiSelect, Input } = require("enquirer");

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

telegramTokenPrompt
  .run()
  .then((answer) => console.log("Answer:", answer))
  .catch(console.error);
