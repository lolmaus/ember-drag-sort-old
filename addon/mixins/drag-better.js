import Ember from 'ember';

const {
  A,
  computed,
  K,
  Mixin,
  run: {later}
} = Ember;

export default Mixin.create({

  // ----- Static properties -----
  _dragBetterEventTargets: computed(() => A()),
  // _dragBetterStartFired:   false,



  // ----- Overridden methods -----
  // dragStart () {
  //   // this.set('_dragBetterStartFired', true);
  //   this._super(...arguments);
  // },

  dragEnter (event) {
    this._super(...arguments);

    const targets    = this.get('_dragBetterEventTargets');
    // const startFired = this.get('_dragBetterStartFired');

    if (!targets.length /*&& startFired*/) {
      this.dragIn();
    }

    targets.addObject(event.target);
  },

  dragLeave (event) {
    this._super(...arguments);

    later(() => {
      const targets            = this.get('_dragBetterEventTargets');
      const currentTargetIndex = targets.indexOf(event.target);

      if (currentTargetIndex > -1) {
        targets.replace(currentTargetIndex, 1);
      }

      if (targets.get('length') === 0) {
        this.dragOut();
      }
    });
  },

  drop () {
    this._super(...arguments);
    this._dragBetterReset();
  },

  dragEnd () {
    this._super(...arguments);
    this._dragBetterReset();
  },



  // ----- Custom methods -----
  dragIn:  K,
  dragOut: K,

  _dragBetterReset () {
    this.setProperties({
      _dragBetterEventTargets: A(),
      // _dragBetterStartFired:   false
    });
  }


});
