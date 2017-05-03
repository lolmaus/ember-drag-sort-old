import Ember from 'ember';

const {
  A,
  Component,
  computed,
  inject: {service},
  run: {throttle},
} = Ember;

import layout     from 'ember-drag-sort/templates/components/sortable-list';



export default Component.extend(/*dragBetter, */{

  // ----- Attributes -----
  items:                null,
  group:                'default',
  itemTagName:          'div',
  draggingClass:        '-dragging',
  classNameDefault:     'sortableList',
  classNameItemDefault: 'sortableItem',
  debouncePeriod:       100,



  // ----- Services -----
  dragSort: service(),



  // ----- Overridden properties -----
  layout,

  classNameBindings: [
    'classNameDefault',
    'draggingClassCP',
  ],



  // ----- Static properties -----



  // ----- Computed properties -----

  draggingClassCP: computed(
    'dragSort.dragInProgress',
    'draggingClass',
    'group',
    'dragSort.groupName',
    function () {
      if (
        this.get('dragSort.dragInProgress')
        && this.get('dragSort.groupName') === this.get('group')
      ) {
        return this.get('draggingClass');
      }
    }
  ),



  // ----- Overridden methods -----
  dragEnter () {
    const items          = this.get('items');
    const service        = this.get('dragSort');

    console.log('list dragEnter', this.get('element'))
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.into, items, debouncePeriod, false);
    service.into(items);

    return false;
  },

  drop () {
    console.log('list drop')
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.ended, debouncePeriod, false);
    service.ended();
  },
});
