$('.ajax-trigger-percussion').on('click', function () {
  var parameters = {
    instrument_type: $(this).attr('id')
  };

  $.getJSON(Flask.url_for("description"), parameters)
    .done(function(data, textStatus, jqXHR){

    $("#percussion_instrument_name").fadeOut(50, function() {

      $("#percussion_instrument_name").html(data['name']);
      $("#percussion_instrument_name").fadeIn();

    });

    $("#percussion_instrument_description").fadeOut(50, function () {

      $("#percussion_instrument_description").html(data['opis']);
      $("#percussion_instrument_description").fadeIn();
    });

  });
});

$('.ajax-trigger-keyboard').on('click', function () {
  var parameters = {
    instrument_type: $(this).attr('id')
  };

  $.getJSON(Flask.url_for("description"), parameters)
    .done(function(data, textStatus, jqXHR){

    $("#keyboard_instrument_name").fadeOut(50, function() {

      $("#keyboard_instrument_name").html(data['name']);
      $("#keyboard_instrument_name").fadeIn();

    });

    $("#keyboard_instrument_description").fadeOut(50, function () {

      $("#keyboard_instrument_description").html(data['opis']);
      $("#keyboard_instrument_description").fadeIn();
    });

  });
});

$(".feature_wrapper").click(function(){

      var element_offset = $(this).next().filter('.target').offset();

      $('html, body').animate({
        scrollTop: element_offset.top
      });
});
