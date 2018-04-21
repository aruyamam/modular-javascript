(function (originalModule) {

  if (!originalModule) {
    ImagesInc_LoggingHandler.logError('coreModule was not found to be augmented!');
    return false;
  }

  // object definition for the index.html content area
  originalModule.mainContentContainerDef = {
    sectionHTML: (function () {
      var htmlStr = '';

      for (var i = 0; i <= 15; i++) {
        htmlStr += '<div class="productDiv"></div>';
      }
      return htmlStr;
    })()
  };

  originalModule.getContentAreaHTMLTxt = function () {
    return originalModule.mainContentContainerDef.sectionHTML;
  };

})(ImagesInc_GlobalData);
