///////////////////////////////////////////////////////////////////////
// a project using the TMDb API
// API information
// Docs - https://developers.themoviedb.org/3
// base url - api.themoviedb.org/3/movie/
// TMBd API key - f5af0c6697b8912e5df877a54b656b4e
///////////////////////////////////////////////////////////////////////
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
  $('#term').val('');
  $('#numOfResults').val('');
};

function getData(term, numOfResults) {
  var settings = {
    type: 'GET',
    dataType: 'json',
    url: 'https://api.themoviedb.org/3/search/movie',
    data: {
      api_key: 'f5af0c6697b8912e5df877a54b656b4e',
      language: 'en-US',
      query: term
    }
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
    var numOfResults = $('#numOfResults').val().trim() || 1;
    getData(term, numOfResults);
  });
}

$(function() {
  listenForButtonClick();
});
