import React, { Component } from 'react';
import Ligthbox from 'react-images';
import Moment from 'react-moment';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = { lightboxIsOpen: false }
    }

    render() {
        const apunte = this.props.report;
        const url = 'https://sbxcloud.com/www/tuapunte/img/';
        return (

                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="card">

                            <h1>{apunte.user.nombre}</h1>
                            <img width={100} style={{ 'objecFit': 'cover' }} onClick={() => this.setState({ lightboxIsOpen: true })} src={url + apunte.img} alt="Lesions image" />
                            <Moment fromNow>{apunte.date}</Moment>
                            <Ligthbox images={[
                                { src: url + apunte.img },
                            ]}
                                isOpen={this.state.lightboxIsOpen}
                                onClose={() => this.setState({ lightboxIsOpen: false })} />
                        </div>
                    </div>
                </div>

        );
    }
}

export default Report;