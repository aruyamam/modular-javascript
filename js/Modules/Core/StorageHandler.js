// using simple sub-module augmentation
ImagesInc_Core.StorageHandler = (function () {
  function getValueForKeyAsString(key, decode) {
    var valueForKey = localStorage[key];

    if (valueForKey) {
      if (decode) {
        try {
          valueForKey = decodeURI(valueForKey);
        }
        catch (e) {
          ImagesInc_Core.log(2, 'could not decode vaue, from StorageHandler.getValueForKeyAsString');
          return false;
        }
      }
      return valueForKey;
    }
    else {
      // if the key is not in the local storage, then return false
      return false;
    }
  }

  function getValueForKeyAsObject(key, decode) {
    var valueForKey = null;
    valueForKey = localStorage[key];

    if (valueForKey) {
      if (decode) {
        valueForKey = decodeURI(valueForKey);
      }
      return JSON.parse(valueForKey);
    }
    else {
      // if the key is not in the local storage, then return false;
    }
  }

  function checkLocalStorageForKey(key) {
    var value;
    value = localStorage[key];

    if (value) {
      return true;
    }
    else {
      // if the tile objects are not in the local storage, then return false
      return false;
    }
  }

  function saveValueToLocalStorage(key, value, encode) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    if (encode) {
      value = encodeURI(value);
    }

    localStorage.setItem(key, value);
  }

  function replaceValueForKey(key, newValue, encode) {
    this.removeKeyFromStorage(key);
    saveValueToLocalStorage(key, newValue, encode);
  }

  function saveArrayToLocalStorage(key, value, encode) {
    // if the object is NOT already existing in the database, then save it
    if (checkLocalStorageForKey(key) === false) {
      if (ImagesInc_Core.checkIfArray(value)) {
        if (encode) {
          value = encodeURI(value);
        }

        localStorage[key] = JSON.stringify(value);
        return true;
      }
      else {
        ImagesInc_Core.log(3, 'DataMismatch, from StorageHandler. saveArrayToLocalStorage', 'orange');
      }
    }
    else { // if te value already exist
      return false;
    }
  }
  // if the key already eixts, then in the case of array of objects, add new object to array, in case of object,
  // replace the object.
  // if the key does not exist, then create the key with the value passed in either as an object or as an array of objects

  function appendObjectToLocalStorageArray(key, objToSave, encode) {
    var storeValue = null,
        valueToStore = null;

    if (typeof objToSave !== 'object') {
      ImagesInc_Core.log(3, 'DataMismatch, from appendObjectToLocalStorageArray', 'orange');

      return false;
    }
    storeValue = getValueForKeyAsObject(key, true);

    // if there was a previously stored value for the key
    if (storeValue) {
      if (ImagesInc_Core.checkIfArray(storeValue)) {
        storeValue[storeValue.length] = objToSave;
        valueToStore = storeValue;
      }
      else { // if the stored value is an object but not an array. just replace it
        valueToStore = objToSave;
      }
    }
    else { // if there was no value previously i nthe storage
      valueToStore = objToSave;
    }
    valueToStore = JSON.stringify(valueToStore);

    if (encode) {
      valueToStore = encodeURI(valueToStore);
    }

    localStorage.setItem(key, valueToStore);
  }
  // if the key already exits with a value, then append the string passed to the already existing string value
  // if the key has no value, just add the string as the value of the key in storage

  function appendStringToLocalStorage(key, value, encode) {
    var storedValue = getValueForKeyAsString(key, encode),
        valueToStore;

    if (storedValue) {
      valueToStore = storedValue + value;
    }
    else {
      valueToStore = value;
    }

    if (encode) {
      valueToStore = encodeURI(valueToStore);
    }

    localStorage.setItem(key, valueToStore);
  }

  function appendVaueToKey(key, value, encode) {
    // if an object has been passedd in to be saved
    if (typeof value === 'object') {
      appendObjectToLocalStorageArray(key, value, encode);
    }
    else {
      appendStringToLocalStorage(key, value, encode);
    }
  }

  function removeKeyFromStorage(key) {
    localStorage.removeItem(key);
  }

  function clearLocalStorage() {
    localStorage.clear();
  }
  //** using core and in turn utilizes to check local storage

  function initialize() {
    if (ImagesInc_Core.testLocalStorage()) {
      ImagesInc_Core.log(1, 'LocalStorage is avialble', 'green');
    }
    else {
      ImagesInc_Core.log(3, 'LocalStorage is not available');
    }

    ImagesInc_Core.log(1, 'StorageHandler Module has been initialized...', 'blue');
  }

  return {
    initialize: initialize,
    getValueForKeyAsString: getValueForKeyAsString,
    getValueForKeyAsObject: getValueForKeyAsObject,
    checkLocalStorageForKey: checkLocalStorageForKey,
    replaceValueForKey: replaceValueForKey,
    saveValueToLocalStorage: saveValueToLocalStorage,
    saveArrayToLocalStorage: saveArrayToLocalStorage,
    appendObjectToLocalStorageArray: appendObjectToLocalStorageArray,
    appendStringToLocalStorage: appendStringToLocalStorage,
    appendVaueToKey: appendVaueToKey,
    removeKeyFromStorage: removeKeyFromStorage,
    clearLocalStorage: clearLocalStorage
  };

})();

// register with MainCore
ImagesInc_Core.StorageHandler.register = (function () {
  ImagesInc_Core.registerModule(ImagesInc_Core.StorageHandler);
})();

// add error handling to all methods of StorageHandler, if localStorage not available
ImagesInc_Core.Utilitizes.addLocalStorageCheck(ImagesInc_Core.StorageHandler);
