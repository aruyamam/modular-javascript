var AppTester = (function () {

  // generate footer, header and content area of index.htmll based on object definitions for these sections
  try {
    ImagesInc_PageUpdater.updateElement('headerContainer', ImagesInc_GlobalData.getHeaderHTMLTxt());
    ImagesInc_PageUpdater.updateElement('footerContainer', ImagesInc_GlobalData.getFooterHTMLTxt());
    ImagesInc_PageUpdater.updateElement('mainPageContainer', ImagesInc_GlobalData.getContentAreaHTMLTxt());
  }
  catch (e) {
    ImagesInc_LoggingHandler.logError('PageUpdater module not found');
  }

  // testing message logging mechanism
  try {
    ImagesInc_LoggingHandler.logError('this is a test for logging errors!');
    ImagesInc_LoggingHandler.logInfo();
  }
  catch (e) {
    ImagesInc_LoggingHandler.logError('LoggingHandler module not found');
  }

  // testing access control to our module private properties
  try {
    console.log(ImagesInc_GlobalData.headerContainerDef.sectionHTML);
    console.log(ImagesInc_GlobalData.footerContainerDef.sectionHTML);
  }
  catch (e) {
    ImagesInc_LoggingHandler.logError('could not access the property');
  }

  // *** testing module cloning ***
  // creating a clone object
  CloneModule = TestModule.clone(true);
  // displays 'This property will be cloned'
  console.log(CloneModule.testFunc());
  // displays 'the private value has been changed'

  console.log(CloneModule.getPrivateValue());

  console.log(TestModule.changePrivateVar());
  // displays 'the private value has been changed'
  console.log(CloneModule.getPrivateValue());

  console.log(CloneModule.testFunc());

})();
