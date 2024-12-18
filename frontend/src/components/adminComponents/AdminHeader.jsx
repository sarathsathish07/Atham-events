import { Navbar, Nav, Container,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../../slices/adminAuthSlice.js';
import { useAdminLogoutMutation } from '../../slices/adminApiSlice.js';

const AdminHeader = () => {
  const {adminInfo} = useSelector((state)=>state.adminAuth)

  const [logoutApiCall] = useAdminLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async() =>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin/login')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <header>
      <Navbar expand='lg' collapseOnSelect style={{backgroundColor:"#313d52"}}>
        <Container fluid>
        <LinkContainer to='/admin'>
          <Navbar.Brand>      <h3 className="sidebar-title">Admin Panel</h3>
          </Navbar.Brand>
        </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {adminInfo ? (<>
              <NavDropdown title={adminInfo.email} id='username'>
                <NavDropdown.Item onClick={logoutHandler}>
                Logout
                </NavDropdown.Item>
          
              </NavDropdown>

            </>) :
            
             (<>
              <LinkContainer to='admin/login'> 
              <Nav.Link>
                <FaSignInAlt /> Sign In
              </Nav.Link>
            </LinkContainer>
            </>) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;