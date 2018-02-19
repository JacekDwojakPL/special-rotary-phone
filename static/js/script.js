$('.ajax-trigger').on('click', function () {
  var parameters = {
    instrument_type: $(this).attr('id')
  };

  $.getJSON(Flask.url_for("description"), parameters)
    .done(function(data, textStatus, jqXHR){

    $("#instrument_name").fadeOut(50, function() {

      $("#instrument_name").html(data['name']);
      $("#instrument_name").fadeIn();

    });

    $("#instrument_description").fadeOut(50, function () {

      $("#instrument_description").html(data['opis']);
      $("#instrument_description").fadeIn();
    });

  });
});

$(".feature_wrapper").click(function(){

      var element_offset = $(this).next().filter('.target').offset();

      $('html, body').animate({
        scrollTop: element_offset.top
      });
});
