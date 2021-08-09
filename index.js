const nodeOS = require("os");
const os = require("os-utils");
const speedTest = require("speedtest-net");

function getCPUInfo() {
  const cpu = nodeOS.cpus();
  const cpuThreads = cpu.length;
  const cpuModel = cpu[0].model.trim();
  const cpuSpeed = cpu[0].speed / 1000;

  return `CPU:  ${cpuModel} [${cpuThreads / 2} Cores] @ ${cpuSpeed.toFixed(
    3
  )} GHz`;
}

function getMemoryInfo() {
  const freeMemory = os.freemem() / 1000; // In GB
  const totalMemory = os.totalmem() / 1000; // In GB
  const percentage = os.freememPercentage() * 100; // In 100.00%
  return `RAM:  ${freeMemory.toFixed(2)} / ${totalMemory.toFixed(
    2
  )} GB available [${percentage.toFixed(2)}% used]`;
}

function getHostname() {
  return nodeOS.hostname();
}

function getOperatingSystem() {
  const platform = nodeOS.platform();
  const release = nodeOS.release();
  const version = nodeOS.version();

  return `OS:   ${version} ${release} [${platform}] `;
}

async function getDeviceInfo() {
  console.log(getHostname());
  console.log("---------------------------------------------\n");
  console.log(getOperatingSystem());
  console.log(getCPUInfo());
  console.log(getMemoryInfo());
  try {
    console.log(await speedTest());
  } catch (err) {
    console.log(err.message);
  } finally {
    process.exit(0);
  }
}

getDeviceInfo();
