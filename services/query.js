const { deviceInfo } = require("../utils/info");
const { GREEN, RED, LIGHT_RED, YELLOW } = require("../utils/colors");
const ora = require("ora");

async function printDeviceInfo() {
  const spinner = ora({
    color: "cyan",
    text: "Retrieving device info...",
  });

  spinner.start();
  const system = await deviceInfo();
  spinner.stop();

  console.log(system.hostname);
  console.log("---------------------------------------------\n");
  console.log(`Device:   ${system.model}`);
  console.log(`OS:       ${system.distro}\nKernel:   ${system.kernel}`);
  console.log(
    `CPU:      ${system.brand} [${system.cores} Cores / ${system.threads} Threads] @ ${system.speed} GHz\nCPU Temp: ${system.temp}`
  );
  console.log(
    `RAM:      ${system.free} / ${system.total} GB available [${system.used}]`
  );
  console.log(
    `Download Speed: ${system.downloadSpeed}\nUpload Speed: ${system.uploadSpeed}`
  );

  let drives = "";

  for (const drive of system.drives) {
    const sizeInGb = (drive.size / 1000000000).toFixed(2);
    const availableInGb = (drive.available / 1000000000).toFixed(2);
    let usedPercentage;

    if (drive.use <= 30) {
      usedPercentage = GREEN(drive.use + "% used");
    } else if (drive.use > 30 && drive.use <= 70) {
      usedPercentage = YELLOW(drive.use + "% used");
    } else if (drive.use > 70 && drive.use <= 85) {
      usedPercentage = LIGHT_RED(drive.use + "% used");
    } else {
      usedPercentage = RED(drive.use + "% used");
    }

    drives += `  ${drive.fs}: ${availableInGb} / ${sizeInGb} GB available [${usedPercentage}]\n`;
  }

  console.log(`Drives:\n${drives}`);
}

printDeviceInfo();
