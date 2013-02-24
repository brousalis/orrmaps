//= require bootstrap-modal
//= require bootstrap-dropdown
//= require bootstrap-transition
//= require bootstrap-tab
//= require bootstrap-tooltip
//= require_self
//= require_tree .

var orrmaps = (function(orrmaps, $) {
  $(function() {
    orrmaps.ui.init();
  });
  return orrmaps;
}(orrmaps || {}, jQuery));
