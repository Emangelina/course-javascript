/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */

// function forEach(array, fn) {
//   for(let item of array) {
//     fn(item);
//   }
// }
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */

// function map(array, fn) {
//   let resultArray = [];
//   for(let item of array) {
//     resultArray.push(fn(item));
//   }
//   return resultArray;
// }
function map(array, fn) {
  const resultArray = [];
  for (let i = 0; i < array.length; i++) {
    resultArray.push(fn(array[i], i, array));
  }
  return resultArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
// function reduce(array, fn, initial=0) {
//   let acc = initial;
//   for (let item of array) {
//     acc = fn(acc, item);
//   }
//   return acc;
// }

// function reduce(array, fn, initial=0) {
//   let acc = initial;
//   for (let i=0; i<array.length; i++) {
//     acc = fn(acc, array[i], i, array);
//   }
//   return acc;
// }

function reduce(array, fn, initial) {
  const hasInitial = typeof initial !== 'undefined'; //если не задали значение по умолчанию, то нужно проверить, передали initial или нет. Данное выражение вернет true, если initial было передано
  let acc = hasInitial ? initial : array[0]; //проверяем, если hasInitial true(initial был передан), то значение переменной-аккумулятора будет равно initial. Если false(initial не передан), то первый элемент массива(с индексом 0)

  for (let i = hasInitial ? 0 : 1; i < array.length; i++) {
    //нужно назначить i в зависимости от значения переменной-аккумулятора.
    acc = fn(acc, array[i], i, array);
  }
  return acc;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const resultArray = [];
  for (const item in obj) {
    resultArray.push(item.toUpperCase());
  }
  return resultArray;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  const handler = {
    set: (obj, name, value) => {
      obj[name] = value ** 2;
      return true; //вот тут нужно обязательно возвращать true
    },
  };
  const proxy = new Proxy(obj, handler);
  return proxy;
}

export { forEach, map, reduce, upperProps, createProxy };
