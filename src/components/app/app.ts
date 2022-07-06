import AppController from '../controller/controller';
import { AppView, news, sources } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    sources: HTMLElement;
    body: HTMLElement;
    burgerBut: HTMLElement;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sources = document.querySelector('.sources') as HTMLElement;
        this.body = document.querySelector('body') as HTMLElement;
        this.burgerBut = document.querySelector('.burger') as HTMLElement;
    }

    start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e: Event) => this.controller.getNews(e, (data: news) => {this.view.drawNews(data)}));
        this.controller.getSources((data: sources) => {this.view.drawSources(data)});
    }

    burger(e:Event):void {
        let curTarget = e.currentTarget as HTMLElement;
        if (curTarget.classList.contains('active')) {
            this.burgerClose()
        } else {
            this.burgerOpen()
        }
    }
    burgerClose():void {
        this.burgerBut.classList.remove('active');
        this.sources.classList.remove('active');
        this.body.classList.remove('active');
    }
    burgerOpen():void {
        this.burgerBut.classList.add('active');
        this.sources.classList.add('active');
        this.body.classList.add('active');
    }
}

export default App;
