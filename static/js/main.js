$(document).ready(function () {

  var source = $('#post-template').html();

  var template = Handlebars.compile(source);

  var context = {};

  var html;

  $.getJSON('http://www.freecodecamp.com/news/hot', function(resp) {
    context.entries = resp.map(function(curr, index, arr) {
      curr.timePosted = new Date(curr.timePosted).toISOString().replace(/T(.*)\..*/, ' $1');
      curr.storyLink = 'http://www.freecodecamp.com/news/' + curr.storyLink.replace(/\s/g, '-');
      curr.numVotes = curr.upVotes.length;
      return curr;
    });
    html = template(context);
    $('#feed').html(html);
  });
});
