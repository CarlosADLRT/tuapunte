import React from 'react'
import {Button, Card, CardBlock, CardText, CardTitle, Form, FormGroup, Input, Label} from 'reactstrap';
import Axios from 'axios';
import { Redirect, Link} from 'react-router-dom';
import Alertify from 'alertify.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state= {logged:false}
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginOnSbx = this.loginOnSbx.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    loginOnSbx() {
        const APPKEY = 'd955b7df-2f91-467c-ad07-ebc5abb57646';

        Axios.get(`https://archivo.digital/api/user/v1/login?login=${this.state.username}&password=${this.state.password}`,
            {
                headers: {
                    "app-key": APPKEY,
                    "accept-encoding": "gzip"
                }
            }).then(res => {
                console.log(res)
            if (res.data.success) {
                this.setState({logged:true});
                Alertify.success("Inicio de sesión");
                localStorage.setItem("token", res.data.token);
                console.log(this.state);
                this.props.history.push('/dashboard');
            }
        })
    }

    render() {
        if(this.state.logged){
            return <Redirect to='/dashboard'/>;
        }
        return (
            <div className="container-flush d-flex bg bg-login flex-column justify-content-center">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <Card>
                                    <CardBlock>
                                        <CardTitle className="text-center">Login</CardTitle>
                                        <CardText>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="examplePassword">Usuario</Label>
                                                    <Input onChange={this.handleInputChange} type="text"
                                                           name="username" id="username"
                                                           placeholder="Inserte su usuario"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input onChange={this.handleInputChange} type="password"
                                                           name="password"
                                                           id="password"
                                                           placeholder="Inserte su password"/>
                                                </FormGroup>
                                                <FormGroup className="text-center">
                                                    <Button onClick={() => {
                                                        this.loginOnSbx()
                                                    }}>Login</Button>
                                                     <Button>
                                                         <Link to={`/register`}>Registrarse</Link>

                                                     </Button>

                                                </FormGroup>
                                            </Form>
                                        </CardText>

                                    </CardBlock>
                                </Card>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}