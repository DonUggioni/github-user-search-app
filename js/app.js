'use strict';

const body = document.querySelector('body');
const modeSelector = document.querySelector('.mode__selector__wrapper');
const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.search__btn');
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

const selectMode = function () {
  body.classList.toggle('dark');
};

const notAvailableInfo = function (el1, el2) {
  el1.style.opacity = '0.5';
  el2.style.opacity = '0.5';
};

// https://api.github.com/users/
const getJSON = async function (url) {
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    if (!res.ok) throw new Error('Oops!');
    return data;
  } catch (error) {
    console.log(error.message);
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
    !info.location ? 'Not available.' : info.location
  }`;
  twitterName.textContent = `${
    !info.twitter_username ? 'Not available.' : info.twitter_username
  }`;
  blog.href = `${!info.blog ? '#' : info.blog}`;
  blog.textContent = `${!info.blog ? 'Not available.' : info.blog}`;
  company.textContent = `${!info.company ? 'Not available.' : info.company}`;

  searchInput.value = '';
};

modeSelector.addEventListener('click', () => {
  selectMode();
});

document.addEventListener('load', renderInfo('donuggioni'));

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  errorMessage.style.visibility = 'hidden';

  renderInfo(searchInput.value.toLowerCase().trim());
});
