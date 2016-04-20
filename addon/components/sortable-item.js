import Ember from 'ember';

const {
  Component,
  computed,
  inject: {service},
  run: {throttle},
} = Ember;

import layout from '../templates/components/sortable-item';



export default Component.extend({

  // ----- Attributes -----
  item:             null,
  items:            null,
  group:            'default',
  draggingClass:    '-dragging',
  classNameDefault: 'sortableItem',
  debouncePeriod:       300,



  // ----- Services -----
  dragSort: service(),



  // ----- Overridden properties -----
  layout,
  tagName: 'li',

  attributeBindings: [
    'draggable'
  ],

  classNameBindings: [
    'classNameDefault',
    'draggingClassCP',
  ],



  // ----- Static properties -----
  draggable:        true,



  // ----- Computed properties -----
  isDragging: computed('item', 'dragSort.item', function () {
    return this.get('item') === this.get('dragSort.item');
  }),

  draggingClassCP: computed('isDragging', 'draggingClass', function () {
    if (this.get('isDragging')) {
      return this.get('draggingClass');
    }
  }),



  // ----- Overridden methods -----
  dragStart (/*event*/) {
    this
      .get('dragSort')
      .started({
        item:      this.get('item'),
        items:     this.get('items'),
        groupName: this.get('group'),
      });
  },

  dragEnd (/*event*/) {
    console.log('item dragEnd')
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.ended, debouncePeriod, false);
    service.ended();
  },

  dragOver: function(/*event*/) {
    const item           = this.get('item');
    const service        = this.get('dragSort');
    const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.above, item, debouncePeriod, false);
    service.above(item);

    return false;
  }
});
