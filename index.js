const nodeOS = require("os");
const os = require("os-utils");
const { getPlatform } = require("./platforms");
const speedTest = require("speedtest-net");
const si = require("systeminformation");

async function getCPUInfo() {
  const cpu = await si.cpu();
  // const cpu = nodeOS.cpus();
  // const cpuThreads = cpu.length;
  // const cpuModel = cpu[0].model.trim();
  // const cpuSpeed = cpu[0].speed / 1000;

  // return `CPU:  ${cpuModel} [${cpuThreads / 2} Cores] @ ${cpuSpeed.toFixed(
  //   3
  // )} GHz`;
  return cpu
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
    const downloadBits = (speedtest.download.bytes * 8) / 1000; // Mb
    const downloadTime = speedtest.download.elapsed;
    const uploadBits = (speedtest.upload.bytes * 8) / 1000; // Mb
    const uploadTime = speedtest.download.elapsed;

    downloadSpeed = (downloadBits / downloadTime).toFixed(2) + " Mbps";
    uploadSpeed = (uploadBits / uploadTime).toFixed(2) + " Mbps";
  } catch (err) {
    // Windows is not supported
  }

  return `Download Speed: ${downloadSpeed}\nUpload Speed: ${uploadSpeed}`;
}

async function getSystemInfo() {
  const system = await si.system();
  return `Device: ${system.model}`
}

async function getDeviceInfo() {
  console.log(getHostname());
  console.log("---------------------------------------------\n");
  console.log(await getSystemInfo());
  console.log(await getOperatingSystem());
  console.log(await getCPUInfo());
  console.log(await getMemoryInfo());
  // console.log(await getInternetSpeed());

  
}

getDeviceInfo();
