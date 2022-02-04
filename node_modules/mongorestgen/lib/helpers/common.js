const path = require("path");

/**
 * get the root directory
 *
 */
const rootDirectory = process.cwd();
/**
 * sets the controller path
 */
const controllerPath = path.join(rootDirectory, "controllers");
/**
 * sets the model path
 */

const modelPath = path.join(rootDirectory, "models");
/**
 * sets the seeder path
 */

const seedPath = path.join(rootDirectory, "seeds");

/**
 * sets the route path
 */

const routePath = path.join(rootDirectory, "routes");
/**
 *
 */
const allowedFileTypes = ["js", "ts"];
/**
 * sets the controller path
 */
const templatePath = path.join(__dirname, "..", "template");
/**
 *
 */

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports = {
  rootDirectory,
  controllerPath,
  modelPath,
  seedPath,
  routePath,
  allowedFileTypes,
  capitalize,
  templatePath
};
