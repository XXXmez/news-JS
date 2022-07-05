import AppController from '../controller/controller';
import { AppView, news, sources } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e: Event) => this.controller.getNews(e, (data: news) => {this.view.drawNews(data)}));
        this.controller.getSources((data: sources) => {this.view.drawSources(data)});
    }
}

export default App;
