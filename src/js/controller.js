import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView';
import addRecipieView from './views/addRecipeView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

   // 0. Update results view to mark selected search results
   resultsView.update(model.getSearchResultPage());
   bookmarksView.update(model.state.bookmarks);

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
    resultsView.render(model.getSearchResultPage(1));

    //4) Render intial pagination button
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goTopage) {
  
  //1) Render new Results 

  //render override new page using the clear method
  resultsView.render(model.getSearchResultPage(goTopage));

  //2) Render new pagination button 
  paginationView.render(model.state.search);
  
};

const controlServings = function (newServings) {
  //Update the recipe servings (In state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  // 1. add/remove the bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update.model.state.recipe;

  // 3. Render bookmarks 
  bookmarksView.render(model.state.bookmarks);  
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
 
const controlAddRecipe = async function (newRecipe) {
  try{
    //show loading spinner
    addRecipieView.renderSpinner();

    //upload the new recipie data
    await model.uploadRecipe(newRecipe);
    
    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipieView.renderMessage();

    // render bookmark view
    bookmarksView.render(model-state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${modal.state.recipe.id}`);
    

    //close form window
    setTimeout(function () {
      addRecipieView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error('okay', err);
    addRecipieView.renderError(err.message);
  }
};


//Publisher_Subscriber Design Patter with addHandlerRender in controller.js
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

}; 
init();


