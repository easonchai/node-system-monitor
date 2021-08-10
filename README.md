# Raspberry Pi NodeJS Monitor

A tool to monitor information about your Raspberry Pi & can be configured to update its status via Discord/Telegram

## Getting Started

You need NodeJS installed on your system.
To get it running with just NodeJS, run these commands:

```bash
yarn
node index.js
```

### Modes

There are two modes you can run it in. The first mode is the simplest. It basically tells you information about your device when you query it. To run this mode, you just need to enter:

```bash
./query.sh
```

The second mode is daemon mode. This will run a Discord webhook & Telegram bot in the background for you to get updates from. It will run you through the basic setup process on first run. To activate it, just type:

```bash
./daemon.sh
```

TODO:

- [] Add cron task to update nodejs
- [] Add script to call in nodejs
- [] Add Telegram bot support
- [] Add Discord webhook support
