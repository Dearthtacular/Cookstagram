import { Card } from 'semantic-ui-react'
import RecipeCard from '../RecipeCard/RecipeCard'


export default function ProfileRecipeDisplay({isProfile, recipes }){

    const recipeCards = recipes.map((recipe) => {
        return (<RecipeCard key={recipe._id} recipe={recipe} isProfile={isProfile}/>)
    })

    return (
      <Card.Group itemsPerRow={3}>
       {recipeCards}
       </Card.Group>
    )
}
