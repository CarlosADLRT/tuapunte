import React, { Component } from 'react';
import Common from './common'
import Report from './report'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { apuntes: [], user: null }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        Common.getProfile(this.props.match.params.id, data => {
            console.log(data);
            const totalVotes = data.data.reduce((prev, current) => {
                return prev + current.votes;
            }, 0)
            this.setState({ apuntes: data.data, user: data.user, totalVotes });
        }, error => {
            console.log(error);
        })
    }
    render() {
        let x = [];
        if (this.state.apuntes.length === 0) {
            return (
                <div className="fill bg-classDetail pt-3 ">
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="bg-classDetail pt-3 ">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body flex-column">
                                            <h1 className="ml-0">Nombre: {this.state.user.nombre}</h1>
                                            <h3 className="ml-0">Numero de apuntes: {this.state.apuntes.length}</h3>
                                            <h3 className="ml-0">Numero de votos: {this.state.totalVotes}</h3>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                    <h2 className="text-white">Apuntes: </h2>
                    <div className="row justify-content-center">
                        <div className="col-10">

                            {this.state.apuntes.map(apunte => {
                                return <Report render={this.fetchData} key={apunte._KEY} show={false} report={apunte} />
                            })}
                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

export default Profile;