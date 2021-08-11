function format(data) {
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

  return `
${system.hostname}
---------------------------------------------
Device:   ${system.model}
OS:       ${system.distro}\nKernel:   ${system.kernel}
CPU:      ${system.brand} [${system.cores} Cores / ${system.threads} Threads] @ ${system.speed} GHz\nCPU Temp: ${system.temp}
RAM:      ${system.free} / ${system.total} GB available [${system.used}]
Download Speed: ${system.downloadSpeed}\nUpload Speed: ${system.uploadSpeed}
Drives:\n${drives}
`;
}

module.exports = {
  format,
};
