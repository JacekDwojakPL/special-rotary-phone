// page slide animation
var page_slide = document.querySelectorAll(".page_slide");

page_slide.forEach(function(element) {
  element.addEventListener("click", function() {

    $('html, body').animate({
      scrollTop: $(this.dataset.slide).offset().top
    }); // end of animate
  }); // end of click listener
});// end of forEach


// getting instrument descriptions using AJAX
var get_description = document.querySelectorAll(".ajax-trigger");

get_description.forEach(function(element) {

  element.addEventListener("click", function () {

    var name = this.dataset.name;
    var opis = this.dataset.opis;
    var parameters = {
      instrument_type: this.id
    };

    $.getJSON(Flask.url_for("description"), parameters)
    .done(function(data, textStatus, jqXHR) {

      $(name).fadeOut(50, function() {
        $(name).html(data['name']);
        $(name).fadeIn();
      }); // end of name fadeOut

      $(opis).fadeOut(50, function() {
        $(opis).html(data['name']);
        $(opis).fadeIn();
      }); // end of opis fadeOut

    }); // end of getJSON
  }); // end of click event
});// end of forEach
