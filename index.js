var React = require('react');
var ReactDOM = require('react-dom');
var createElement = function (inAttrs, inName) {
  var element = document.createElement(inName || 'div');
  for (var attr in inAttrs) {
    if (inAttrs.hasOwnProperty(attr)) {
      element[attr] = inAttrs[attr];
    }
  }
  return element;
};

module.exports = {
  create: createElement,
  append: function (inComponent, inProps, inTarget) {
    var props = inProps || {};
    var isElement = inTarget.nodeType == 1;
    var body = document.body;
    var element = isElement ? inTarget : createElement(inTarget);

    body.appendChild(element);

    // issue: https://github.com/facebook/react/issues/10266

    return new Promise(function (resolve, reject) {
      ReactDOM.render(React.createElement(inComponent, props), element, function () {
        resolve({
          element: element,
          component: this,
          destroy: function () {
            try {
              ReactDOM.unmountComponentAtNode(element);
              body.removeChild(element);
            } catch (_) {
              console.warn(_);
            }
          }
        });
      });
    });
  }
};
