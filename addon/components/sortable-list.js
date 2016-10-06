import Ember from 'ember';

const {
  Component,
  inject: {service},
  run: {throttle},
} = Ember;

import layout     from 'ember-drag-sort/templates/components/sortable-list';



export default Component.extend({

  // ----- Attributes -----
  items:                undefined,
  group:                'default',
  itemTagName:          'div',
  draggingItemClass:    '-dragging',
  classNameDefault:     'sortableList',
  classNameItemDefault: 'sortableItem',
  debouncePeriod:       300,



  // ----- Services -----
  dragSort: service(),



  // ----- Overridden properties -----
  layout,

  classNameBindings: [
    'classNameDefault'
  ],



  // ----- Static properties -----



  // ----- Overridden methods -----
  dragEnter () {
    this.entering();
  },

  drop () {
    this.dropping();
  },



  // ----- Custom method -----
  entering () {
    console.log('entering')
    const items          = this.get('items');
    const service        = this.get('dragSort');

    // const debouncePeriod = this.get('debouncePeriod');
    //
    // throttle(service, service.into, items, debouncePeriod, false);
    service.into(items);

    return false;
  },

  dropping () {
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');
    //
    // throttle(service, service.ended, debouncePeriod, false);
    service.ended();
  }
});
