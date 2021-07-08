import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a delightful recipe and bookmark it. :P';
    _message=''; 

    addHandlerrender(handler){
        window.addEventListener('load', handler);
    }
    
    _generateMarkup(){
        // this loop the preview of search bookmark using map and join properties
        return this._data
            .map(bookmark => previewView.render(bookmark, false))
            .join('');
    }
} 

export default new BookmarksView();
