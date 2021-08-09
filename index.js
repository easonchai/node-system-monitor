const nodeOS = require("os");
const os = require("os-utils");
const { getPlatform } = require("./platforms");
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
  const parsedPlatform = getPlatform(platform);
  const release = nodeOS.release();

  return `OS:   ${parsedPlatform} ${release}`;
}

async function getInternetSpeed() {
  let downloadSpeed = "N/A";
  let uploadSpeed = "N/A";

  try {
    const speedtest = await speedTest({ acceptLicense: true });
    const downloadBits = speedtest.download.bytes * 8;
    const downloadTime = speedtest.download.elapsed;
    const uploadBits = speedtest.upload.bytes * 8;
    const uploadTime = speedtest.download.elapsed;

    downloadSpeed = (downloadBits / downloadTime).toFixed(2) + " Mbps";
    uploadSpeed = (uploadBits / uploadTime).toFixed(2) + " Mbps";
  } catch (err) {
    // Windows is not supported
  }

  return `Download Speed: ${downloadSpeed}\nUpload Speed: ${uploadSpeed}`;
}

async function getDeviceInfo() {
  console.log(getHostname());
  console.log("---------------------------------------------\n");
  console.log(getOperatingSystem());
  console.log(getCPUInfo());
  console.log(getMemoryInfo());
  console.log(getInternetSpeed());
}

getDeviceInfo();
