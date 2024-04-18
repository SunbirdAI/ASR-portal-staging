import {Nav, Title} from "./Header.styles";
import img from '../../images/logo.png';

const Header = () => (
    <Nav>
        <img className="h-[40px]" alt="Logo" src={img}/>
        <Title>
            Speech To Text.
        </Title>
    </Nav>
);

export default Header;
