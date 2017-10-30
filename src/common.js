import Axios from 'axios';
import QueryBuilder from 'sbx-querybuilder';

export default class Common {
    static getHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'App-Key': "d955b7df-2f91-467c-ad07-ebc5abb57646"
        }
    }
    static url(url){
        switch (url){
            case 'find':
                return 'https://archivo.digital/api/data/v1/row/find';
            case 'update':
                return 'https://sbxcloud.com/api/data/v1/row/update';
        }
    }

    static findClass(key, onSuccess, onError) {
        const query = new QueryBuilder()
            .setDomain(197)
            .setModel('apuente')
            .addCondition('AND', 'class', '=', key)
            .fetchModels(['class', 'user']);
        Axios({
            method: 'post',
            url: this.url('find'),
            data: query.compile(),
            headers: this.getHeader()
        }).then(result => {
            if (result.data.success) {
                return onSuccess(result)
            }
            onError('error')
        })

    }
    static vote(apunte,onSuccess,onError){
        const query = new QueryBuilder()
            .setDomain(197)
            .setModel('apuente')
            .addObject({
                _KEY:apunte._KEY,
                votes:apunte.votes+1
            });
        Axios({
            method: 'post',
            url: this.url('update'),
            data: query.compile(),
            headers: this.getHeader()
        }).then(result => {
            if (result.data.success) {
                return onSuccess(result)
            }
            onError('error')
        })

        //TODO: Vote with verify
        // const query = new QueryBuilder()
        //     .setDomain(197)
        //     .setModel('vote_user')
        //     .addCondition('AND', 'user.id', '=', localStorage.getItem('id'))
        //     .compile();
        // Axios({
        //     method: 'post',
        //     url: this.url('find'),
        //     data: query,
        //     headers: this.getHeader()
        // }).then(result => {
        //     const bool = result.data.results.length>0 ? true:false;
        //     if (result.data.success) {
        //         if(bool){
        //             return onError('Ya usted voto este post')
        //         }
        //         const query2 = new QueryBuilder()
        //             .setDomain(197)
        //             .setModel('vote_user')
        //             .addCondition('AND', 'user.id', '=', localStorage.getItem('id'))
        //             .compile();
        //     }
        // })
    }


};

