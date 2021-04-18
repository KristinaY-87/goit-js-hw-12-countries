import countryCardTpl from '../templates/country-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import API from './fetchCountries';
import getRefs from './refs';

import "@pnotify/core/dist/PNotify.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";


const refs = getRefs();
const input = document.getElementById("searchInput")
const debounce = require('lodash.debounce');
refs.searchInput.addEventListener('input', debounce(onSearch,500));


function onSearch(event) {
    refs.listCountry.innerHTML = '';
    const searchQuery = event.target.value;
         
    API.fetchCountries(searchQuery)
        .then(renderCountryCards)
        .catch(onFetchError)   
 };

function renderCountryCards(countriesList) {
    if (countriesList.length > 10) {
            error({
            title: "Attention",
            text:
                "Too many matches found. Please enter a more specific query!",
            delay: 2000
        });
    } else if (countriesList.length >= 2 && countriesList.length <= 10) {
       const markupList = countriesListTpl(countriesList);
        refs.listCountry.innerHTML = markupList 
    } else  {
        const markup = countryCardTpl(countriesList);
        refs.listCountry.innerHTML = markup;
    };
 }
function onFetchError(errors) {  
    
        error({
            title: "Attention",
            text:
                "Please enter correct data!",
            delay: 2000
        });
    };

export default { error }