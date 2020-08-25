'use strict';


function formatQueryParams(params) {
  let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){
    $('#results-list').append(
    `<li><h3>${responseJson.drinks[i].strDrink}</h3>
    <img src="${responseJson.drinks[i].strDrinkThumb}/preview">
    <p>Category: ${responseJson.drinks[i].strIBA}</p>
    <p>Ingredients:
    ${responseJson.drinks[i].strMeasure1} ${responseJson.drinks[i].strIngredient1},  ${responseJson.drinks[i].strMeasure2} ${responseJson.drinks[i].strIngredient2},  ${responseJson.drinks[i].strMeasure3} ${responseJson.drinks[i].strIngredient3},  ${responseJson.drinks[i].strMeasure4} ${responseJson.drinks[i].strIngredient4}</li>
    <li>${responseJson.drinks[i].strInstructions}</p>
    </li>`
    )};
  $('#results').removeClass('hidden');
};

function getDrinkByName(name) {
  let params={
    "s": name,
  }
  getDrink(params);
}

function getDrink(params) {
  let searchURL='https://www.thecocktaildb.com/api/json/v1/1/search.php?';

  /*let params = {
    "s": query,
  };*/

  let queryString = formatQueryParams(params);
  let url = searchURL + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
    getDrinkByName(searchTerm);
  });
}

$(watchForm);