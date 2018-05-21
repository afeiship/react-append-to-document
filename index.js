var React = require('react');
var ReactDOM = require('react-dom');

module.exports = function(inComponent,inProps,inTarget){
  var props = inProps || {};
  var isElement = inTarget.nodeType == 1;
  var body = document.body;
  var element = isElement ? inTarget : document.createElement('div');

  if(!isElement){
    for (var attr in inTarget) {
      if (inTarget.hasOwnProperty(attr)) {
        element[attr]=inTarget[attr];
      }
    }
  }

  body.appendChild(element);

  var component = ReactDOM.render(
    React.createElement(inComponent,inProps)
    , element);

  return {
    element: element,
    component: component,
    destroy: function(){
      try{
        ReactDOM.unmountComponentAtNode(element);
        body.removeChild(element);
      }catch(_){
        console.warn(_);
      }
    }
  };
};
