import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////

//module.hot is a parcel usecase, not js 
// if (module.hot){


//   module.hot.accept();
// }


const controlRecipes = async function(){
  
  // Listening the loads and hashchange events
  try{
    const id = window.location.hash.slice(1);

    
    if(!id) return;
    recipeView.renderSpinner();

   // 1. Loading the recipe

    await model.loadRecipe(id);
    // const { recipe } = model.state;    

    //2. Rendering the recipe 
    recipeView.render(model.state.recipe);
    }catch(err){
      recipeView.renderError();
    }
};

const controlSearchResults = async function(){
  try {
    resultsView.renderSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search  Results
    await model.loadSearchResults(query);

    //3) Render Results
    console.log(model.getSearchResultPage());
    resultsView.render(model.getSearchResultPage());
  } catch (err) {
    console.log(err);
  }
};


//Publisher_Subscriber Design Patter with addHandlerRender in controller.js
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}; 
init();


