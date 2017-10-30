import React, {Component} from 'react';
import Ligthbox from 'react-images';
import Moment from 'react-moment';
import {Button, ButtonGroup} from 'reactstrap'
import 'moment/locale/es';
import Common from './common'


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {lightboxIsOpen: false}
        this.vote = this.vote.bind(this)
    }

    vote() {
        Common.vote(this.props.report,result=>{
            this.props.render();
            console.log(result);
        },err=>{
            console.error(err);
        });
    }

    render() {
        const apunte = this.props.report;
        const url = 'https://sbxcloud.com/www/tuapunte/img/';
        return (


            <div className="card mb-3">
                <div className="card-body">
                    <div className="media">
                        <img className="mr-3" width={100} style={{'objecFit': 'cover'}}
                             onClick={() => this.setState({lightboxIsOpen: true})} src={url + apunte.img}
                             alt="Lesions image"/>
                        <div className="media-body flex-column">
                            <h3 className="ml-0">{apunte.user.nombre}</h3>

                            <Moment locale="es" fromNow>{apunte.date}</Moment><br/>
                            <Ligthbox images={[
                                {src: url + apunte.img},
                            ]}
                                      isOpen={this.state.lightboxIsOpen}
                                      onClose={() => this.setState({lightboxIsOpen: false})}/>
                            <span> Votos: {apunte.votes}</span>

                            <div className="rounded text-right">
                                <Button onClick={this.vote} color="info">Votar</Button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}

export default Report;