import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/goals/goalsApiSlice";

export default function NavBar() {
  const isAuthenticated = localStorage.getItem("name");
  const nevigat = useNavigate();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("name");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };
  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     localStorage.removeItem("name");
  //     localStorage.removeItem("token");
  //     nevigat("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              {isAuthenticated ? (
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    {isAuthenticated}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <a
                      className="dropdown-item"
                      href="http://localhost:3000/login"
                      onClick={handleLogout}
                    >
                      logout
                    </a>
                  </MDBDropdownMenu>
                </MDBDropdown>
              ) : (
                <>
                  <MDBBtn
                    outline
                    className="m-1"
                    onClick={() => nevigat("/login")}
                  >
                    login
                  </MDBBtn>
                  <MDBBtn
                    outline
                    color="success"
                    className="m-1"
                    onClick={() => nevigat("/register")}
                  >
                    register
                  </MDBBtn>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
