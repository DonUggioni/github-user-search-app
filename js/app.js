'use strict';

const body = document.querySelector('body');
const modeSelector = document.querySelector('.mode__selector__wrapper');

const selectMode = function (e) {
  body.classList.toggle('dark');
};

modeSelector.addEventListener('click', selectMode);
