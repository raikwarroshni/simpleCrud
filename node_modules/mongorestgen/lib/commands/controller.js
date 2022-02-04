const path = require("path");
const {
  fs,
  controllerPath,
  allowedFileTypes,
  capitalize,
  templatePath,
} = require("./../helpers");
/**
 *
 */
const createIndexFile = (type) => {
  const writeStream = fs.createWriteStream(
    path.join(controllerPath, `index.${type}`)
  );
  const defaultContent = fs.readFileSync(
    `${templatePath}/${type}/controllerIndex`,
    "utf-8"
  );
  writeStream.write(defaultContent);
  writeStream.end();
  return true;
};
/**
 *
 */
const createFile = (name, type) => {
  const writeStream = fs.createWriteStream(
    path.join(controllerPath, `${name}.${type}`)
  );
  const defaultContent = fs.readFileSync(
    `${templatePath}/${type}/controller`,
    "utf-8"
  );
  writeStream.write(defaultContent);
  writeStream.end();
  return true;
};
/**
 *
 */
module.exports = (args) => {
  const actualArgs = args.splice(1);
  const controllerName = actualArgs[0];
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

  if (!controllerName) {
    throw new Error("Please provide controller name.");
  }
  const folderExists = fs.directoryExists(controllerPath);
  // directory not exists
  if (!folderExists) {
    // create controller directory
    fs.mkdirSync(controllerPath);
  }
  if (!fs.existsSync(`${controllerPath}/index.${type}`)) {
    // create index file
    createIndexFile(type);
  }

  // check if controller name as Controller in name
  const actualControllerName = `${capitalize(controllerName.replace("Controller", '').replace('Route', '').replace('Model', ''))}Controller`;
  // create controller file
  createFile(actualControllerName, type);

  console.log(
    `Controller ${actualControllerName} created successfully in ${controllerPath}`
  );
};
