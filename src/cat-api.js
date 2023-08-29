import axios from "axios";
import Notiflix from 'notiflix';
import {elements} from './index.js';

axios.defaults.headers.common["x-api-key"] = "live_S9N105Vzqx4yoedXvU9Zf0c73V4CbfDmd5oEhJ6kRLS12gCCGl3v98Z3Tj0BaWfU";

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(res => res.data)
    .catch(rej => Notiflix.Report.failure('Failed'))
    
};

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data[0])
    .catch(rej => Notiflix.Report.failure('Failed'))
};