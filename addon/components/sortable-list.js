import Ember from 'ember';

const {
  A,
  Component,
  computed,
  inject: {service},
  run: {throttle},
} = Ember;

import layout     from 'ember-drag-sort/templates/components/sortable-list';
import dragBetter from 'ember-drag-sort/mixins/drag-better';



export default Component.extend(/*dragBetter, */{

  // ----- Attributes -----
  items:                null,
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
  dragEnter (/*event*/) {

    const item = this.get('item');
    const items          = this.get('items');
    const service        = this.get('dragSort');

    console.log('list dragEnter', this.get('element'))
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.into, items, debouncePeriod, false);
    service.into(items);

    return false;
  },

  dragEnd (/*event*/) {
    const service = this.get('dragSort');
    service.ended();

    return false;
  },

  drop (/*event*/) {
    console.log('list drop')
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.ended, debouncePeriod, false);
    service.ended();
  },
});
