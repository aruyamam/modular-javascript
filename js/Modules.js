var ImagesInc_Utilitizes = (function () {
  var clone = function clone(deep) {
    // create an instance of the object
    var newClonedObj = new this.constructor();

    // copy all properties from the original object
    for (var property in this) {
      // if deep flag is not set, just do a shallow copy of properties
      if (!deep) {
        if (this.hasOwnProperty(property)) {
          newClonedObj[property] = this[property];
        }
      }
      // to make a deep copy, call the function recursively
      else if (typeof this[property] === 'object' && this.hasOwnProperty(property)) {
        newClonedObj[property] = this[property].clone(deep);
      }
      else if (this.hasOwnProperty(property)) {
        // just copy properties for non objects
        newClonedObj[property] = this[property];
      }
    }

    return newClonedObj;
  };

  // attch the clone function to Object prototype
  var initialize = (function () {
    Object.prototype.clone = clone;
  })();

})();

var ImagesInc_GlobalData = (function (module) {

  var headerContainerDef = {
    sectionHTML: `
      <div class="logo_titleClass">
      <a href=""><img src="img/ImagesIncLogo.png" alt="Company Logo" style="max-height: 100%"></a>
      <div class="siteTitleClass">Images Inc.</div>
      </div>
      <nav role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
        <h1 class="hiddenClass">Main Navigation</h1>
        <ul class="navmenuClass">
          <li><a href="#" class="active">Home</a></li>
          <li><a href="#">Our Company</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    `
  };

  var footerContainerDef = {
    sectionHTML: `
      <div><a href="#">Latest News</a></div>
      <div><a href="#">Services</a></div>
      <div><a href="#">Support</a></div>
    `
  };

  module.getHeaderHTMLTxt = function () {
    return headerContainerDef.sectionHTML;
  };

  module.getFooterHTMLTxt = function () {
    return footerContainerDef.sectionHTML;
  };

  return module;

})(ImagesInc_GlobalData || {});


var ImagesInc_PageUpdater = (function () {

  // module private function
  var insertHTMLTxt = function (contianerID, newStructure) {
    var theContainer = document.getElementById(contianerID);
    theContainer.innerHTML = newStructure;
  };

  // module private function
  var applyElementsCSS = function (eflementID, className) {
    var theElement = document.getElementById(elementID);
    theElement.className = className;
  };

  return {
    // privileged method
    updateElement: function (elemID, htmlTxt) {
      insertHTMLTxt(elemID, htmlTxt);
    },

    // privileged method
    updateElementClass: function (elemId, className) {
      if (!className) {
        console.error('No class name has been provided, exiting module!');
      }

      applyElementsCSS(elemId, className);
    }
  };

})();


var TestModule = (function () {
  var privateTestValue = 'Test for cloning, this property is hidden';

  return {
    publicTestValue: privateTestValue + ' but now showing it publicly',

    testFunc: function () {
      var anotherTest = 'This property will be cloned';

      return anotherTest;
    },

    getPrivateValue: function () {
      return privateTestValue;
    },

    changePrivateVar: function () {
      privateTestValue = 'the private value has been changed';

      return privateTestValue;
    },

    testArray: [1, 2, 3]
  };
})();
