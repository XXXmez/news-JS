import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    view: {
        drawSources(data: any):void;
        drawNews(data: { articles: [{}]; status: string; totalResults: number; }):void;
        news: {}; 
        sources: {};
    };
    controller: any;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data: {articles: [{}], status: string, totalResults: number}) => {this.view.drawNews(data);}));
        this.controller.getSources((data: {sources: [{}], status: string}) => {this.view.drawSources(data)});
        
        
    }
}

export default App;
