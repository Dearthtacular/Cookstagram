import { useState, useEffect } from 'react'

import RecipeFeed from '../../components/RecipeFeed/RecipeFeed';
import Header from "../../components/Header/Header";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";

import { Grid } from "semantic-ui-react";

import tokenService from '../../utils/tokenService';


export default function FeedPage({loggedUser, handleLogout}) {

  const [recipes, setRecipes] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)

  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddRecipe(recipeToSendToServer){
	console.log(recipeToSendToServer, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/recipes', {
			method: 'POST',
			body: recipeToSendToServer, // < No jsonify because we are sending a photo
			headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		setRecipes([data.recipe, ...recipes])
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }

  // C(R)UD
  async function getRecipes() {
    try {

		// This is going to express to get the posts
		// so this is the start of loading

      const response = await fetch("/api/recipes", {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
      // CHECK THE DATA then update state!
	  setLoading(false)
      console.log(data);
      setRecipes(data.recipes);
    } catch (err) {
      console.log(err);
    }
  }
    
  useEffect(() => {
    // This useEffect is called when the page loads

    // Don't forget to call the function
    getRecipes();
  }, []);
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
        <Header loggedUser={loggedUser} handleLogout={handleLogout}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddRecipeForm  handleAddRecipe={handleAddRecipe}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
         {loading ? <h1>Loading.....</h1> : <RecipeFeed  recipes={recipes} itemsPerRow={1} isProfile={false} loggedUser={loggedUser}/> } 
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
