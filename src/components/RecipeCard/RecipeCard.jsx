import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";



export default function RecipeCard({ recipe, isProfile, addLike, deleteRecipe, loggedUser }) {

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
      {isProfile ? null : (
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
        <Card.Description>{recipe.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" onClick={clickHandler}/>
      </Card.Content>
    </Card>
  );
}
