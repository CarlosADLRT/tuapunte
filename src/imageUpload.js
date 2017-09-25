import React, {Component} from 'react';
import Axios from 'axios';
import QueryBuilder from 'sbx-querybuilder/index'

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: '', token: localStorage.getItem('token')};
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        //this.uploadImage(this.state.file, '055efde5-8880-41ac-9708-72e17b37c46c')

    }

    uploadImage(file, key) {
        const input = new FormData();
        input.append('file', file);
        input.append('model', JSON.stringify({key: key}));
        const option = {
            headers: {
                'app-key': 'd955b7df-2f91-467c-ad07-ebc5abb57646',
                'authorization': `Bearer ${this.state.token}`
            }
        };
        const query = new QueryBuilder()
            .setDomain(197)
            .setModel('class')
            .compile();


        Axios.post('https://sbxcloud.com/api/content/v1/upload', input, option).then(res => console.log(res));
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