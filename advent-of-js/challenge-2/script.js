const MOVIES_LIST_JSON_PATH = './assets/movies-list.json'
const moviesList = document.querySelector('.movies-list')
const movieItemTemplate = document.querySelector('#movie-item-template')
const dropDownContainer = document.querySelector('.drop-down-container')
const dropDownInput = document.querySelector('.drop-down-input')

async function getMoviesListData(url) {
  const response = await fetch(url)
  return await response.json()
}

function createMovieItemElement(movieItem, element) {
  const { Title: title, Year: year, Image: imageSrc, 'Image Alt': imageAlt } = movieItem
  const [, movieRealTitle] = title.split('. ')

  const movieImg = element.querySelector('.movie-preview img')
  movieImg.setAttribute('src', imageSrc)
  movieImg.setAttribute('alt', imageAlt)

  const movieTitle = element.querySelector('.movie-title')
  movieTitle.textContent = movieRealTitle

  const movieYear = element.querySelector('.movie-year')
  movieYear.textContent = year

  return element
}

function renderMoviesItem(movieItem) {
  const { Title: title } = movieItem
  const [movieId] = title.split('. ')

  const clone = movieItemTemplate.content.cloneNode(true)

  const movieItemElement = clone.querySelector('.movie-item')
  movieItemElement.id = movieId

  createMovieItemElement(movieItem, clone)

  moviesList.appendChild(clone)
}

function renderChoosedMovie(movieItem) {
  const moviewWrapper = document.querySelector('.choosed-move-item')
  createMovieItemElement(movieItem, moviewWrapper)
}

function handleClickDropDownContainer(e) {
  if (state.isOpen) {
    dropDownContainer.classList.remove('is-open')
  } else {
    dropDownContainer.classList.remove('move-choosed')
    dropDownContainer.classList.add('is-open')
    dropDownInput.focus()
  }
}

function renderMoviesList(movieList) {
  moviesList.innerHTML = ''
  movieList.forEach(renderMoviesItem)
}

const state = {
  isOpen: false,
  searchText: '',
  moviesData: []
};

function searchMoviesByText() {
  return state.moviesData.filter(
    ({ Title: title }) => title.toLowerCase().includes(state.searchText.toLowerCase().trim())
  );
}

function handleInputDropDownInput(e) {
  const searchText = e.currentTarget.value.trim()
  if (state.searchText === searchText) return
  state.searchText = searchText
  const newRenderList = searchMoviesByText()
  renderMoviesList(newRenderList)
}

function indexInParent(node) {
  const children = node.parentNode.childNodes;
  let num = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i] === node) return num;
    if (children[i].nodeType === 1) num++;
  }
}

document.onkeydown = function(e) {
  const selectedItem = document.querySelector('.movie-item:focus')
  if (!selectedItem) return
  const selected = indexInParent(selectedItem);
  const itemNodes = document.querySelectorAll('.movie-item');
  let next = selected + 1;
  let pre = selected - 1;

  if (pre < 0) pre = 0;
  if (next > itemNodes.length) next = itemNodes.length;

  if (e.code === 'ArrowUp') {
    itemNodes[pre]?.focus();
  }
  if (e.code === 'ArrowDown') {
    itemNodes[next]?.focus();
  }
};

(async () => {
  state.moviesData = await getMoviesListData(MOVIES_LIST_JSON_PATH)
  renderMoviesList(state.moviesData)

  dropDownContainer.addEventListener('click', handleClickDropDownContainer)
  dropDownInput.addEventListener('input', handleInputDropDownInput)

  moviesList.addEventListener('click', (e) => {
    e.stopPropagation()
    const item = e.target.closest('.movie-item')
    const selectedMovie = state.moviesData.find(({ Title: title}) => title.startsWith(`${item.id}. `))
    dropDownContainer.classList.remove('is-open')
    dropDownContainer.classList.add('move-choosed')
    renderChoosedMovie(selectedMovie)
  })
})()
