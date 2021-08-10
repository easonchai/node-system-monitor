const { CYAN, GREEN, BLUE, RED, LIGHT_RED, YELLOW } = require("./colors");
const speedTest = require("speedtest-net");
const si = require("systeminformation");

async function getCPUInfo() {
  const cpu = await si.cpu();
  const cpuTemp = (await si.cpuTemperature()).main;
  let styledCpuTemp = "N/A";

  if (cpuTemp < 0) {
    styledCpuTemp = BLUE(cpuTemp + "°C");
  } else if (cpuTemp > 0 && cpuTemp <= 20) {
    styledCpuTemp = CYAN(cpuTemp + "°C");
  } else if (cpuTemp > 20 && cpuTemp <= 50) {
    styledCpuTemp = GREEN(cpuTemp + "°C");
  } else if (cpuTemp > 50 && cpuTemp <= 80) {
    styledCpuTemp = YELLOW(cpuTemp + "°C");
  } else if (cpuTemp > 80 && cpuTemp <= 90) {
    styledCpuTemp = LIGHT_RED(cpuTemp + "°C");
  } else if (cpuTemp > 90) {
    styledCpuTemp = RED(cpuTemp + "°C");
  }

  return {
    brand: cpu.brand,
    cores: cpu.physicalCores,
    threads: cpu.cores,
    speed: cpu.speed,
    temp: styledCpuTemp,
  };
}

async function getMemoryInfo() {
  const memory = await si.mem();
  const freeMemory = memory.free / 1000000000; // In GB
  const totalMemory = memory.total / 1000000000; // In GB
  const percentage = ((memory.used / memory.total) * 100).toFixed(2); // In 100.00%
  let styledPercentage;

  if (percentage < 50) {
    styledPercentage = GREEN(percentage + "% used");
  } else if (percentage >= 50 && percentage < 70) {
    styledPercentage = YELLOW(percentage + "% used");
  } else if (percentage >= 70 && percentage < 90) {
    styledPercentage = LIGHT_RED(percentage + "% used");
  } else {
    styledPercentage = RED(percentage + "% used");
  }

  return {
    free: freeMemory.toFixed(2),
    total: totalMemory.toFixed(2),
    used: styledPercentage,
  };
}

async function getHostname() {
  const info = await si.osInfo();
  return { hostname: info.hostname };
}

async function getOperatingSystem() {
  const os = await si.osInfo();

  return { distro: os.distro, kernel: os.kernel };
}

async function getDriveInfo() {
  const drives = await si.fsSize();

  return { drives };
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

  return {
    downloadSpeed,
    uploadSpeed,
  };
}

async function getSystemInfo() {
  const system = await si.system();
  return { model: system.model };
}

async function deviceInfo() {
  hostname = await getHostname();
  system = await getSystemInfo();
  os = await getOperatingSystem();
  cpu = await getCPUInfo();
  memory = await getMemoryInfo();
  internet = await getInternetSpeed();
  drives = await getDriveInfo();

  return {
    ...hostname,
    ...system,
    ...os,
    ...cpu,
    ...memory,
    ...internet,
    ...drives,
  };
}

module.exports = {
  deviceInfo,
};
