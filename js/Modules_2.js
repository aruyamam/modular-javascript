var ImagesInc_GlobalData = (function (coreModule) {

  coreModule.someText = 'this is a test for module argumentation';
  coreModule.getExtendedModuleMsg = function () {
    ImagesInc_LoggingHandler.logInfo(coreModule.someText);
  };

  return coreModule;

})(ImagesInc_GlobalData || {});
