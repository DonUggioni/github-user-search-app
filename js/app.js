'use strict';

const body = document.querySelector('body');
const submitForm = document.querySelector('.form');
const modeSelector = document.querySelector('.mode__selector__wrapper');
const modeSelectorDark = document.querySelector('.mode__selector--dark');
const modeSelectorLight = document.querySelector('.mode__selector--light');
const searchInput = document.querySelector('.input');
const userInfoEl = document.querySelector('.user__info');
const errorMessage = document.querySelector('.error__message');
const userNameEl = document.querySelector('.user__name');
const userTag = document.querySelector('.user__tag');
const userImg = document.querySelector('.info__img');
const joinDate = document.querySelector('.join__date');
const userBio = document.querySelector('.profile__bio');
const totalRepos = document.querySelector('.total__repos');
const totalFollowers = document.querySelector('.total__followers');
const totalFollowing = document.querySelector('.total__following');
const userLocation = document.querySelector('.location');
const twitterName = document.querySelector('.twitter');
const blog = document.querySelector('.website');
const company = document.querySelector('.company');
const generalInfo = document.querySelector('.info');

const addHoverEffect = function () {
  if (body.classList.contains('dark')) {
    modeSelectorLight.classList.add('mode__selector--light-hover');
  } else {
    modeSelectorDark.classList.add('mode__selector--dark-hover');
  }
};

const removeHoverEffect = function () {
  if (body.classList.contains('dark')) {
    modeSelectorLight.classList.remove('mode__selector--light-hover');
  } else {
    modeSelectorDark.classList.remove('mode__selector--dark-hover');
  }
};

// Toggle between dark and light
const selectMode = function () {
  body.classList.toggle('dark');
};

// Changes element color and makes links not clickable if not available
const unavailable = function (element) {
  element.parentElement.classList.add('info--unavailable');
  return 'Not Available';
};

// Fetch data from API
const getJSON = async function (url) {
  try {
    const res = await fetch(`${url}`);
    console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error('Oops!');
    return data;
  } catch (error) {
    console.log(error);
    errorMessage.style.visibility = 'visible';
  }
};

const renderInfo = async function (userName) {
  const info = await getJSON(`https://api.github.com/users/${userName}`);

  // Format date
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  let date = joinDate;
  date = info.created_at;
  date = new Date(date).toLocaleDateString('en-us', options).replace(',', '');

  userImg.src = info.avatar_url;
  userNameEl.textContent = info.name;
  date = date;
  userTag.textContent = `@${info.login}`;
  userTag.href = info.html_url;
  userBio.textContent = `${!info.bio ? 'This user has no bio.' : info.bio}`;
  totalRepos.textContent = info.public_repos;
  totalFollowers.textContent = info.followers;
  totalFollowing.textContent = info.following;
  userLocation.textContent = `${
    !info.location ? unavailable(userLocation) : info.location
  }`;
  twitterName.textContent = `${
    !info.twitter_username ? unavailable(twitterName) : info.twitter_username
  }`;
  blog.href = `${!info.blog ? '#' : info.blog}`;
  blog.textContent = `${!info.blog ? unavailable(blog) : info.blog}`;
  company.textContent = `${
    !info.company ? unavailable(company) : info.company
  }`;

  searchInput.value = '';
};

// Dark/Light selector
modeSelector.addEventListener('click', () => {
  selectMode();
});

// Adds hover effect to mode selector
modeSelector.addEventListener('mouseenter', () => {
  addHoverEffect();
});

modeSelector.addEventListener('mouseleave', () => {
  removeHoverEffect();
});

// Loads a default page
document.addEventListener('load', renderInfo('donuggioni'));

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.style.visibility = 'hidden';

  renderInfo(searchInput.value.toLowerCase().trim());
});
