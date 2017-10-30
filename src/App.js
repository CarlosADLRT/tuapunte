import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            isOpen: false,
            url:this.props.location
        };
    }
    logout(){
        localStorage.clear();
        // this.props.history.push('/');
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });

    }
    render() {
        return (
              <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Tu apunte</NavbarBrand>
                <NavbarToggler onClick={()=>{this.toggle()}} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink disabled>{localStorage.getItem('name')}</NavLink>
                    </NavItem>
                      <NavItem>
                          <NavLink onClick={this.logout}><Link to="/">Logout</Link></NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
        );
    }
}
