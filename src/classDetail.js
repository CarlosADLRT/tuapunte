import React, {Component} from 'react';
import Axios from 'axios';
import QueryBuilder from 'sbx-querybuilder/index'

export default class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'prueba',
            apuntes: [],
            classKey: props.match.params.key,
            token: localStorage.getItem('token'),
            loading:true
        };
    }

    componentDidMount() {
        const query = new QueryBuilder()
            .setDomain(197)
            .setModel('apuente')
            .addCondition('AND', 'class', '=', this.state.classKey)
            .fetchModels(['class', 'user'])
            .compile();
        Axios({
            method: 'post',
            url: 'https://archivo.digital/api/data/v1/row/find',
            data: query,
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'App-Key': "d955b7df-2f91-467c-ad07-ebc5abb57646"
            }
        }).then(res => {
            this.setState({loading:false});
            if (res.data.success) {
                if (res.data.results.length > 0) {
                    const Class = res.data.fetched_results.class[this.state.classKey];
                    const users = res.data.fetched_results.user;
                    const apuntes = res.data.results;
                    apuntes.forEach(apunte => {
                        apunte.user = users[apunte.user];
                    });

                    this.setState({class: Class, apuntes, });
                }
            }


        })
    }

    render() {
        if(this.state.loading){
            return <h1>Loading... {this.state.loading}</h1>
        }
        if(this.state.apuntes.length===0){
            return <h1>No hay apuntes</h1>
        }
        return (
            <div>{this.state.apuntes.map(apunte => {
                return <h1>{apunte.user.nombre}</h1>
            })}</div>
        )
    }
}