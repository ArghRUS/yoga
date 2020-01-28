window.addEventListener('DOMContentLoaded', function () {
    'use strict';


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    const showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = new Date('2020-01-26 GMT+0300');
    // console.log(`${deadline} deadline`);
    const numFormat = (a) => {
        if (a < 10) {
            return `0 ${a}`;
        } else {
            return a;
        }
    };

    const getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            sec = Math.floor((t / 1000) % 60),
            min = Math.floor((t / 60000) % 60),
            hour = Math.floor(t / 3600000);

        return {
            'total': t,
            'hours': hour,
            'minutes': min,
            'seconds': sec
        };
    };
    const setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = numFormat(t.hours);
            minutes.textContent = numFormat(t.minutes);
            seconds.textContent = numFormat(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = numFormat(0);
                minutes.textContent = numFormat(0);
                seconds.textContent = numFormat(0);
            }
        }
    };
    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });



    //Form


    let message = {
        loading: 'Загрузка...',
        success: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так!"
    };

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function formSend(form){
        form.addEventListener('submit', function(event){
            event.preventDefault();
            form.appendChild(statusMessage);

            let formData=new FormData(form);
            
            for (let i=0; i<form.getElementsByTagName('input').length;i++){
                if (!form.getElementsByTagName('input')[i].getAttribute('name')){
                    form.getElementsByTagName('input')[i].setAttribute('name', form.getElementsByTagName('input')[i].getAttribute('type'));
                }
            }
            function post() {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader("content-Type", "application/json; charset=utf-8");
                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };

                    let obj = {};
                   
                    formData.forEach(function (value, key) {
                        console.log(`${key}:${value}`);
                        obj[key] = value;
                        
                    });
                    console.log(obj);
                    let json = JSON.stringify(obj);
                    request.send(json);

                    // function resetInput() {
                    //     for (let i = 0; i < form.getElementsByTagName('input').length; i++) {
                    //         form.getElementsByTagName('input')[i].value = '';
                    //     }
                    // }
                });
            }
            post()
                .then(()=>statusMessage.innerHTML = message.loading)
                .then(()=>statusMessage.innerHTML = message.success)
                .catch(()=>statusMessage.innerHTML = message.failure)
                .finally(resetInput=>{
                    for (let i = 0; i < form.getElementsByTagName('input').length; i++) {
                        form.getElementsByTagName('input')[i].value = '';
                    }
                });
        });
    }
    formSend(document.querySelector('.main-form'));
    formSend(document.querySelector('#form'));
/* 
  
  



    let form2 = document.querySelector('form'),
        input2 = form2.getElementsByTagName('input');
    for(let i=0;i<input2.length;i++){
        input2[i].setAttribute('name',input2[i].getAttribute('type'));
    }
    // console.log(input2);
    form2.addEventListener('submit', function (event) {
        event.preventDefault();
        form2.appendChild(statusMessage);
        let request2 = new XMLHttpRequest();

        request2.open('POST', 'server.php');
        request2.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        let formData2 = new FormData(form2);
        console.log(formData2);
        let object = {};
        formData2.forEach(function (value, key) {
            console.log(key +':'+ value);
            object[key] = value;
        });
        console.log(formData2);
        let json2 = JSON.stringify(object);

        request2.send(json2);

        request2.addEventListener('readystatechange', function () {
            if (request2.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request2.readyState === 4 && request2.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input2.length; i++) {
            input2[i].value = '';
        }
    });*/
}); 
// // Второе задание

// let age = document.getElementById('age');
 
// const showUser=(surname, name)=> {
//           alert(`Пользователь ${surname} ${name}, его возраст ${age.value}`);
// };
 
// showUser.apply(age, ["Пупкин","Вася"]);