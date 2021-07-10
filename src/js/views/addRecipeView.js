import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class AppRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe is sucessfully uploaded.';
    
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav_btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();        
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload() {
        this._parentElement.addEventListener('submit', function() {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
            console.log(data);

        });
    }
    
    _generateMarkup(){

    }
}
   
export default new AppRecipeView();
