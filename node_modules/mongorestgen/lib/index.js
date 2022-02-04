const { help, controller, model, route } = require("./commands");
/**
 * Handle generate call
 * @author Sonu Bamniya
 * @param args any
 * @returns void
 */
module.exports = (args) => {
  switch (args[0]) {
    case "--help":
    case "-h":
      return help();
    case "make:controller":
    case "make:c":
    case "make:ctrl":
    case "gen:controller":
    case "gen:c":
    case "gen:ctrl":
      return controller(args);
    case "make:model":
    case "make:m":
    case "make:mod":
    case "gen:model":
    case "gen:m":
    case "gen:mod":
      return model(args);
    case "make:route":
    case "make:r":
    case "make:rt":
    case "gen:route":
    case "gen:r":
    case "gen:rt":
      return route(args);
    default:
      throw new Error("Invalid argument passed!");
  }
};
