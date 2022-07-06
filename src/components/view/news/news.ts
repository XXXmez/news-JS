import './news.css';

export interface itemElem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source : {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}


export class News {
    draw(data: itemElem[]):void {
        const news: itemElem[] = data.length >= 10 ? data.filter((_item: itemElem, idx:number) => idx < 10) : data;
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        
        

        news.forEach((item:itemElem, idx:number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            newsClone.querySelector<HTMLDivElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description;
            newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')!.appendChild(fragment);
    }
}
