import React from 'react';
import ReactDOM from 'react-dom';
import Calc from './Calc';
import 'bootstrap/dist/css/bootstrap.css';
const rootEl = document.getElementById('root');



let xhr = new XMLHttpRequest();
xhr.open('GET', 'calc.json');
xhr.onload = function () {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)['calc'];
        ReactDOM.render(<Calc data={data} />, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<h1>Что-то пошло не так. Пожалуйста, свяжитесь с нами</h1>, document.getElementById('root'));
    }
};
xhr.send(); 