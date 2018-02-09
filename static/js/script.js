$(".ajax-trigger").on('click', function (e) {
  e.preventDefault();
  console.log($(this).attr('id'));
})
