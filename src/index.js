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
elements.select.style.display = 'none';

function fetchSuccess(breeds) {
    elements.loader.style.display = 'none';
    setTimeout(() => {
        elements.select.style.display = 'block';
        const option = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join("");
        elements.select.insertAdjacentHTML('beforeend', option);
    }, 500);
};

function fetchError(){
    elements.error.style.display = 'block';
    elements.select.style.display = 'none';
    elements.loader.style.display = 'none';
    setTimeout(() => {
        elements.select.style.display = 'block';
        elements.select.value = '';
        elements.info.style.display = 'none';
    }, 500);
};

window.addEventListener('DOMContentLoaded', () => {
    fetchBreeds()
    .then(fetchSuccess)
    .catch(fetchError)
    .finally(() => {
        elements.loader.style.display = 'none';
    })
});

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
    const selectBreed = elements.select.value;
    elements.loader.style.display = 'block';
    fetchCatByBreed(selectBreed)
    .then(
        cat => {
            elements.info.innerHTML = 
            `<img src="${cat.url}" alt="${cat.breeds[0].name}" width="500" height="500">
            <h2>${cat.breeds[0].name}</h2>
            <p>Description: ${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>`
            console.log(cat);
            elements.error.style.display = 'none';
        })
    .catch(fetchError)
    .finally(() => {
        elements.loader.style.display = 'none';
        elements.select.style.display = 'block';
        elements.info.style.display = 'block';
    })
};