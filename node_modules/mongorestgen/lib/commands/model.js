const path = require("path");
const {
  fs,
  modelPath,
  allowedFileTypes,
  capitalize,
  templatePath,
} = require("./../helpers");
var ejs = require("ejs");

/**
 *
 */

const createIndexFile = (type) => {
  const writeStream = fs.createWriteStream(
    path.join(modelPath, `index.${type}`)
  );
  const defaultContent = fs.readFileSync(
    `${templatePath}/${type}/modelIndex`,
    "utf-8"
  );
  writeStream.write(defaultContent);
  writeStream.end();
  return true;
};

/**
 * Create new Model file
 */
const createFile = (name, type, args) => {
  if (!name) return console.error("Must supply a name for the model.");
  // Model Name
  name = capitalize(name);
  var attrs = [].slice.call(args, 0);
  attrs = parseAttrs(attrs);
  var file = ejs.render(
    fs.readFileSync(`${templatePath}/${type}/model.ejs`, "utf-8"),
    { name, attrs }
  );
  fs.writeFileSync(path.join(modelPath, `${name}.${type}`), file);
  console.info(name + " was successfully created!");
};
/**
 *  Split attributes
 */
const parseAttrs = (args) => {
  let Schema = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i].split(":");
    Schema[arg[0]] = {};
    for (let j = 1; j < arg.length; j++) {
      const attr = arg[j].split("=");
      Schema[arg[0]][attr[0]] =
        attr[0] == "required"
          ? attr[1]
          : attr[0] == "enum"
          ? attr[1].replace("[", "").replace("]", "").split(",")
          : attr[1];
    }
  }
  return Schema;
};

/**
 *
 */
module.exports = (args) => {
  const actualArgs = args.splice(1);
  const modelName = actualArgs[0];
  let typeIndex = actualArgs.indexOf("--type");
  let type = "js";
  if (typeIndex > -1) {
    if (!actualArgs[typeIndex + 1]) {
      throw new Error("Please provide valid file type.");
    }
    if (allowedFileTypes.indexOf(actualArgs[typeIndex + 1]) === -1) {
      throw new Error(
        `Please provide valid file type. Allowed type ${allowedFileTypes}`
      );
    }
    type = actualArgs[typeIndex + 1];
  }
  // Splice index
  let attrIndex = actualArgs.indexOf("--attr");
  for (let i = 0; i <= attrIndex; i++) {
    actualArgs.splice(0, 1);
  }

  if (!modelName) {
    throw new Error(`Please provid model name`);
  }
  const folderExist = fs.directoryExists(modelPath);
  // directory not exists
  if (!folderExist) {
    // Create model directory
    fs.mkdirSync(modelPath);
  }
  if (!fs.existsSync(`${modelPath}/index.${type}`)) {
    // Create Index file
    createIndexFile(path.join(type));
  }

  // Check if Model name as Model in name
  const actualModelName =`${capitalize(modelName.replace("Controller", '').replace('Route', '').replace('Model', ''))}Model`;
  // Create Model file
  createFile(actualModelName, type, actualArgs);
  console.log(`Model ${actualModelName} created successfully in ${modelPath}`);
};
