var SandBox = function (Core, contextElem, componentSelector) {
  var containerElemContext = contextElem,
      componentID = componentSelector;

  return {
    getElement: function (elementID) {
      if (elementID && typeof elementID === 'string') {
        return Core.getElement(elementID);
      }
      else {
        Core.log(3, 'Incorrect parameters passed in; from SandBox.getElement');
      }
    },

    getElementInContext: function (elementID) {
      if (elementID && typeof elementID === 'string') {
        return Core.getChildOfParentByID(containerElemContext, elementID);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.getElementInContext');
      }
    },

    getChildOfParent: function (parentElem, childID) {
      if (parentElem && childID && typeof childID === 'string') {
        return Core.getChildOfParent(parentElem, childID);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.getChildOfParent');
      }
    },

    updateElement: function (elementID, newStructure) {
      if (elementID && (typeof elementID === 'string' || typeof elementID === 'object') && newStructure && typeof newStructure === 'string') {
        Core.updateElement(elementID, newStructure);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.updateElement');
      }
    },

    removeComponent: function (containerID) {
      if (containerID && typeof containerID === 'string') {
        Core.updateElement(containerID, '');
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.removeComponent');
      }
    },

    removeComponentFromDom: function (containerID) {
      if (containerID && typeof containerID === 'string') {
        Core.removeComponentFromDom(containerID);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.removeComponentFromDom');
      }
    },

    loadPage: function (url) {
      if (url && typeof url === 'string') {
        Core.loadPage(url);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.loadPage');
      }
    },



    addEventHandlerToElement: function (elementID, event, func) {
      if (elementID && typeof elementID === 'string' && event && typeof event === 'string' && func && typeof func === 'function') {
        // we do this so we don't to traverse the whole DOM, thus increase performance
        var childElem = Core.getChildOfParentByID(containerElemContext, elementID);
        Core.addEventHandlerToElement(childElem, event, func);
      }
      else {
        Core.log(3, 'incorrect parameters passed in; from SandBox.addEventHandlerToElement');
      }
    },



    logMessage: function (severity, msg, color) {
      if (severity && typeof severity === 'number' && msg && typeof msg === 'string') {
        Core.log(severity, msg, color);
      }
      else {
        Core.log(3, 'incorrect parameters passed in from SandBox.logMessage');
      }
    },


    addToHistory: function (data) {
      if (data && typeof data === 'object') {
        Core.addToHistory(data);
      }
      else {
        Core.log(3, 'incorrect parameters passed in; from SandBox.addToHitory');
      }
    },


    getValueAsArrayFromCookie: function (cookieName) {
      if (cookieName && typeof cookieName === 'string') {
        return Core.getCookieValueAsArray(cookieName);
      }
      else {
        Core.log(3, 'incorrect parameters passed in; from SandBox.getValueAsArrayFromCookie');
      }
    },
  };
};