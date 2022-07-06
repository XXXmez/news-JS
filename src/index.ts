import App from './components/app/app';
import './global.css';
import './rsschool.svg';
import './news_placeholder.jpg';

const app = new App();
app.start();

const burger = document.querySelector('.burger') as HTMLElement;
burger.addEventListener('click', (e:Event) => {
    app.burger(e);
});