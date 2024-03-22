import RecipeCard from '../RecipeCard/RecipeCard'
import { Card } from 'semantic-ui-react'

export default function RecipeFeed({recipes, itemsPerRow, isProfile, addLike, deleteRecipe, loggedUser}){

  //
  // removeLike = deleteRecipe
  //

        console.log(recipes[0].title, ' < This is recipes[0].title')
	
		const recipeCards = recipes.map((recipe) => {
			return <RecipeCard recipe={recipe} key={recipe._id} isProfile={isProfile} addLike={addLike} deleteRecipe={deleteRecipe} loggedUser={loggedUser}/> 
		})

		//
  		// removeLike = deleteRecipe
  		//
	
		return (
		   <Card.Group itemsPerRow={itemsPerRow}>
			{recipeCards}
		   </Card.Group>
		)
    
}