// using simple sub-module augmentation
ImagesInc_Core.Utilitizes = (function () {
  var self = {},
      dynamicallyLoadedFiles = [];

  self.clone = function clone(deep) {
    // create an instance of the object
    var newClonedObj = new this.constrcutor();

    // copy all properties from the original object
    for (var property in this) {
      // if deep flag is not set, just do a shallow copy of propeties
      if (!deep) {
        if (this.hasOwnProperty(property)) {
          newClonedObj[property] = this[property];
        }
        // to make a deep copy, call the function recursively
      }
      else if (typeof this[property] == 'object' && this.hasOwnProperty(property)) {
        newClonedObj[property] = this[property].clone(deep);
      }
      else if (this.hasOwnProperty(property)) {
        // just copy properties for non objects
        newClonedObj[property] = this[property];
      }
    }
    return newClonedObj;
  };

  self.getFileNameFromPath = function (filePath) {
    var slashIndex, theLastIndex, fileName;
    slashIndex = filePath.indexOf('/');

    if (slashIndex > -1) {
      theLastIndex = filePath.lastIndexOf('/');
      fileName = filePath.slice(theLastIndex + 1);

      return fileName;
    }
    else {
      // if there is no path in the filePath, then return the filePath, since it only holds the file name
      return filePath;
    }
  };

  self.Load_JS_CSS = function (filename, filetype, filePath) {
    var fileElem;

    if (filetype === 'js') {
      fileElem = document.createElement('script');
      fileElem.setAttribute('type', 'text/javascript');
      fileElem.setAttribute('src', (filePath + filename));
    }
    else if (filetype === 'css') {
      fileElem = document.createElement('link');
      fileElem.setAttribute('rel', 'stylesheet');
      fileElem.setAttribute('type', 'text/css');
      fileElem.setAttribute('href', (filePath + filename));
    }

    // attach the file to the page
    if (typeof fileElem !== 'undefined') {
      document.getElementsByTagName('head')[0].appendChild(fileElem);
    }
  };

  self.getFileInHead = function (filename, filetype) {
    var theElem, theAttr, possibeFiles;

    // determine element type to create nodelist from
    theElem = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none';
    // determine corresponding attribute to test for
    theAttr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none';

    possibeFiles = document.getElementsByTagName(theElem);

    // search backwards within nodelist for matching elements to remove
    for (var i = possibeFiles.length; i >= 0; i--) {
      if (possibeFiles[i] && possibeFiles[i].getAttribute(theAttr) != null && possibeFiles[i].getAttribute(theAttr).indexOf(filename) != -1) {
        return possibeFiles[i];
      }
    }
  };

  self.Remove_JS_CSS = function (filename, filetype) {
    var foundFile;
    foundFile = this.getFileInHead(fileName, fileType);

    if (foundFile) {
      foundFile.parentNode.removeChild(foundFile);
    }
    else {
      ImagesInc_Core.log(2, 'File could not be found in the head; from getFileInHead');
    }
  }

  self.checkIfArray = function (objToCheck) {
    // if not supported isArray is not supported natively, then use the old fashion way of checking
    Array.isArray = Array.isArray || function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    return Array.isArray(objToCheck);
  };

  self.testLocalStorage = function () {
    var test = 'testing local storage';

    try {
      localStorage.setItem(test, 'some value');
      localStorage.removeItem(test);

      return true;
    }
    catch (e) {
      return false;
    }
  };

  // add localstorage check to all methods
  // based on anti-pattern by Nicholas C. Zakas
  self.addLocalStorageCheck = function (object) {
    var name, method;

    for (name in object) {
      method = object[name];

      if (typeof method == 'function') {
        object[name] = function (name, method) {
          return function () {
            if (self.testLocalStorage()) {
              return method.apply(this, arguments);
            }
            else {
              ImagesInc_Core.log(3, 'LocalStorage is not available!, from ' + name + 'orange');

              return false;
            }
          };
        }(name, method);
      }
    }
  };

  self.mergePropertiesOfObjects = function (obj1, obj2) {
    var tempObj = {};
    
    for (var propName in  obj1) {
      tempObj[propName] = obj1[propName];
    }
    for (var propName2 in obj2) {
      tempObj[propName2] = obj2[propName2];
    }

    return tempObj;
  };

  // attach the clone function to Object prototype
  self.initialize = function () {
    Object.prototype.clone = self.clone;
    ImagesInc_Core.log(1, 'Utilitites Module has been intialized...', 'blue');
  };

  // register with MainCore
  self.register = (function () {
    ImagesInc_Core.registerModule(self);
  })();

  return {
    intialized: self.intialized,
    Load_JS_CSS: self.Load_JS_CSS,
    Remove_JS_CSS: self.Remove_JS_CSS,
    getFileInHead: self.getFileInHead,
    checkIfArray: self.checkIfArray,
    testLocalStorage: self.testLocalStorage,
    addLocalStorageCheck: self.addLocalStorageCheck
  };

})();
