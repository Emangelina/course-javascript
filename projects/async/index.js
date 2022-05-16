/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadAndSortTowns() {
  //пришлось ее добавить, без объявления тест ругался
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
    );

    xhr.addEventListener('load', () => {
      if (xhr.status < 400) {
        const array = JSON.parse(xhr.responseText);
        const resultArray = array.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        resolve(resultArray);
      }
    });
    xhr.send();
  });
}

function loadTowns() {
  return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

retryButton.addEventListener('click', () => {
  tryToLoad();
});

loadingFailedBlock.style.display = 'none';
filterBlock.style.display = 'none';

async function tryToLoad() {
  try {
    await loadTowns();
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
  } catch (error) {
    loadingBlock.style.display = 'none';
    loadingFailedBlock.style.display = 'block';
  }
}

// function tryToLoad() { //Правильно я переписала код выше с помощью .then() и catch()? тест вроде не ругается
//   loadTowns()
//     .then(() => {
//        loadingBlock.style.display = "none";
//        filterBlock.style.display = "block";})
//     .catch(() => {
//        loadingBlock.style.display = "none";
//        loadingFailedBlock.style.display = "block";})
// }

filterInput.addEventListener('input', function () {
  const value = filterInput.value;

  if (filterInput.value === '') {
    filterResult.innerHTML = '';
  } else {
    filterResult.innerHTML = '';

    loadTowns().then((towns) => {
      for (const town of towns) {
        if (isMatching(town.name, value)) {
          const div = document.createElement('div');
          div.textContent = town.name;
          filterResult.appendChild(div);
        }
      }
    });
  }
});

tryToLoad();

export { loadTowns, isMatching };
