import React, {Component} from 'react'
import Axios from 'axios'
import {Button, Card, CardBlock, CardText, CardTitle, Form, FormGroup, Input, Label} from 'reactstrap';
import QueryBuilder from 'sbx-querybuilder'
import {Redirect} from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {register: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerOnSbx = this.registerOnSbx.bind(this);
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

    registerOnSbx() {
        const urlRegiste = 'https://archivo.digital/api/user/v1/register?';
        const appKey = 'd955b7df-2f91-467c-ad07-ebc5abb57646';
        Axios.get(`${urlRegiste}email=${this.state.email}&password=${this.state.password}&name=${this.state.name}&login=${this.state.username}&domain=197`,
            {
                headers: {
                    "app-key": appKey
                }
            }).then(res => {
            console.log(res);
            const user = res.data.user;
            const query = new QueryBuilder()
                .setDomain(197)
                .setModel('user')
                .addObject({
                    nombre: user.name,
                    id: user.id,
                    username: user.login
                })
                .compile();
            debugger
            Axios({
                method: 'post',
                url: 'https://archivo.digital/api/data/v1/row',
                data: query,
                headers: {
                    'Authorization': 'Bearer ' + res.data.token,
                    'App-Key': "d955b7df-2f91-467c-ad07-ebc5abb57646"
                }
            }).then(res => {
                if(res.data.success)
                {
                    this.setState({register:true})
                }
            })
        });
    }

    render() {
        if (this.state.register) {
            return <Redirect to='/dashboard'/>;
        }
        return (
            <div className="container bg">
                <div className="row bg align-items-center justify-content-center">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div className="col-6">
                                <Card>
                                    <CardBlock>
                                        <CardTitle className="text-center">Registro</CardTitle>
                                        <CardText>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Nombre</Label>
                                                    <Input onChange={this.handleInputChange} type="text" name="name"
                                                           id="name"
                                                           placeholder="Inserte su nombre"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Correo</Label>
                                                    <Input onChange={this.handleInputChange} type="email" name="email"
                                                           id="email"
                                                           placeholder="Inserte su correo"/>
                                                </FormGroup>
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
                                                        this.registerOnSbx()
                                                    }}>Registrarse</Button>
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