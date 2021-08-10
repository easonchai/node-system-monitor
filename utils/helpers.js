function printError(message, error, verbose) {
  console.log(message);
  if (verbose) {
    console.log(error);
  } else {
    console.log("Run with --verbose for more information.");
  }
}

module.exports = {
  printError,
};
