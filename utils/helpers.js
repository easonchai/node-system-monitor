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

  switch (args.length) {
    case 0:
      return false;
    case 1:
      return checkVerbose(args[0]);
    default:
      console.log("Too many arguments!");
      return false;
  }
}

function checkVerbose(argument) {
  if (argument === "-v" || argument === "--verbose") return true;
  else {
    console.log("Unknown argument", argument);
    process.exit(0);
  }
}

module.exports = {
  printError,
  getArguments,
};
