import {Nav, Title, Logo} from "./Header.styles";
import img from '../../images/logo.png';

const Header = () => (
    <Nav>
        <Logo alt="Logo" src={img}/>
        <Title>
            Speech To Text.
        </Title>
    </Nav>
);

export default Header;
