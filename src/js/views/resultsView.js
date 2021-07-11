import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipies found. Please try again later. ';
    _message = ''; 

    _generateMarkup(){
        // this loop the preview of search result using map and join properties
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();
