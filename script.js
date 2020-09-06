'use strict';

//random button function to return a random recipe//
$('#search').click(function getRandomDrink() {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
})

//search by name function to format paramaters//
function formatQueryParams(params) {
  let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//display search total//
function searchTotal(responseJson){
  $("#search-total").empty();
  let totalHtml=`<p>${responseJson.drinks.length} total recipe(s)</p>`;
  $("#search-total").append(totalHtml);
}


//diplay results of the search//
function displayResults(responseJson) {
	let ingredientList = '';
	let separator = '';
	let space = ' ';
	
  $('#results-list').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){
    for (let f = 0; f < 16; f++){
      console.log("strMeasure"+(f+1));
      if (responseJson.drinks[i]["strMeasure"+(f+1)]!=null){
        ingredientList+=responseJson.drinks[i]["strMeasure"+(f+1)];
      }
      if (responseJson.drinks[i]["strIngredient"+(f+1)]!=null){
        ingredientList+=responseJson.drinks[i]["strIngredient"+(f+1)];
      }
    }
  $('#results-list').append(addResult(responseJson.drinks[i], ingredientList));
  }
  $('#results').removeClass('hidden');
  searchTotal(responseJson);
};

function addResult(drink, ingredientList) {
  return `<li><h3>${drink.strDrink}</h3>
    <img src="${drink.strDrinkThumb}/preview" alt=${drink.strDrink}>
    <p>Ingredients:
    ${ingredientList}</li>
    <li>${drink.strInstructions}</p>
    </li>`;
}

//paramaters for the api//
function getDrinkByName(name) {
  let params={
    "s": name,
  }
  getDrink(params);
}

//fetch the api function//
function getDrink(params) {
  let searchURL='https://www.thecocktaildb.com/api/json/v1/1/search.php?';
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
      console.log("error:", err);
      alert(`Something went wrong! Try again with a different cocktail name.`);
    });
}

//validate search terms//
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
    getDrinkByName(searchTerm);
  });
}

$(watchForm);
