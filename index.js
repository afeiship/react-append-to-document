var React = require('react');
var ReactDOM = require('react-dom');
var createElement = function (inAttrs, inName) {
  var element = document.createElement(inName || 'div');
  for (var attr in inAttrs) {
    if (inAttrs.hasOwnProperty(attr)) {
      element[attr] = inTarget[attr];
    }
  }
  return element;
};

module.exports = {
  create: createElement,
  append: function(inComponent, inProps, inTarget) {
    var props = inProps || {};
    var isElement = inTarget.nodeType == 1;
    var body = document.body;
    var element = isElement ? inTarget : createElement(inTarget);

    body.appendChild(element);

    var component = ReactDOM.render(
      React.createElement(inComponent, inProps)
      , element);

    return {
      element: element,
      component: component,
      destroy: function () {
        try {
          ReactDOM.unmountComponentAtNode(element);
          body.removeChild(element);
        } catch (_) {
          console.warn(_);
        }
      }
    };
  }
};
