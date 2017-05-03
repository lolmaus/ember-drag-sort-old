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
  isOutsideClass:     '-isOutside',
  handleDefinedClass: '-handleDefined',
  classNameDefault:   'sortableItem',
  debouncePeriod:     50,
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
    'isOutsideClassCP',
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

  isOutsideClassCP: computed(
    'item',
    'dragSort.item',
    'dragSort.isInAnotherList',
    'items',
    'dragSort.originalItems',
    function () {
      if (
        this.get('item') === this.get('dragSort.item')
        && this.get('items') === this.get('dragSort.originalItems')
        && this.get('dragSort.isInAnotherList')
      ) {
        return this.get('isOutsideClass');
      }
    }
  ),

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

  dragEnd () {
    this.endDragging();
  },

  dragOver () {
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
      console.log('startDragging cancel1')
      if (!dragSortService.get('dragInProgress')) {
        console.log('startDragging cancel2')
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
