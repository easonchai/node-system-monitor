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

module.exports = {
  printError,
  getArguments,
  checkVerbose,
  checkDaemon,
};
