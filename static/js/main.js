$(document).ready(function () {

  var source = $('#post-template').html();

  var template = Handlebars.compile(source);

  var context = {};

  var html;
  var url = 'https://en.wikipedia.org/w/api.php';

  function runSearch() {
    $.ajax({
      url: url,
      data: {
        action: 'query',
        list: 'search',
        format: 'json',
        formatversion: 2,
        srsearch: $('#search').val()
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function (resp) {
        context.entries = resp.query.search;
        html = template(context);
        $('#feed').html(html);
      }
    });
  }

  function randomPage() {
    $.ajax({
      url: url,
      data: {
        action: 'query',
        list: 'random',
        format: 'json',
        formatversion: 2,
        rnnamespace: 0,
        rnfilterredir: 'nonredirects'
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function (resp) {
        window.location.href = 'http://en.wikipedia.com/wiki/' + resp.query.random[0].title;
      }
    });
  }

  $('#search').autocomplete({
    source: function (req, resp) {
      $.ajax({
        url: url,
        data: {
          action: 'query',
          list: 'search',
          format: 'json',
          formatversion: 2,
          srsearch: req.term
        },
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
          var titles = data.query.search.map(function (curr, index, arr) {
            return curr.title;
          });
          resp(titles);
        }
      });
    },
    minLength: 3,
    select: function (event, ui) {
      runSearch();
    }
  });

  $('#search-button').on('click', runSearch);
  $('#random-button').on('click', randomPage);

});
