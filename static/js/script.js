$('.ajax-trigger').on('click', function (e) {
  //e.preventDefault();
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
