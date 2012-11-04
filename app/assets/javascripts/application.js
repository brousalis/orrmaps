//= require jquery
//= require jquery.effects.bounce
//= require jquery.effects.shake
//= require jquery.effects.slide
//= require bootstrap-modal
//= require bootstrap-transition
//= require bootstrap-tab
//= require_self
//= require_tree .

var orrmaps = (function(orrmaps, $) {
  $(function() {
    orrmaps.ui.init();
  });
  return orrmaps;
}(orrmaps || {}, jQuery));
