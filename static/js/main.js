$(document).ready(function () {

  var source = $('#post-template').html();

  var template = Handlebars.compile(source);

  var context = {};

  var html;
  var url = 'https://en.wikipedia.org/w/api.php';

  function runSearch() {
    console.log($(this).val());
  }

  $('#search').on('change keyPress', runSearch);

  $.ajax({
    url: url,
    data: {
      action: 'query',
      list: 'search',
      format: 'json',
      formatversion: 2,
      srsearch: 'War of 1812'
    },
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function(resp) {
      context.entries = resp.query.search;
      console.log(context);
      html = template(context);
      $('#feed').html(html);
    }
  });
});
