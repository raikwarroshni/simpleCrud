const path = require("path");
const {
  fs,
  routePath,
  allowedFileTypes,
  capitalize,
  templatePath,
} = require("./../helpers");
const controller = require("./controller");

const ejs = require("ejs");
/**
 *
 */
const createIndexFile = (type) => {
  const writeStream = fs.createWriteStream(
    path.join(routePath, `index.${type}`)
  );
  const defaultContent = fs.readFileSync(
    `${templatePath}/${type}/routeIndex`,
    "utf8"
  );
  writeStream.write(defaultContent);
  writeStream.end();
  return true;
};

/**
 *
 */
const createFile = (name, type) => {
  var file = ejs.render(
    fs.readFileSync(`${templatePath}/${type}/route.ejs`, "utf-8"),
    { name }
  );
  fs.writeFileSync(path.join(routePath, `${name}.${type}`), file);
};

/**
 *
 */
module.exports = (args) => {
  const arg = Object.assign([], args)
  const actualArgs = args.splice(1);
  const routeName = actualArgs[0];
  const createController = actualArgs.indexOf("--ctrl") > -1 || actualArgs.indexOf("-c") > -1 || actualArgs.indexOf("--controller") > -1;
  let typeIndex = actualArgs.indexOf("--type");
  let type = "js";
  if (typeIndex > -1) {
    if (!actualArgs[typeIndex + 1]) {
      throw new Error("Please provide valid file type");
    }
    if (allowedFileTypes.indexOf(actualArgs[typeIndex + 1]) === -1) {
      throw new Error(
        `Please provide valid file type. Allowed types: ${allowedFileTypes}`
      );
    }
    type = actualArgs[typeIndex + 1];
  }
  if (!routeName) {
    throw new Error(`Please provide route name`);
  }
  let folderExists = fs.directoryExists(routePath);
  // directory not exists
  if (!folderExists) {
    // create route directory
    fs.mkdirSync(routePath);
  }

  if (!fs.existsSync(`${routePath}/index.${type}`)) {
    // Create index file
    createIndexFile(type);
  }
  // Check if route name as route in name
  const actualRouteName =`${capitalize(routeName.replace("Controller", '').replace('Route', '').replace('Model', ''))}Route`;
  // Create Route File
  createFile(actualRouteName, type);
  if (createController) {
    controller(arg)
  }
  console.log(`Route ${actualRouteName} created successfully in ${routePath}`);
};
