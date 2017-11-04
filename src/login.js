import React from 'react'
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label} from 'reactstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import Alertify from 'alertify.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginOnSbx = this.loginOnSbx.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('token')){

            this.setState({logged:true})
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
            if (res.data.success) {
                this.setState({logged: true});
                Alertify.success("Inicio de sesión");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name",this.state.username);
                localStorage.setItem("id",res.data.user.id);
                this.props.history.push('/dashboard');
            }else{
                Alertify.error('Contraseña invalida')
            }

        })
    }

    render() {
        if (this.state.logged) {
            return <Redirect to='/dashboard'/>;
        }
        return (
            <div className="container-flush d-flex bg bg-login justify-content-center">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12">
                        <Card className="card-apunte">
                            <CardBody>
                                <CardTitle className="text-center">Login</CardTitle>
                                <Form action={this.loginOnSbx}>
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
                                        <Button className="mr-3" color="primary" onClick={() => {
                                            this.loginOnSbx()
                                        }}>Login</Button>
                                        <Button color="primary" onClick={() => {
                                            this.props.history.push('/register')
                                        }}>
                                            Registrarse

                                        </Button>

                                    </FormGroup>
                                </Form>

                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>

        )
    }
}