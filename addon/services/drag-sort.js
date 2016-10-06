import Ember from 'ember';

const {
  computed,
  Service,
  run: {later}
} = Ember;

export default Service.extend({

  // ----- Static properties -----
  item:          undefined,
  items:         undefined,
  groupName:     undefined,
  lastEvent:     undefined,
  originalItems: undefined,



  // ----- Computed properties -----
  dragInProgress: computed('item', function () {
    return this.get('item') != null;
  }),



  // ----- Public methods -----
  started ({groupName, items, item}) {


    console.log('dragSort attempt', item, this.get('item'));

    if (this.get('dragInProgress')) {
      return;
    }

    console.log('dragSort started', item.name);

    this
      .setProperties({
        item,
        items,
        groupName,
        originalItems: items,
      });
  },

  ended () {
    console.log('dragSort ended');

    const item          = this.get('item');
    const newItems      = this.get('items');
    const originalItems = this.get('originalItems');

    if (newItems !== originalItems) {
      originalItems.removeObject(item);
    }

    this._reset();
  },

  above (underItem) {
    console.log('dragSort above', underItem);

    this._setPosition(underItem);
  },

  into (newItems) {
    const oldItems      = this.get('items');
    const originalItems = this.get('originalItems');

    console.log('dragSort into', {oldItems, newItems});

    if (newItems === oldItems) {
      console.log('newItems === oldItems')
      return;
    }

    console.log('newItems !== oldItems')

    const item = this.get('item');

    if (oldItems !== originalItems) {
      console.log('newItems !== originalItems')
      oldItems.removeObject(item);
    }

    newItems.addObject(item);

    this.set('items', newItems);
  },



  // ----- Private methods -----
  _reset () {
    this
      .setProperties({
        item:          undefined,
        items:         undefined,
        originalItems: undefined,
        groupName:     undefined,
        lastEvent:     undefined,
      });
  },

  _setPosition (underItem) {
    const item  = this.get('item');

    if (item === underItem) {
      return;
    }

    const items           = this.get('items');
    const currentPosition = items.indexOf(item);
    const targetPosition  = items.indexOf(underItem);

    if (targetPosition == null || targetPosition === currentPosition) {
      return;
    }

    // const start = Math.min(currentPosition, targetPosition);
    // const amount = Math.abs(currentPosition - targetPosition) + 1;
    //
    // items.arrayContentWillChange(start, amount, amount);
    // items.splice(currentPosition, 1);
    // items.splice(targetPosition,  0, item);
    // items.arrayContentDidChange(start, amount, amount);

    items.removeObject(item);
    items.insertAt(targetPosition, item);
  }
});
