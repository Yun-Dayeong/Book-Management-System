import axios from 'axios';

export default class APIManager {
    static instance;

    constructor() {
        if (APIManager.instance) { return APIManager.instance }

        this._url = ""
        this._params = {}
        this._data = {}
        this._header = {}

        APIManager.instance = this
    }

    //get 함수
    get url() { return this._url; }
    get params() { return this._params; }
    get data() { return this._data; }
    get header() { return this._header }

    //set 함수
    set url(url) { this._url = url; }
    set params(params) { this._params = params; }
    set data(data) { this._data = data; }
    set header(header) { this._header = header }

    get = (callback) => {
        axios.get(this._url, { params: this._params })
            .then((response) => {
                if (callback) { callback(response.data) }
                this.init()
            })
            .catch(function (error) {
                console.log("axios get error : " + error);
            });
    }

    post = (callback = null) => {
        var config = {
            method: 'post',
            url: this._url,
            data: this._data,
            header: this._header
        }

        axios(config)
            .then(response => {
                if (callback) {
                    console.log(response.data)
                    callback(response.data)
                }
                this.init()
            })
            .catch(function (error) {
                console.log("axios post error : " + error);
            });
    }

    init = () => {
        this._url = ""
        this._params = {}
        this._data = {}
        this._header = {}
    }
}