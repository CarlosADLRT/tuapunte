import React, { Component } from 'react';
import Ligthbox from 'react-images'

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {lightboxIsOpen:false}
    }

    render() {
        const apunte = this.props.report;
        const url = 'https://sbxcloud.com/www/tuapunte/img/';        
        return (
            <div>

                <h1>{apunte.user.nombre}</h1>
                <img width="70px" height="70px" style={{ 'objecFit': 'cover' }} onClick={() => this.setState({ lightboxIsOpen: true })} src={url + apunte.img} alt="Lesions image" />
                <Ligthbox images={[
                    { src: url + apunte.img },
                ]}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={() => this.setState({ lightboxIsOpen: false })} />
            </div>
        );
    }
}

export default Report;