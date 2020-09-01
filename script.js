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
  let totalHtml=`<p>${responseJson.drinks.length} total recipes</p>`;
  $("#search-total").append(totalHtml);
}


//diplay results of the search//
function displayResults(responseJson) {
	let ingredientList = '';
	let separator = '';
	let space = ' ';
	
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){
	if(responseJson.drinks[i].strMeasure1 !=null){
		ingredientList += responseJson.drinks[i].strMeasure1;
	}
	if($(responseJson.drinks[i].strIngredient1) !=null){
		ingredientList += space + responseJson.drinks[i].strIngredient1;
		separator = ', '
	}
	if(responseJson.drinks[i].strMeasure2 !=null){
		ingredientList += separator + responseJson.drinks[i].strMeasure2;
		if(responseJson.drinks[i].strIngredient2 !=null){
		ingredientList += space + responseJson.drinks[i].strIngredient2;
		separator = ', '
	    }
	} else {
	  if(responseJson.drinks[i].strIngredient2 !=null){
		ingredientList += separator + responseJson.drinks[i].strIngredient2;
		separator = ', '
	   }
	}
	if(responseJson.drinks[i].strMeasure3 !=null){
		ingredientList += separator + responseJson.drinks[i].strMeasure3;
		if(responseJson.drinks[i].strIngredient3 !=null){
		ingredientList += space + responseJson.drinks[i].strIngredient3;
		separator = ', '
	    }
	} else {
	  if(responseJson.drinks[i].strIngredient3 !=null){
		ingredientList += separator + responseJson.drinks[i].strIngredient3;
		separator = ', '
	   }
	}
	if(responseJson.drinks[i].strMeasure4 !=null){
		ingredientList += separator + responseJson.drinks[i].strMeasure4;
		if(responseJson.drinks[i].strIngredient4 !=null){
		ingredientList += space + responseJson.drinks[i].strIngredient4;
		separator = ', '
	    }
	} else {
	  if(responseJson.drinks[i].strIngredient4 !=null){
		ingredientList += separator + responseJson.drinks[i].strIngredient4;
		separator = ', '
	   }
	}
    $('#results-list').append(
    `<li><h3>${responseJson.drinks[i].strDrink}</h3>
    <img src="${responseJson.drinks[i].strDrinkThumb}/preview">
    <p>Ingredients:
    ${ingredientList}</li>
    <li>${responseJson.drinks[i].strInstructions}</p>
    </li>`
    )};
  $('#results').removeClass('hidden');
  searchTotal(responseJson);
};

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
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
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
