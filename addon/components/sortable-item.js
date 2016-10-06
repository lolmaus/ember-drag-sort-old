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
  item:               undefined,
  items:              undefined,
  group:              'default',
  draggingClass:      '-dragging',
  handleDefinedClass: '-handleDefined',
  classNameDefault:   'sortableItem',
  debouncePeriod:     100,
  handleSelector:     undefined,



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
    'handleDefinedClassCP',
  ],



  // ----- Static properties -----
  draggable:    true,
  isHandleUsed: undefined,



  // ----- Computed properties -----
  isDragging: computed('item', 'dragSort.item', function () {
    return this.get('item') === this.get('dragSort.item');
  }),

  draggingClassCP: computed('isDragging', 'draggingClass', function () {
    if (this.get('isDragging')) {
      return this.get('draggingClass');
    }
  }),

  handleDefinedClassCP: computed('handleSelector', 'handleDefinedClass', function () {
    if (this.get('handleSelector')) {
      return this.get('handleDefinedClass');
    }
  }),

  $handle: computed('handle', function () {
    const  handleSelector = this.get('handleSelector');
    return handleSelector && this.$(handleSelector);
  }),



  // ----- Overridden methods -----
  mouseDown ({target}) {
    this.updateIsHandleUsed(target);
  },

  dragStart (event) {
    this.startDragging(event);
  },

  dragEnd (/*event*/) {
    this.endDragging();
  },

  dragOver: function(/*event*/) {
    this.reportDragOver();
  },



  // ----- Custom methods -----
  updateIsHandleUsed (target) {
    const $handle = this.get('$handle');

    if (!$handle) { return; }

    const isHandleUsed =
      $handle
        .get(0)
        .contains(target);

    this.setProperties({isHandleUsed});
  },

  startDragging (event) {
    const handleSelector  = this.get('handleSelector');
    const isHandleUsed    = this.get('isHandleUsed');
    const dragSortService = this.get('dragSort');

    console.log('startDragging', handleSelector, isHandleUsed)

    if (handleSelector && !isHandleUsed) {
      if (!dragSortService.get('dragInProgress')) {
        event.preventDefault();
      }
      return false;
    }

    dragSortService
      .started({
        item:      this.get('item'),
        items:     this.get('items'),
        groupName: this.get('group'),
      });
  },

  endDragging () {
    console.log('item dragEnd')
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.ended, debouncePeriod, false);
    service.ended();
  },

  reportDragOver () {
    const item           = this.get('item');
    const service        = this.get('dragSort');
    // const debouncePeriod = this.get('debouncePeriod');

    // throttle(service, service.above, item, debouncePeriod, false);
    service.above(item);

    return false;
  }

});
