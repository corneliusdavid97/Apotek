$("#login-button").click(function(event){
  event.preventDefault();

  $('form').fadeOut(500);
  $('.wrapper').addClass('form-success');
  setTimeout(function () {
    window.location.href = "employee"; //will redirect to your blog page (an ex: blog.html)
  }, 500);
});
