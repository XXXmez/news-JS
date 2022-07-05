import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    view: {
        drawSources(data: {status: string, sources: [{}]}):void;
        drawNews(data: { articles: [{}]; status: string; totalResults: number; }):void;
        news: {}; 
        sources: {};
    };
    controller: {
        getNews(PointerEvent:Event, {}):void;
        getSources({}):void;
    };
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start():void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(
                e, (data: {articles: [{}], status: string, totalResults: number}) => {
                    this.view.drawNews(data);
                }
                
            ));
        this.controller.getSources((data: {status: string, sources: [{}]}) => {this.view.drawSources(data)});
    }
}

export default App;
