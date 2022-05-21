/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

// const homeworkContainer = document.querySelector('#app');
// let currentDrag;
// let startX = 0;
// let startY = 0;

// document.addEventListener('mousedown', (e) =>{
//   if(e.target.classList.contains('draggable-div')) {
//     currentDrag = e.target;
//     startX = e.offsetX;
//     startY = e.offsetY;
//   }
// })

// document.addEventListener('mousemove', (e) => {
//   if (currentDrag) {
//     currentDrag.style.left = (e.clientX - startX) + 'px';
//     currentDrag.style.top = (e.clientY - startY) +'px';
//   }
// });

// document.addEventListener('mouseup', (e) =>{
//   currentDrag = false;
// })

// function randomNumber(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max-min+1)) + min;
// }

// export function createDiv() {
//   const div = document.createElement('div');
//   div.classList.add('draggable-div');
//   div.style.display = 'block';

//   div.style.background = "#" + randomNumber(0, 16777215).toString(16);

//   let divWidth = randomNumber(1, window.innerWidth);
//   let divHeight = randomNumber(1, window.innerHeight);

//   div.style.width = divWidth + 'px';
//   div.style.height = divHeight + 'px';

//   div.style.top = randomNumber(0, (window.innerHeight - divHeight)) + 'px';
//   div.style.left = randomNumber(0, (window.innerWidth - divWidth)) + 'px';

//   return div;
// }

// const addDivButton = homeworkContainer.querySelector('#addDiv');

// addDivButton.addEventListener('click', function () {
//   const div = createDiv();
//   homeworkContainer.appendChild(div);
// });

const homeworkContainer = document.querySelector('#app'); //мое первоначальное решение. перемещает элемент, но только прыжком из начальной точку в конечную

let currentDrag;

document.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('draggable-div')) {
    currentDrag = {
      node: e.target,
      coorY: e.clientY,
      coorX: e.clientX,
    };
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  if (currentDrag) {
    e.preventDefault();
  }
  currentDrag.node.style.left =
    parseInt(currentDrag.node.style.left) + (e.clientX - currentDrag.coorX) + 'px';
  currentDrag.node.style.top =
    parseInt(currentDrag.node.style.top) + (e.clientY - currentDrag.coorY) + 'px';
});

export function createDiv() {
  const div = document.createElement('div');
  div.classList.add('draggable-div');
  div.style.display = 'block';

  div.style.background = `rgb(${randomNumber(0, 255)}, ${randomNumber(
    0,
    255
  )}, ${randomNumber(0, 255)})`;

  const divWidth = randomNumber(1, window.innerWidth);
  const divHeight = randomNumber(1, window.innerHeight);

  div.style.width = divWidth + 'px';
  div.style.height = divHeight + 'px';

  div.style.top = randomNumber(0, window.innerHeight - divHeight) + 'px';
  div.style.left = randomNumber(0, window.innerWidth - divWidth) + 'px';

  div.draggable = true;

  return div;
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
