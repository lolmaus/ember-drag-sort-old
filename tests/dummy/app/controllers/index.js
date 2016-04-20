import Ember from 'ember';

const {
  A,
  Controller
} = Ember;

export default Controller.extend({

  // ----- Static properties -----
  items:  A([{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]),
  items2: A([{name: 'quux'}]),
  
  recursive: {
    name: 'papa',
    children: A([
      {name: 'foo', children: A([
        {name: 'quux', children: A()}
      ])},
      {name: 'bar', children: A()},
      {name: 'baz', children: A()}
    ])
  }
});
