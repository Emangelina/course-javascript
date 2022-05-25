/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
  renderCookies(getCookies());
});

addButton.addEventListener('click', () => {
  const name = addNameInput.value;
  const value = addValueInput.value;

  if (name && value) {
    document.cookie = `${name}=${value}`;
    renderCookies(getCookies());
  }
});

listTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const tRow = e.target.closest('tr');
    e.target.closest('tbody').removeChild(tRow);

    document.cookie = `${tRow.firstElementChild.textContent}=${''}; max-age=-1`;
  }
});

function getCookies() {
  if (document.cookie !== '') {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {});
    return cookies;
  }
}

function renderCookies(cookies) {
  listTable.innerHTML = '';
  for (const cookie in cookies) {
    if (cookie !== '') {
      if (filterNameInput !== '') {
        if (
          cookie.includes(filterNameInput.value) ||
          cookies[cookie].includes(filterNameInput.value)
        ) {
          listTable.innerHTML += ` <tr>
          <td>${cookie}</td>
          <td>${cookies[cookie]}</td>
          <td><button class="deleteBtn">Удалить cookie</button></td>
        </tr>`;
        }
      } else {
        listTable.innerHTML += `<tr>
          <td>${cookie}</td>
          <td>${cookies[cookie]}</td>
          <td><button class="deleteBtn">Удалить cookie</button></td>
        </tr>`;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCookies(getCookies());
});
