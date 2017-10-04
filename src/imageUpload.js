import React, {Component} from 'react';
import Axios from 'axios';
import Alertify from 'alertify.js';
import * as QueryBuilder from 'sbx-querybuilder';


export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            token: localStorage.getItem('token'),
            class: '',
            classes: props.classes
        };
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.class);
        this.uploadImage(this.state.file, '055efde5-8880-41ac-9708-72e17b37c46c')
    }

    uploadImage(file, key) {
        const input = new FormData();
        input.append('file', file);
        input.append('model', JSON.stringify({key: key}));
        let option = {
            headers: {
                'app-key': 'd955b7df-2f91-467c-ad07-ebc5abb57646',
                'authorization': `Bearer ${this.state.token}`
            }
        };
        Axios.post('https://sbxcloud.com/api/content/v1/upload', input, option).then(res => {
            console.log(res);
            const userKey = ''
            const query = new QueryBuilder()
                .setDomain(197)
                .setModel('apuente')
                .addObject({
                    class: this.state.class,
                    date: new Date(),
                    user: '7afec978-cc41-49b2-91ef-c44d06974a1e',
                    img:this.state.file.name
                }).compile();
            let option = {
                headers: {
                    'authorization': `Bearer ${this.state.token}`,
                    "content-type" :"application/json"

                }
            };
            Axios.post('https://sbxcloud.com/api/data/v1/row',query,option).then(res=>{
                if(res.data.success){
                    Alertify.success('Apunte enviado')
                }
            })
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        const blob = file.slice(0, -1, 'image/png');
        file = new File([blob], this.state.token + '.png', {type: 'image/png'});
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <select value={this.state.class} id="class" name="class" onChange={this.handleInputChange}>
                        <option value="">Selecione una materia</option>
                        {this.props.classes.map(clas => {
                            return (
                                <option value={clas._KEY}>{clas.name}</option>
                            )
                        })}
                    </select>
                    <input className=""
                           type="file"
                           onChange={(e) => this._handleImageChange(e)}/>
                    <button className=""
                            type="submit"
                            onClick={(e) => this._handleSubmit(e)}>Upload Image
                    </button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}