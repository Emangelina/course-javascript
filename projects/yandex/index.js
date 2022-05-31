import { loadPartialConfig } from '@babel/core';
import { formTemplate } from './templates';
import './yandex.html';

let reviews = [];
let storage = localStorage;


document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(init);
  
  function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
    });

    setClusterer(myMap, getStorage().length?getStorage():[]);

    myMap.events.add('click', function(event) {
      const coords = event.get('coords');
      openBalloon(myMap, coords);
    })
  }
})

async function openBalloon(map, coords, clusterer, arg) { //не могу до конца понять того, что мы передаем кластер в openBalloon. Что мы этим самым говорим? что балун открыт на кластере, а не в произвольном месте?
  await map.balloon.open(coords, {
    content: `<div class="balloon__reviews">
      ${setLayout(coords, getStorage())}  
    </div>
    ${formTemplate}`
  })

  const form = document.querySelector('#add-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (clusterer) {
      clusterer.removeAll();
    }

    const review = {};
    review.coords = coords;
    review.name = form.elements.name.value;
    review.place = form.elements.place.value;
    review.review = form.elements.review.value;

    reviews = getStorage().length?getStorage():[];
    reviews.push(review);
    
    setStorage(reviews);
    console.log(reviews);
    
    !arg?setClusterer(map, reviews, coords, review):setClusterer(map, reviews, coords);
    map.balloon.close();
  })
}

function setStorage(array) {
  storage.data = JSON.stringify(array);
}

function getStorage() {
  const array = JSON.parse(storage.data || '{}');
  return array;
}

function setClusterer(map, array, coords, object) {
  if (array.length) {
    const clusterer = new ymaps.Clusterer({hasBalloon: false, clusterDisableClickZoom: true});
    if (object) {
      clusterer.add(setClustererPlacemarks(findSameCoords(array, object)), formTemplate);
    } else {
      clusterer.add(setClustererPlacemarks(array, formTemplate));
    }
    map.geoObjects.add(clusterer);

    clusterer.events.add('click', function(event) {
      event.preventDefault();
        // let coords1 = event.get('target').geometry._coordinates;
        // console.log(coords1);
      openBalloon(map, coords, clusterer, true);
    })
  }
}

function findSameCoords(array, object) {
  const result = array.reduce((prev, current) => {
    if (JSON.stringify(current.coords) === JSON.stringify(object.coords)) {
      prev.push(current);
    }
    return prev;
  }, [])
  return result;
}

function setClustererPlacemarks(array) {
  if (array.length) {
    let list = array.map((item) => {
      let placemark = new ymaps.Placemark(item.coords, {})
      return placemark;
    })
    return list;
  }
}

function setLayout(coords, array) {
  let layout = '';
  if (array.length) {
    let result = array.filter(item => JSON.stringify(item.coords) === JSON.stringify(coords));
    for (let item of result) {
      layout += `
      <div class = "balloon__review">
        <div><span class="balloon__review-author">${item.name} </span><span class="balloon__review-place">${item.place}</span></div>
        <div class="balloon__review-text">${item.review}</div>
      </div>`
    }
    return layout;
  }
  return layout;
}
