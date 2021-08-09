const os = require("os-utils");

function getCPUInfo() {
  const cpu = os.cpus();
  const cpuThreads = cpu.length;
  const cpuModel = cpu[0].model.trim();
  const cpuSpeed = cpu[0].speed / 1000;

  return `CPU: ${cpuModel} [${cpuThreads / 2} Cores] @ ${cpuSpeed.toFixed(
    3
  )} GHz`;
}

function getMemoryInfo() {
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const percentage = os.freememPercentage();
}

function getDeviceInfo() {
  console.log(getCPUInfo());
  console.log(os.loadavg());
  console.log(os.type());
}
// console.log("CPUS:", os.cpus());
// console.log("Free RAM:", os.freemem());
// console.log("Total RAM:", os.totalmem());
// console.log("Platform:", os.platform());
// console.log("Release:", os.release());

getDeviceInfo();
