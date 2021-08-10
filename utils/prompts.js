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

module.exports = {
  servicePrompt,
  discordUrlPrompt,
  telegramTokenPrompt,
};
