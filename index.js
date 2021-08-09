const nodeOS = require("os");
const os = require("os-utils");
const { getPlatform } = require("./platforms");
const speedTest = require("speedtest-net");
const si = require("systeminformation");
const { CYAN, GREEN, BLUE, RED, LIGHT_RED, YELLOW } = require("./colors");

async function getCPUInfo() {
  const cpu = await si.cpu();
  const cpuTemp = (await si.cpuTemperature()).main;
  let styledCpuTemp = "N/A";

  if (cpuTemp < 0) {
    styledCpuTemp = BLUE(cpuTemp + "°C")
  } else if (cpuTemp > 0 && cpuTemp <= 20) {
    styledCpuTemp = CYAN(cpuTemp + "°C")
  } else if (cpuTemp > 20 && cpuTemp <= 50) {
    styledCpuTemp = GREEN(cpuTemp + "°C")
  } else if (cpuTemp > 50 && cpuTemp <= 80) {
    styledCpuTemp = YELLOW(cpuTemp + "°C")
  } else if (cpuTemp > 80 && cpuTemp <= 90) {
    styledCpuTemp = LIGHT_RED(cpuTemp + "°C")
  } else if (cpuTemp > 90) {
    styledCpuTemp = RED(cpuTemp + "°C")
  }

  return `CPU:      ${cpu.brand} [${cpu.physicalCores} Cores / ${cpu.cores} Threads] @ ${cpu.speed} GHz\nCPU Temp: ${styledCpuTemp}`;
}

async function getMemoryInfo() {
  const memory = await si.mem();
  const freeMemory = memory.free / 1000000000; // In GB
  const totalMemory = memory.total / 1000000000; // In GB
  const percentage = (memory.used / memory.total * 100).toFixed(2); // In 100.00%
  let styledPercentage;

  if (percentage < 50) {
    styledPercentage = GREEN(percentage + "% used");
  } else if (percentage >= 50 && percentage < 70) {
    styledPercentage = YELLOW(percentage + "% used");
  } else if (percentage >= 70 && percentage < 90) {
    styledPercentage = LIGHT_RED(percentage + "% used");
  } else {
    styledPercentage = RED(percentage + "% used")
  }

  return `RAM:      ${freeMemory.toFixed(2)} / ${totalMemory.toFixed(2)} GB available [${styledPercentage}]`;
}

function getHostname() {
  return nodeOS.hostname();
}

function getOperatingSystem() {
  const platform = nodeOS.platform();
  const parsedPlatform = getPlatform(platform);
  const release = nodeOS.release();

  return `OS:       ${parsedPlatform} ${release}`;
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
  return `Device:   ${system.model}`
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
