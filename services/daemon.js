process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { exec } = require("child_process");
const { printError, getArguments, checkDaemon } = require("../utils/helpers");
const { setupInformation } = require("../utils/setup");
const { deviceInfo } = require("../utils/info");
const { format } = require("../utils/output");
const secretFilename = ".secret.json";
const systemFilename = "system.json";
let interval;
let secret;
let content;
let setup = false;

function saveToDisk(data) {
  fs.writeFile(
    path.resolve(`${__dirname}/../${systemFilename}`),
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
  interval = setInterval(async () => {
    const data = await deviceInfo();
    saveToDisk(data);

    content = format(data, false);

    if (secret["discord"]) {
      axios
        .post(secret["discord"], {
          content,
          username: data.hostname,
        })
        .then(() => {
          console.log("Update Discord success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, duration);
  return interval;
}

async function runDaemon() {
  try {
    secret = JSON.parse(
      fs.readFileSync(path.resolve(`./${secretFilename}`), "utf8")
    );
  } catch (error) {
    if (error && error.code == "ENOENT") {
      setup = true;
      secret = await setupInformation();
    } else if (error && error.code != "ENOENT") {
      printError("Error reading secret file...", error, true);
      process.exit(0);
    }
  }

  const args = getArguments();
  if (args && args.some((arg) => checkDaemon(arg))) {
    exec(
      "npx pm2 start services/daemon.js --daemon",
      (error, stdout, stderr) => {
        if (error) {
          console.log(`ERROR: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`STDERR: ${stderr}`);
          return;
        }
        console.log(stdout);
        process.exit(0);
      }
    );
  }

  if (!setup) {
    getDataOnInterval();

    // First update
    const data = await deviceInfo();
    saveToDisk(data);
    content = format(data, false);

    if (secret) {
      if (secret["discord"]) {
        axios
          .post(secret["discord"], {
            content: "✅ Node System Monitor is online!",
            username: "Node System Monitor",
          })
          .then(() => {
            console.log("Discord webhook online!");
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .post(secret["discord"], {
            content,
            username: data.hostname,
          })
          .then(() => {
            console.log("Update success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (secret["telegram"]) {
        const token = secret["telegram"];

        const bot = new TelegramBot(token, { polling: true });

        console.log("Telegram bot online! Type /query to query your system");

        bot.onText(/\/query/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, content);
        });

        bot.on("message", (msg) => {
          const chatId = msg.chat.id;
          if (msg.text == "/query") return;
          bot.sendMessage(chatId, "Type /query to query your system");
        });
      }
    } else {
      await setupInformation();
    }
  }
}

runDaemon();
