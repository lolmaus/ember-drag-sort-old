import Ember from 'ember';

const {
  Component,
  computed,
  inject: {service}
} = Ember;

import layout from '../templates/components/recursive-item';

export default Component.extend({

  // ----- Services -----
  dragSort: service(),



  // ----- Overridden properties -----
  layout,
  classNames: ['recursiveItem'],



  // ----- Computed properties -----
  isDragging: computed('item', 'dragSort.item', function () {
    return this.get('item') === this.get('dragSort.item');
  }),

});
