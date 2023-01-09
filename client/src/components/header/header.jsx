import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
    const [anchorEl, setAnchorEl] = useState(null);
    const redirect = useNavigate()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let data = localStorage.getItem("userdatatoken")
    return (
        //token honga to remaining content aana chaheya without refresh
        <Navbar className='head'>
            <Container fluid>{!data ?
                <Navbar.Brand href="#">BOMNT</Navbar.Brand> :
                <>
                    <Navbar.Brand href="#">BOMNT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '90px' }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => {
                                redirect("/createbook", { state: { title: "", heading: "Register your Book" } })

                            }} >CREATE BOOK</Nav.Link>

                            <NavDropdown title="GET BOOK" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">TITLE</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    CATEGORY
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    ALL FILTER
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <Form className="search">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />

                        </Form>

                        <Button variant="success" >
                            search
                        </Button>
                    </Navbar.Collapse>
                    <div className="avatar">
                        <Avatar style={{ background: "blue" }} onClick={handleClick} />
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        id="basic-menu"
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                </>
            }
            </Container>
        </Navbar >
    );
}

export default NavScrollExample;