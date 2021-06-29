import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function(){
  
  // Listening the loads and hashchange events
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
  
    recipeView.renderSpinner();

   // 1. Loading the recipe

    await model.loadRecipe(id);
    const { recipe } = model.state;     

    //2. Rendering the recipe 
    recipeView.render(model.state.recipe);
    }catch(err){
      recipeView.renderError();
    }
};

const controlSearchResults = async function(){
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search  Results
    await model.loadSearchResults(query);

    //3) Render Results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};


//Publisher_Subscriber Design Patter with addHandlerRender in controller.js
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
}
init();


