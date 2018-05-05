ImagesInc_Core.registerComponent('mainPageContainer', 'content', function (sandBox) {
  var contentImagesArray = ImagesInc_GlobalData.getIndexContentAreaImagesArray(),
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

    updateContentPage: function (pageURL) {
      if (pageURL === '/index.html') {
        sandBox.updateElement('mainPageContainer', sandBox.contextObj.buildIndexContentHTML(contentImagesArray));
      }
      else if (pageURL === 'favourites') {
        sandBox.contextObj.handleFavouritesClick();
      }
      else if (pageURL.indexOf('.jpg') > -1) {
        sandBox.updateElement('mainPageContainer', sandBox.contextObj.buildImagePageHTML(pageURL));
      }
    },

    // set the string for the image to be either "Add to favourites" or "Remove from favourites"
    checkFavouriteCookie: function (id) {
      // if the cookie does not exit, then don't pull for the cookie value
      if (!cookieExisting) {
        return false;
      }

      if (!favouritedImagesArray || favouritedImagesArray.length === 0) {
        favouritedImagesArray = sandBox.getValueAsArrayFromCookie(favCookieName);

        // when the cookie does not exist,
        if (favouritedImagesArray === null) {
          cookieExisting = false;

          return false;
        }
      }

      for (var i = 0; i < favouritedImagesArray.length; i++) {
        if (favouritedImagesArray[i] === id) {
          return true;
        }
      }

      return false; // if all the ids have been checked and none matches, then return false
    },

    buildIndexContentHTML: function (imagesArray) {
      var htmlStr = '';

      for (var i = 0; i < imagesArray.length; i++) {
        htmlStr += `
          <div class="imageDiv">
            <a href="/${imagesAray[i]}"><img src="Images/${imagesAray[i]}" alt="${imagesAray[i]}" data-name="${imagesAray[i]}"></a>
            <div class="imageIndexTextDiv">
              ${
                this.getAnchorHTMLStr(
                  imagesAray[i],
                  this.checkFavouriteCookie(imagesArray[i])
                )
              }
            </div>
          </div>
        `;
      }

      favouritedImagesArray = null; // so next time when we build index page, we heck the favourites array again
      cookieExisting = true;

      return htmlStr;
    },

    buildImagePageHTML: function (imgName) {
      var htmlStr;
      htmlStr = `
        <div className="imagePageMainDiv">
          <img src="Images/${imgName}" alt="${imgName}" data-name="${imgName}" />
        </div>
      `;

      return htmlStr
    },

    getAnchorHTMLStr: function (id, favourited) {
      var htmlStr;

      if (!favourited) {
        htmlStr = `
          <a href="" id="${id}">Add to Favourites</a>
        `;
      }
      else {
        htmlStr = `
          <a href="" id="${id}" data-state="favourited">Remove from Favourites</a>
        `;
      }

      return htmlStr;
    },

    handleImageClick: function (elem) {
      var imgName;
      imgName = elem.getAttribute('data-name');

      sandBox.publishCustomEvent({
        type: 'img-Clicked',
        data: imgName
      });

      sandBox.addToHistory({
        url: imgName
      });
    },

    handleFavLinkClick: function (elem) {
      var anchorState, parentNode, anchorID;

      anchorState = elem.getAttribute('data-state');
      anchorID = elem.getAttribute('id');
      parentNode = sandBox.getParentNode(elem);

      if (anchorState) {
        sandBox.removeValueFromCookie(favCookieName, anchorID);
        sandBox.updateElement(parentNode, sandBox.contextObj.getAnchorHTMLStr(anchorID));
      }
      else {
        sandBox.populateCookie(favCookieName, anchorID);
        sandBox.updateElement(parentNode, sandBox.contextObj.getAnchorHTMLStr(anchorID, true));
      }

      sandBox.publishCustomEvent({
        type: 'FavLink-Clicked',
        data: anchorID
      });
    },

    handleMainContainerClicked: function (e) {
      if (e.target != e.currentTarget) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.tagName.toUpperCase() === 'IMG') {
          sandBox.contextObj.handleImageClick(e.target);
        }
        else if (e.target.tagName.toUpperCase() === 'A') {
          sandBox.contextObj.handleFavLinkClick(e.target);
        }
      }
    }
    
  };
});
