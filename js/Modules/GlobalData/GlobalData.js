var ImagesInc_GlobalData = (function (module) {
  var favCookieName = 'Images_Inc',
      pageDefinitionsFile = 'PageDefinitions.js',
      pageDefinitionsFilePath = 'js/Modules/PageDefinitions/',
      FavouritesPageObjDefID = 'FavouritesPageDef',
      NoficationWidgetDefID = 'NotificationWidgetDef';

  module.initialize = function () {
    console.log('GlobalData Module has been initialized');
  };

  module.getFavCookieName = function () {
    return favCookieName;
  };

  module.getPageDefinitionsFileName = function () {
    return pageDefinitionsFile;
  };

  module.getPageDefinitionsFilePath = function () {
    return pageDefinitionsFilePath;
  };

  module.getFavouritesPageObjDefID = function () {
    return FavouritesPageObjDefID;
  };

  module.getNoficationWidgetDefID = function () {
    return NoficationWidgetDefID;
  };

  return module;
})(ImagesInc_GlobalData || {}); // using loosee augmentation
