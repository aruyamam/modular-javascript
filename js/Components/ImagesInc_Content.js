ImagesInc_Core.registerComponent('mainPageContainer', 'content', function (sandBox) {
  var contentImagesArray = ImagesInc_GlobalData.getIendexContentAreaImagesArray(),
      favCookieName = ImagesInc_GlobalData.getFavCookieName(),
      favouritedImagesArray = [],
      cookieExisting = true,
      favouritesHTMLStr;

  return {
    init: function () {
      try {
        sandBox.addEventHandlerToParent('click', this.handleMainContainerClicked);
        this.registerForCustomEvents();
        sandBox.contextObj = this;
        sandBox.logMessage(1, 'Content component has been initialized...', 'blue');
      }
      catch (e) {
        sandBox.logMessage(3, 'Content component has NOT been initialized correctly --> ' + e.message);
      }
    },

    destroy: function (removeComponent) {
      sandBox.removeEventHandlerFromParent('click', this.handleMainContainerClicked);
      sandBox.addEventHandlerToParent('click', this.disableContentEvents);
      sandBox.unregisterAllCustomEvents();

      if (removeComponent) {
        sandBox.removeComponent('mainPageContainer');
      }

      sandBox.logMessage(1, 'Content commponent has been destroyed...', 'blue');
    },

    registerForCustomEvents: function () {
      sandBox.registerForCustomEvents({
        'img-Clicked': this.updateContentPage, // handle image click
        'page-Changed': this.updateContentPage, // handles back and forward buttons
        'favourites-Clicked': this.updateContentPage
      });
    },

    disableContentEvents: function (e) {
      e.preventDefault();
      e.stopPropagation();
    },

    handleFavouritesClick: function () {
      var favouritesPageObjDefID,
          favouritesPageObjDef;

      try {
        // this call will fail, because, it was designed to do so fro demo purposee
        favouritesHTMLStr = ImagesInc_GlobalData.getFavouritesHTMLTxt();
      }
      catch (e) {
        // get the value of page object definition from storage
        favouritesPageObjDef = sandBox.getValueForKeyAsObjectFromStorage(
          ImagesInc_GlobalData.getFavouritesPageObjeDefID()
        );

        if (!favouritesPageObjDef) {
          favouritesPageObjDefID = ImagesInc_GlobalData.getFavouritesPageObjeDefID();
          // if Component defition is not in the storage, the page object defintions probably needs to be loaded
          sandBox.loadPageDefinitionsFileAndCallBack(
            function () {
              sandBox.getComponentObjAndCallback(
                favouritesPageObjDefID,
                sandBox.contextObj.buildFavouritesPage
              );
            }
          );
        }
        else {
          sandBox.contextObj.buildFavouritesPage(favouritesPageObjDef);
        }
      }
    },

    buildFavouritesPage: function (favouritesPageObjDef) {
      if (favouritesPageObjDef && typeof favouritesPageObjDef === 'object') {
        favouritedImagesArray = sandBox.getValueAsArrayFromCookie(favCookieName);

        if (favouritesPageObjDef.cssFile && favouritesPageObjDef.cssPath) {
          sandBox.loadCSSfileFromObjDef(
            favouritesPageObjDef.cssFile,
            favouritesPageObjDef.cssPath
          );
        }

        if (favouritedImagesArray && favouritedImagesArray.length > 0) {
          if (favouritesPageObjDef.htmlStr) {
            favouritesHTMLStr = favouritesPageObjDef.htmlStr + sandBox.contextObj.buildIndexContentHTML(favouritedImagesArray);
          }
          else {
            favouritesHTMLStr = sandBox.contextObj.buildIndexContentHTML(favouritedImagesArray);
          }

          sandBox.updateElement('mainPageContainer', favouritesHTMLStr);
          favouritesHTMLStr = '';
        }
        else {
          sandBox.logMessage(3, 'No favourites was found; from handleFavouritesClick ' + e.message);
        }
      }
      else {
        sandBox.logMessage(3, 'Page defintion was not found, cannot render page; from handleFavouritesClick ' + e.message);

        return false;
      }
    },

    
  };
});