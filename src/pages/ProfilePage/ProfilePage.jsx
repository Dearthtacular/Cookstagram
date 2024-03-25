import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfileRecipeDisplay from "../../components/ProfileRecipeDisplay/ProfileRecipeDisplay";
import Header from "../../components/Header/Header";

import tokenService from "../../utils/tokenService";
import RecipeFeed from "../../components/RecipeFeed/RecipeFeed";


export default function ProfilePage({ loggedUser, handleLogout }) {
  const [recipes, setRecipes] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // username comes from the params, defined
  // in the app.js routes  <Route path="/:username" ele
  const { username } = useParams();
  // username should be whatever is in the url
  // localhost:8000/jim => username should be jim
  console.log(username);

  useEffect(() => {
    getProfileInfo();
  }, [username]);

  async function getProfileInfo() {
    try {
      
      const response = await fetch(`/api/users/${username}`, {
        method: "GET",
        headers: {
          // convention for sending jwts, tokenService is imported above
          Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage
          //and and it to our api request
          // so the server knows who the request is coming from when the client is trying to make a POST
        },
      });
      //.ok property comes from fetch, and it checks the status code, since profile not found
      // is a 404 the code throws to the fetch block
      if (!response.ok)
        throw new Error("Whatever you put in here goes to the catch block");
      // this is recieving and parsing the json from express
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setRecipes(data.data);
      setProfileUser(data.user);
      setError(""); // set error back to blank after successful fetch
    } catch (err) {
      console.log(err.message);
      setError("Profile Does Not Exist! Check the Terminal!");
      setLoading(false);
    }
  }

    async function deleteRecipe(recipeId){
    console.log(recipeId, "THIS IS THE LOG BEFORE THE TRY IN THE DELETERECIPE FUNCTION")
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        } 
      })

      const data = await response.json()
      console.log(data, ' response from delete recipe')
      getProfileInfo(); // call getPosts to sync you data and update state
      // so the like is removed from the array 
    } catch(err){
      console.log(err)
    }
  }

  if (error) {
    return (
      <>
        <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        <h1>{error}</h1>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        <h1>Loading....</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
         <RecipeFeed itemsPerRow={3} isProfile={true} recipes={recipes} deleteRecipe={deleteRecipe} loggedUser={loggedUser}/> 

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}


