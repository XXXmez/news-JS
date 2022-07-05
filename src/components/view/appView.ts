import {News, itemElem} from './news/news';
import {Sources, newsElement} from './sources/sources';

export interface news {
    articles: itemElem[];
    status: string;
    totalResults: number;
}
export interface sources {
    sources: newsElement[];
    status: string;
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }
    
    
    drawNews(data:news):void {
        const values:itemElem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:sources):void {
        const values:newsElement[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
