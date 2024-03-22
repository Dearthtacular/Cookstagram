const RecipeModel = require("../models/recipe");

module.exports = {
  create,
  index,
  delete: deleteOne,
};

const { v4: uuidv4 } = require('uuid');
// uuid, helps generate our unique ids
const S3 = require('aws-sdk/clients/s3');
const recipe = require("../models/recipe");
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

const BUCKET_NAME = process.env.S3_BUCKET
console.log(BUCKET_NAME)

function create(req, res) {
  console.log(req.file, req.body, req.user)
  // check to make sure a file was sent over

  const filePath = `cookstagram/${uuidv4()}-${req.file.originalname}`
  console.log(filePath)
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }
  // Upload our file to aws (request/response to aws)
  s3.upload(params, async function (err, data) {
    console.log("=======================");
    console.log(err, " err from aws");
    console.log("=======================");
    if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
    try {
      // then save our recipe to mongodb (request and response to mongodb)
      // Using our model to create a document in the recipes collection in mongodb
      const recipe = await RecipeModel.create({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        user: req.user,
        photoUrl: data.Location, // < this is from aws
      });

      // Populate the user information
      // no need call exec because you are populating
      // on a document
      await recipe.populate('user')

      // respond to the client!
      // 201 means resource created!
      // then respond to the client (completing a request, by making response to the client(browser))
      res.status(201).json({ recipe });
    } catch (err) {
      res.status(400).json({ err });
    }
  })
}

async function deleteOne(req, res) {

  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.recipeId)
    const startingIdx = deletedRecipe.photoUrl.indexOf('cookstagram')
    const keyString = deletedRecipe.photoUrl.slice(startingIdx)
    const params = { Bucket: BUCKET_NAME, Key: keyString}
    s3.deleteObject(params, async function (err, data) {
      console.log(err, " err from aws");
      console.log(data)
      if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
    })

    console.log(deletedRecipe)
    res.status(201).json({ msg: 'OK' });
  } catch (err) {
    console.log(err)
    res.status(400).json({ err });
  }
}

async function index(req, res) {
  try {
    // this populates the user when you find the recipes
    // so you'll have access to the users information
    // when you fetch teh recipes
    const recipes = await RecipeModel.find({}).populate("user").exec();
    res.status(200).json({ recipes });
  } catch (err) {
    res.json({ error: err })
  }
}