import React, {Component} from 'react';
import ImageUpload from './imageUpload';
import Axios from 'axios';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        console.log(token);
        this.state = {
            token, dropdownOpen: false, classes: []
        };
        this.getClasses = this.getClasses.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentWillMount() {
        this.getClasses()
    }

    getClasses() {
        Axios.post('https://archivo.digital/api/data/v1/row/find', "{\"domain\":197,\"row_model\":\"class\"}",
            {
                "headers": {
                    "content-type": "application/json",
                    "app-key": "d955b7df-2f91-467c-ad07-ebc5abb57646",
                    "authorization": `Bearer ${this.state.token}`,
                    "accept-encoding": "gzip"
                }
            }).then(res => {
            this.setState({classes: res.data.results});
        })
    }

    render() {
        if(!this.state.token){
            return <Redirect to='/'/>;
        }
        return (
            <div className="container-flush d-flex justify-content-center bg bg-dashboard">
                <div className="row bg align-items-center">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12">
                                <span className="text-apuntes">Busca las materias</span>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        Materias
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>Seleccione un materia</DropdownItem>
                                        {this.state.classes.map((item) => {
                                            return <Link key={item._KEY
                                            } to={`/class/${item._KEY}`}>
                                                < DropdownItem
                                                >
                                                    {
                                                        item.name
                                                    }
                                                </DropdownItem></Link>

                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <span className="text-apuntes">Comparte tus apuntes</span>
                        <ImageUpload classes={this.state.classes} ></ImageUpload>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;