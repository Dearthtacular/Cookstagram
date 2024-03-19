import RecipeCard from '../RecipeCard/RecipeCard'
import { Card } from 'semantic-ui-react'

export default function RecipeFeed({recipes, itemsPerRow, isProfile, loggedUser}){
        console.log(recipes[0], ' < This is recipes[0].caption')
	
		const recipeCards = recipes.map((recipe) => {
			return <RecipeCard recipe={recipe} key={recipe._id} isProfile={isProfile} loggedUser={loggedUser}/> 
		})
	
		return (
		   <Card.Group itemsPerRow={itemsPerRow}>
			{recipeCards}
		   </Card.Group>
		)
    
}