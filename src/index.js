import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_S9N105Vzqx4yoedXvU9Zf0c73V4CbfDmd5oEhJ6kRLS12gCCGl3v98Z3Tj0BaWfU";

import {fetchCatByBreed} from './cat-api';
import {fetchBreeds} from './cat-api';

export const elements = {
    select: document.querySelector('.breed-select'),
    info: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error')
};

elements.error.style.display = 'none';

function fetchSuccess(breeds) {
    setTimeout(() => {
        const option = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
        elements.select.insertAdjacentHTML('beforeend', option);
    }, 500);
};

function fetchError(){
    setTimeout(() => {
        elements.select.style.display = 'block';
        elements.select.value = '';
    }, 500);
};

window.addEventListener('DOMContentLoaded', () => {
    fetchBreeds()
    .then(fetchSuccess)
    .catch(fetchError)
});

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
    const selectBreed = elements.select.value;
    fetchCatByBreed(selectBreed)
    .then(
        cat => {
            elements.info.innerHTML = 
            `<img src="${cat.url}" alt="${cat.breeds[0].name}" width="500" height="500">
            <h2>${cat.breeds[0].name}</h2>
            <p>Description: ${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>`
            console.log(cat);
        })
    .catch(fetchError)
    elements.loader.style.display = 'none';
    // elements.error.style.display = 'none';
};




