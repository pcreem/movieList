(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  const dataPanel = document.getElementById('data-panel')
  const songList = document.querySelector('#song-list')

  const movieList = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  $.each(movieList, function (index, value) {
    let newItem = document.createElement('li')
    newItem.innerHTML = `<a href="#">${value}</a>`
    songList.appendChild(newItem)
  });

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data)
  }).catch((err) => console.log(err))

  function displayDataList(data) {
    let htmlContent = ''
    let movieIndex = ''

    songList.addEventListener('click', function (event) {
      let songname = (event.target.text)
      let htmlContent = ''
      $.each(movieList, function (movieIndex, value) {
        if (songname === value) {
          data.forEach(function (item, index) {
            if ((item.genres.indexOf(Number(movieIndex))) !== Number(-1)) {
              htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
          </div>
        </div>
      ` }

          })
          dataPanel.innerHTML = htmlContent
        }
      })
    })

    data.forEach(function (item, index) {
      // if ((item.genres.indexOf(Number(1))) !== Number(-1)) { console.log(item) }
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }
})()