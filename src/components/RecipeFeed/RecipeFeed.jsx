import RecipeCard from '../RecipeCard/RecipeCard'
import { Card } from 'semantic-ui-react'

export default function RecipeFeed({posts, itemsPerRow, isProfile, addLike, removeLike, loggedUser}){
        console.log(posts[0].caption, ' < This is posts[0].caption')
	
		const recipeCards = posts.map((post) => {
			return <RecipeCard post={post} key={post._id} isProfile={isProfile} addLike={addLike} removeLike={removeLike} loggedUser={loggedUser}/> 
		})
	
		return (
		   <Card.Group itemsPerRow={itemsPerRow}>
			{recipeCards}
		   </Card.Group>
		)
    
}