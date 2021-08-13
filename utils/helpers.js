function printError(message, error, verbose) {
  console.log(message);
  if (verbose) {
    console.log(error);
  } else {
    console.log("Run with --verbose for more information.");
  }
}

function getArguments() {
  const args = process.argv.slice(2);

  return args;
}

function checkVerbose(argument) {
  if (argument === "-v" || argument === "--verbose") return true;
  return false;
}

function checkDaemon(argument) {
  if (argument === "-d" || argument === "--daemon") return true;
  return false;
}

function checkFrequency(argument) {
  if (argument.startsWith("-f") || argument.startsWith("--frequency")) {
    return true;
  }
  return false;
}

function getFrequency(argument) {
  try {
    return Number(argument.split("=")[1]);
  } catch (err) {
    return 600000;
  }
}

module.exports = {
  printError,
  getArguments,
  checkVerbose,
  checkDaemon,
  checkFrequency,
  getFrequency,
};
