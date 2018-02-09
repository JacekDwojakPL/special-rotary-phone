$('.ajax-trigger').on('click', function (e) {
  e.preventDefault();
  var parameters = {
    instrument_type: $(this).attr('id')
  };

  $.getJSON(Flask.url_for("description"), parameters)
    .done(function(data, textStatus, jqXHR){
      console.log(data['opis'])
    });
});
