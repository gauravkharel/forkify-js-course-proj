import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipies found. Please try again later. ';
    _message=''; 

    _generateMarkup(){
        // this loop the preview of search result using map and join properties
        return this._data.map(this._generateMarkup).join('');
    }

    _generateMarkupPreview(result) {
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated">
                    <svg>
                        <use href="${ icons}#icon-user"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>
        `;
    }
} 

export default new ResultsView();
