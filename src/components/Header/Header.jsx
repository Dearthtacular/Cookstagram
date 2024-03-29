import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ loggedUser, handleLogout }) {
    console.log(handleLogout, '<-THIS IS THE LOGOUT')
    console.log(loggedUser.username)
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${loggedUser.username}`}>
          <Image
            src={
                loggedUser.photoUrl
                ? loggedUser.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
          Profile
        </Link>
        <Link to="/">
        {'\u00a0 \u00a0 Main Feed'}
        </Link>
      </Header>
    </Segment>
  );
}