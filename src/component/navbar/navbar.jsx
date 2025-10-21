import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../../helpers/persistance-storage";
import { logoutUser } from "../../slice/Auth";


const Navbar = () => {

  const { loggedIn, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandle = () => {
    dispatch(logoutUser())
    removeItem('token')
    navigate('/login ')
  }


  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container mt-3">
      <Link
        to={"/"}
        className="d-flex align-items-center link-body-emphasis text-decoration-none"
      >

        <span className="fs-4">Pricing example</span>
      </Link>
      <nav className="d-flex mt-2 mt-md-0 ms-md-auto gap-5" >
        {loggedIn ?
          <div className="d-flex gap-3">
            <div className="d-flex gap-2 align-items-center link-body-emphasis" style={{ cursor: 'pointer' }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              <p className="m-0  text-decoration-none text-uppercase">{user.username}</p>
            </div >
            <button onClick={logoutHandle} className="btn btn-outline-danger">Logout</button>
          </div>
          :
          <>
            <Link
              to={`/login`}
              className="me-3 py-2 link-body-emphasis text-decoration-none"
            >
              Login{" "}
            </Link>
            <Link
              to={`/register`}
              className="me-3 py-2 link-body-emphasis text-decoration-none"
            >
              Register
            </Link>
          </>
        }
      </nav>
    </div>
  );
};

export default Navbar;
