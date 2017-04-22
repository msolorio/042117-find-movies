function renderData(data, numOfResults) {
  var results = data.results.map(function(result) {
    return (
      '<div class="result">\
        <h2 class="title">' + result.original_title + '</h2>\
        <p class="description">' + result.overview + '</p>\
        <img src="https://image.tmdb.org/t/p/w320' + result.poster_path + '"/>\
      </div>'
    );
  });

  results = results.slice(0, numOfResults);

  $('.poster').html(results);
};

function getData(term, numOfResults) {
  var settings = {
    url: 'https://api.themoviedb.org/3/search/movie',
    data: {
      api_key: 'f5af0c6697b8912e5df877a54b656b4e',
      language: 'en-US',
      query: term
    },
    type: 'GET',
    dataType: 'json'

  };
  
  $.ajax(settings)
    .done(function(data) {
      renderData(data, numOfResults);
    })
    .fail(function(error) {
      $('#message').html('<p>There was an error with your request.</p>');
      console.log(error);
    });
};

function listenForButtonClick() {
  $('#search').click(function() {
    var term = $('#term').val().trim();
    var numOfResults = $('#numOfResults').val().trim();
    getData(term, numOfResults);
  });
}

$(function() {
  listenForButtonClick();
});
