import 'React' from 'react';
import 'ReactDOM' from 'react-dom';


export default function(inComponent,inProps,inAttrs){
  const props = inProps || {};
  const div = document.createElement('div');
  const body = document.body;

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
    component,
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      body.removeChild(div);
    }
  };
}
