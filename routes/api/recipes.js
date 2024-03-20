const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');
const multer = require('multer');
const upload = multer();

// /*---------- Public Routes ----------*/
// /api/recipes 
// 'photo' in upload.single, comes from the key 
// on the  formData.append('photo', photo) which 
// is the formData being sent from the react app(client) to express
router.post('/', upload.single('photo'), recipesCtrl.create);

// /api/recipes the index functions job is to return all of the recipes
router.get('/', recipesCtrl.index)

router.delete('/:recipeId', recipesCtrl.delete)



/*---------- Protected Routes ----------*/




module.exports = router;