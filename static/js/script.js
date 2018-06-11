  document.addEventListener("DOMContentLoaded", function () {
    var language_toggle = document.querySelector(".language_version")

    language_toggle.addEventListener('click', function(event) {
      event.preventDefault()

      if(this.dataset.version == 'english') {
        //translate navigation links
        change_elements("navigation", this.dataset.version)
        //translate main header elements
        change_elements("main_header", this.dataset.version)
        change_elements("main_description", this.dataset.version)
        //translate percussion section elements
        change_elements("percussion_link", this.dataset.version)
        change_elements("percussion_header", this.dataset.version)
        change_elements("percussion_instrument_description", this.dataset.version)
        //translate keyboard section elements
        change_elements("keyboard_link", this.dataset.version)
        change_elements("keyboard_header", this.dataset.version)
        change_elements("keyboard_instrument_description", this.dataset.version)
        //translate contact section elements
        change_elements("contact_link", this.dataset.version)
        change_elements("contact_header", this.dataset.version)
        change_elements("contact_address", this.dataset.version)
        change_elements("contact_description", this.dataset.version)
        this.dataset.version = 'polish'
        this.innerHTML = 'Polski'
      }
      else if(this.dataset.version == "polish") {
        //translate navigation links
        change_elements("navigation", this.dataset.version)
        //translate main header elements
        change_elements("main_header", this.dataset.version)
        change_elements("main_description", this.dataset.version)
        //translate percussion section elements
        change_elements("percussion_link", this.dataset.version)
        change_elements("percussion_header", this.dataset.version)
        change_elements("percussion_instrument_description", this.dataset.version)
        //translate keyboard section elements
        change_elements("keyboard_link", this.dataset.version)
        change_elements("keyboard_header", this.dataset.version)
        change_elements("keyboard_instrument_description", this.dataset.version)
        //translate contact section elements
        change_elements("contact_link", this.dataset.version)
        change_elements("contact_header", this.dataset.version)
        change_elements("contact_address", this.dataset.version)
        change_elements("contact_description", this.dataset.version)
        this.dataset.version = 'english'
        this.innerHTML = 'English'
      }
    }) //end of click event handler

  }) // end of dom content loaded


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
        $(opis).html(data['opis']);
        $(opis).fadeIn();
      }); // end of opis fadeOut

    }); // end of getJSON
  }); // end of click event
});// end of forEach

function change_elements(element, version) {

  get_new_language(element, version, function(data) {

    var elements = document.querySelectorAll("." + element)
    for(var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = data[i].content
    }
  })
}

function get_new_language(element, version, callback) {
  var parameters = {version: version,
                    type: element}

                    $.getJSON(Flask.url_for("language"), parameters)
                    .done(function(data, textStatus, jqXHR){
                      callback(data)
                    })
}
