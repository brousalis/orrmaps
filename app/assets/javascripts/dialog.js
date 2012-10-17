orrmaps.dialog = function() {
  var open = function() { $('#sign_in').modal('show'); };
  var close = function() { $('#sign_in').modal('hide'); };

  var serialize = function() {
    var values = {}
    $("#new_user input").each( function(){
      values[this.name] = $(this).val();
    });
    values["server"] = $('.server').text();
    return values;
  }

  var handle_submit = function() {
    $("#new_user").submit(function(e){
      e.preventDefault(); 
      $.ajax({
        type: "post",
        url: "/users",
        data: serialize($(this)),
        success: function(json){
          if(json.location) window.location = json.location
          $('#new_user .error').html(json.errors);
          $('#new_user .errors').fadeIn();
        },
        dataType: "json"
      });
      return false;
    });
  };

  var init = function() {
    $('#sign_in').modal({keyboard: false, show: false});
    $('input').attr('autocomplete', 'off');
    handle_submit();

    $('.top_rated, #pageslide .close').live('click', function() {
      $('#pageslide').toggle('slide', {direction: 'left'}, 500);
      $('.rated').toggleClass('active');
    });
  };

  return {
    open: open,
    handle_submit: handle_submit,
    serialize: serialize,
    close: close,
    init: init
  };
}();
 
