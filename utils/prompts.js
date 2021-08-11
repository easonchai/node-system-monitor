const { MultiSelect, Input, Select } = require("enquirer");

const servicePrompt = new MultiSelect({
  name: "service",
  message: "Pick the service to set up (Space to select)",
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

const addOrEditPrompt = new Select({
  message: "Would you like to add or edit an existing secret?",
  choices: ["Add", "Edit"],
});

const addPrompt = (choices) =>
  new MultiSelect({
    message: "What secrets do you want to add?",
    choices,
  });

const editPrompt = (choices) =>
  new MultiSelect({
    message: "Which secrets do you want to edit?",
    choices,
  });

module.exports = {
  servicePrompt,
  discordUrlPrompt,
  telegramTokenPrompt,
  addOrEditPrompt,
  addPrompt,
  editPrompt,
};
