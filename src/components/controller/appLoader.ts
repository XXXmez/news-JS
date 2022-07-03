import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '25a1390ccf1b47988802228ee55c00c8', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
