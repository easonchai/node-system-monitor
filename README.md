# ⏲ Node System Monitor

A tool to monitor information about your device & can be configured to update its status via Discord webhooks/Telegram bot.

## 💻 Compatibility

This tool works on all devices, including Windows with some exceptions. You will not be able to get download & upload speeds on Windows at the moment.

This was initially designed to be run on Raspberry Pis, however, it will work on all devices as long as you have NodeJS installed.

## 🏃‍♂️ Getting Started

You need [NodeJS](https://nodejs.org/en/download/) installed on your system (and preferrably [yarn](https://yarnpkg.com/lang/en/docs/install/), but npm works just as well!). If you don't have NodeJS installed, you can follow the script below:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install node
nvm use node
npm i -g yarn
yarn
```

This will install nvm, NodeJS, npm, yarn & the required dependencies. Then, you can query your system's info using:

```bash
node services/query.sh
```

### 💠 Modes

There are two modes you can run it in. The first mode is the simplest. It basically tells you information about your device when you query it. To run this mode, you just need to enter:

```bash
node services/query.js
```

The second mode is daemon mode. This will run a Discord webhook & Telegram bot in the background for you to get updates from. It will run you through the basic setup process on first run. To activate it, just type:

```bash
npx pm2 start services/daemon.js
```

The daemon process is handled by [pm2](https://github.com/Unitech/pm2). You can find more information on it's GitHub page. To stop the process, just type:

```bash
npx pm2 stop daemon
```
