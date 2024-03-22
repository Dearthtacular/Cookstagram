import { useState } from 'react'
import { Card, Icon, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import '../RecipeCard/RecipeCard.css';


export default function RecipeCard({ recipe, isProfile, addLike, deleteRecipe, loggedUser }) {

  const [fullRecipe, setFullRecipe] = useState(false)

  const toggleRecipe = (e) => {
    e.preventDefault()
    setFullRecipe(!fullRecipe)
  }

  //
  // removeLike = deleteRecipe
  //

  // const likedIndex = recipe.likes.findIndex(like => like.username === loggedUser.username);
  // const likeColor = likedIndex > -1 ? 'red' : 'grey';
  // const clickHandler = likedIndex > -1 ? () => removeLike(recipe.likes[likedIndex]._id) : () => addLike(recipe._id)

  console.log(recipe._id, 'THIS IS BEFORE THE ERROR IN RECIPECARD')
  const clickHandler = () => deleteRecipe(recipe._id)

  return (
    <Card>
      {!isProfile && (
        <Card.Content textAlign="left">
          <Link to={`/${recipe.user.username}`}>
            <Image
              floated="left"
              size="large"
              avatar
              src={
                recipe.user.photoUrl
                  ? recipe.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
            <Card.Header floated="right">{recipe.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}

      <Image src={`${recipe.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{recipe.title}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <a href="#" onClick={toggleRecipe}>
            {fullRecipe ? 'Hide Recipe' : 'Show Recipe'}
          </a>
        </Card.Description>
        {fullRecipe && (
          <>
            <Card.Description>
              <strong>Ingredients:</strong>
              <pre className={"pre-style"}>{recipe.ingredients}</pre>
            </Card.Description>
            <Card.Description>
              <strong>Instructions:</strong>
              <pre className={"pre-style"}>{recipe.instructions}</pre>
            </Card.Description>
          </>
        )}
      </Card.Content>

      {isProfile && (
        <Card.Content extra textAlign={"left"} >
          <Icon name={"trash alternate"} size="large" color="red" onClick={clickHandler} />
        </Card.Content>
      )}
    </Card>

  );
}
