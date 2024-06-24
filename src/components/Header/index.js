import {Nav, Title, Logo, DropdownMenu} from "./Header.styles";
import img from '../../images/logo.png';

const Header = () => (
    <Nav >
        <Logo alt="Logo" src={img}/>
        <Title>
            Speech To Text.
        </Title>
        {/* <DropdownMenu/> */}
    </Nav>
);

export default Header;
