ImagesInc_Core.registerComponent('headerContainer', 'header', function (sandBox) {
  return {
    init: function () {
      try {
        sandBox.updateElement('headerContainer', ImagesInc_GlobalData.getHeaderHTMLTxt());
        sandBox.contextObj = this;
        this.registerForEvents();
        sandBox.logMessage(1, 'Header component has been initialied...', 'blue');
      }
      catch (e) {
        sandBox.logMessage(3, 'Header component has NOT been initialized correctly --> ' + e.message);
      }
    },

    destroy: function (removeComponent) {
      this.unregisterFromEvents();
      
      if (removeComponent) {
        sandBox.removeComponentFromDom('headerContainer');
      }
      sandBox.logMessage(1, 'Header component has bee destroyed...', 'blue');
    },

    registerForEvents: function () {
      sandBox.addEventHandlerToElement('siteLogo', 'click', this.handleHomeClick);
      sandBox.addEventHandlerToElement('Favorites', 'click', this.handleFavouritesClick);
      sandBox.addEventHandlerToElement('Home', 'click', this.handleHomeClick);
    },

    handleHomeClick: function (e) {
      sandBox.loadPage('index.html');
      e.preventDefault();
      e.stopPropagation();
      sandBox.addToHitory({
        url: 'index.html'
      });
    },

    unregisterFromEvents: function () {
      sandBox.removeEventHandlerFromElem('siteLogo', 'click', this.handleHomeClick);
      sandBox.removeEventHandlerFromElem('Favorites', 'click', this.handleFavouritesClick);
      sandBox.removeEventHandlerFromElem('Home', 'click', this.handleHomeClick);
    },

    handleFavouritesClick: function (e) {
      e.preventDefault();
      e.stopPropagation();

      var favouritedImagesArray = sandBox.getValueAsArrayFromCookie(ImagesInc_GlobalData.getFavCookieName());

      if (!favouritedImagesArray) {
        alert('No favourites have been selected!');
        return;
      }

      sandBox.publishCustomEvent({
        type: 'favourites-Clicked',
        data: 'favourites'
      });
      sandBox.addToHitory({
        url: 'fvourites' // update url in the browser
      });
    }
  };
});
