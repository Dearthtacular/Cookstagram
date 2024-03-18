import RecipeCard from '../RecipeCard/RecipeCard'
import { Card } from 'semantic-ui-react'

export default function RecipeFeed({recipes, itemsPerRow, isProfile, addLike, removeLike, loggedUser}){
        console.log(recipes[0].caption, ' < This is recipes[0].caption')
	
		const recipeCards = recipes.map((recipe) => {
			return <RecipeCard recipe={recipe} key={recipe._id} isProfile={isProfile} addLike={addLike} removeLike={removeLike} loggedUser={loggedUser}/> 
		})
	
		return (
		   <Card.Group itemsPerRow={itemsPerRow}>
			{recipeCards}
		   </Card.Group>
		)
    
}