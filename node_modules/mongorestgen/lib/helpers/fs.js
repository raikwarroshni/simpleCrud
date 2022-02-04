const fs = require("fs");

/**
 * Check if directory exists or not
 * @param path
 * @returns boolean
 */
fs.directoryExists = path => {
  try {
    fs.statSync(path);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = fs;
