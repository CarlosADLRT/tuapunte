import React, {Component} from 'react';
import Axios from 'axios';
import QueryBuilder from 'sbx-querybuilder/index'
import Report from './report'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Common from './common'

import 'react-datepicker/dist/react-datepicker.css';

export default class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: '',
            apuntes: [],
            classKey: props.match.params.key,
            token: localStorage.getItem('token'),
            loading: true,
            lightboxIsOpen: false,
            startDate: moment(),
            filter: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {
        this.fetchData();

    }
    fetchData() {
        Common.findClass(this.state.classKey,res=>{
            this.setState({ loading: false });
            if (res.data.results.length > 0) {
                const Class = res.data.fetched_results.class[this.state.classKey];
                const users = res.data.fetched_results.user;
                let apuntes = res.data.results;
                apuntes.forEach(apunte => {
                    apunte.user = users[apunte.user];
                    apunte.date = new Date(apunte.date)
                });
                if (this.state.filter) {
                    console.log(this.state.filter);
                    apuntes = apuntes.filter(apunte => {
                        const date = new Date(apunte.date);
                        date.setHours(0, 0, 0, 0)
                        return date.getTime() == this.state.date.getTime()
                    })
                }

                apuntes = apuntes.sort((a, b) => {
                    return b.date - a.date;
                });

                console.log(apuntes);

                this.setState({ class: Class, apuntes, loading: false });
            }
        },err=>{
            console.log(err)
        })
        // const query = new QueryBuilder()
        //     .setDomain(197)
        //     .setModel('apuente')
        //     .addCondition('AND', 'class', '=', this.state.classKey)
        //     .fetchModels(['class', 'user']);
        // Axios({
        //     method: 'post',
        //     url: 'https://archivo.digital/api/data/v1/row/find',
        //     data: query.compile(),
        //     headers: Common.getHeader()
        // }).then(res => {
        //     this.setState({ loading: false })
        //     if (res.data.success) {
        //         if (res.data.results.length > 0) {
        //             const Class = res.data.fetched_results.class[this.state.classKey];
        //             const users = res.data.fetched_results.user;
        //             let apuntes = res.data.results;
        //             apuntes.forEach(apunte => {
        //                 apunte.user = users[apunte.user];
        //                 apunte.date = new Date(apunte.date)
        //             });
        //             if (this.state.filter) {
        //                 console.log(this.state.filter);
        //                 apuntes = apuntes.filter(apunte => {
        //                     const date = new Date(apunte.date);
        //                     date.setHours(0, 0, 0, 0)
        //                     return date.getTime() == this.state.date.getTime()
        //                 })
        //             }
        //
        //             apuntes = apuntes.sort((a, b) => {
        //                 return b.date - a.date;
        //             });
        //
        //             console.log(apuntes);
        //
        //             this.setState({ class: Class, apuntes, loading: false });
        //         }
        //
        //     }
        //
        //
        // });
    }
    handleChange(date) {
        const data = new Date(date).setHours(0, 0, 0, 0);
        console.log(new Date(data));
        this.setState({
            startDate: date,
            date: new Date(data),
            filter: true
        });
        this.fetchData();
    }

    voteApunte(){
        const query = new QueryBuilder()
            .setDomain(197)
            .setModel('apuente')
            .addCondition('AND', 'class', '=', this.state.classKey)
            .fetchModels(['class', 'user']);
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading... {this.state.loading}</h1>
        }
        let display;
        if (this.state.apuntes.length === 0) {
            display = <h1>No hay apuntes</h1>
        } else {
            display =
                this.state.apuntes.map(apunte => {
                    return (
                        <Report render={this.fetchData} key={apunte._KEY} report={apunte} />
                    )
                })
        }
        return (
            <div className="bg bg-classDetail">

                <div className="container pt-3 ">
                    <h1 className="text-white">{this.state.class.name}</h1>
                    <div className="row mb-5">
                        <div className="col-12">
                            <span className="text-white">Seleccione una fecha</span>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {display}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}