import React, { Component } from 'react';
import Common from './common'
import Report from './report'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { apuntes: [],user: null }
    }

    componentDidMount() {
        Common.getProfile(this.props.match.params.id, data => {
            console.log(data);
            this.setState({ apuntes: data.data, user: data.user });
        }, error => {
            console.log(error);
        })
    }
    render() {
        let x = [];
        if(this.state.apuntes.length>0){
            x = this.state.apuntes.map(apunte=>{
                return <Report key={apunte._KEY} show={false} report={apunte} />
            });
        }
        return (
            <div className="bg-classDetail pt-3 ">
                <div className="container">
                    {this.state.user ? x : (<div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>)}

                </div>

            </div>
        );
    }
}

export default Profile;