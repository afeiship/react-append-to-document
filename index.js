module.exports = function(inComponent,inProps,inAttrs){
  var props = inProps || {};
  var div = document.createElement('div');
  var body = document.body;

  for (var attr in inAttrs) {
    if (inAttrs.hasOwnProperty(attr)) {
      div[attr]=inAttrs[attr];
    }
  }

  body.appendChild(div);

  const component = ReactDOM.render(
    React.createElement(inComponent,inProps)
    , div);

  return {
    component:component,
    destroy:function(){
      ReactDOM.unmountComponentAtNode(div);
      body.removeChild(div);
    }
  };
};
