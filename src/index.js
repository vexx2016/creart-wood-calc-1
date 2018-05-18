import React from 'react';
import ReactDOM from 'react-dom';
import App from './Calc';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



let xhr = new XMLHttpRequest();
xhr.open('GET', 'calc.json');
xhr.onload = function () {
    if (xhr.status === 200) {
        console.log(data);
        let data = JSON.parse(xhr.responseText)['calc'];
        // ReactDOM.render(<App data={data} />, document.getElementById('root'));
        ReactDOM.render(<h1>Under reconstruction</h1>, document.getElementById('root'));
        
    }
    else {
        ReactDOM.render(<h1>Что-то пошло не так. Пожалуйста, свяжитесь с нами</h1>, document.getElementById('root'));
    }
};

xhr.send(); 