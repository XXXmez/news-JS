import AppLoader from './appLoader';
import { news, sources } from '../view/appView';
import app from '../app/app'

class AppController extends AppLoader {
    getSources(callback: (data: sources) => void):void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: news) => void ):void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        
        const apping = new app;
        apping.burgerClose()

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId:string = target.getAttribute('data-source-id')!;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
