function getPlatform(platform) {
  switch (platform) {
    case "win32":
      return "Windows";
    case "linux":
      return "Linux";
  }
}

module.exports = {
  getPlatform,
};
