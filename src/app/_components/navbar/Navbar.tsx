import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div>
      <div className="border-b">
        <Container>
          <div className="flex justify-between py-4">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
      <div className="border-b">
        <Container>
          <div className="flex justify-between py-4">
            <Search />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
