/**
 * Shows the available commands
 */
module.exports = () => {
  console.log("Available commands!");
  console.log(`
    Create a controller 
      make:controller, make:c, make:ctrl
      gen:controller, gen:c, gen:ctrl
    Create a model 
      make:model, make:m, make:mod
      gen:model, gen:m, gen:mod
    Create a route 
      make:route, make:r, make:rt
      gen:route, gen:r, gen:rt
  `);
};
