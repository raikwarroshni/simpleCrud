## mongorestgen

This is created for making devlopment process faster.
As of now, it is only created according what we follow here at <a href="https://github.com/Chapter247IND">Chapter247</a>
Generate controllers, models and routes using the command line

## Installation

```
npm install -g mongorestgen
```

Validate the installation by running `mongorestgen --help`

## Available scripts

### Create a controller

```
mongorestgen make:controller NewTest
```

alias:
`make:c`, `make:ctrl`, `gen:controller`, `gen:c`, `gen:ctrl`

This will create a file inside `controllers` directory named `NewTestController.js` with the following content.

```
"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
const index = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Create a record
 * @param { req, res }
 * @returns JsonResponse
 */
const store = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * Get only single record
 * @param { req, res }
 * @returns JsonResponse
 */
 const details = async(req, res, next) => {
   try{
    // next() or
    return res.status(200).json({
      success: true,
      message: "Details fatched successfully.",
      data: {}
    });
   }
   catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
 }

/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */
const update = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const destroy = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};



/**
 * Export as a single common js module
 */
module.exports = {
  index,
  store,
  details,
  update,
  destroy
};

```

### Create a model

```
mongorestgen make:model Test --attr name:type=String:require=true
```

alias:
`make:m`, `make:md`, `gen:model`, `gen:m`, `gen:md`

This will create a file inside `models` directory named `TestModel.js` with the following content.

```
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestModelSchema = new Schema({

  name: {type: String,require: true,},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

TestModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

TestModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

TestModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


module.exports = mongoose.model('test', TestModelSchema);
```

### Create a route

```
mongorestgen make:route Test
```

alias:
`make:r`, `make:rt`, `gen:route`, `gen:r`, `gen:rt`

This will create a file inside `routes` directory named `TestRoute.js` with the following content.

```
const express = require('express')
const router = express.Router()
const { TestController } = require('../controllers')

router.get('/' , TestController.index)
router.post('/', TestController.store)
router.put('/:id', TestController.update)
router.delete('/', TestController.destroy)
router.get('/:id', TestController.details)

module.exports = router
```

#### Create route and controller in single command

```
mongorestgen make:route Test --controller
```

alias:
`-c`, `--ctrl`
This will create a file inside `routes` directory named `TestRoute.js` with the following content and controller file inside `controllers` directory as name `TestController` with default controller code.
