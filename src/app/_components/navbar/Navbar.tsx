import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="flex justify-between py-4">
          <Logo />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
