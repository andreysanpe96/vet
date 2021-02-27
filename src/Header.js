import {Image,Container } from "react-bootstrap";
function Header() {

  var heroStyle = {
    width:'auto',
    overflow : 'hidden',
    height:'80px'
  };
  
    return (
      <>
      <Container>
        <hr />
        <h1 style = {{color: "#fcc868"}} className="text-center">Vet <Image style={heroStyle} src="https://cdn.icon-icons.com/icons2/2225/PNG/512/dog_treadmill_icon_134472.png/171x180" fluid  />
        </h1>
        <hr />
      </Container>
      </>
    );
  }

  export default Header;