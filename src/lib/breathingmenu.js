import { getState } from '../globalState';
import { saveStateHasVisited } from './breathingtimer';
import {
  displayMenu,
  hideMenu,
  hideModal,
  showModal,
} from '../animations';

const breathingMenu = {};

breathingMenu.timer = '';

breathingMenu.menuIsDisplayed = true;

breathingMenu.modalIsDisplayed = false;

breathingMenu.elementsThatResetTimer = [
  'audio-controls',
  'breathing-menu',
  'menu-options',
  'feel-good-modal',
];

breathingMenu.elementsThatWontTriggerMenu = [
  'breathing-settings',
  'breathing-info',
  'feel-good-button',
  'exit-modal-button',
];

breathingMenu.updateMenuState = function () {
  if (this.menuIsDisplayed) this.menuIsDisplayed = false;
  else this.menuIsDisplayed = true;
};

breathingMenu.updateModalState = function () {
  if (this.modalIsDisplayed) this.modalIsDisplayed = false;
  else this.modalIsDisplayed = true;
};

breathingMenu.setHideMenuTimer = function (time) {
  this.timer = setTimeout(() => {
    hideMenu();
    this.updateMenuState();
  }, time);
};

breathingMenu.resetHideMenuTimer = function () {
  clearTimeout(this.timer);
  this.setHideMenuTimer(5000);
};

breathingMenu.toggleBreathingMenu = function (e) {
  if (this.elementsThatWontTriggerMenu.includes(e.target.id)) return;
  else if (this.modalIsDisplayed) {
    this.toggleModal();
    saveStateHasVisited();
  } else if (!this.menuIsDisplayed) {
    displayMenu();
    this.updateMenuState();
    this.resetHideMenuTimer();
  } else if (this.menuIsDisplayed && (this.elementsThatResetTimer.includes(e.target.id))) {
    this.resetHideMenuTimer();
  } else if (this.menuIsDisplayed) {
    clearTimeout(this.timer);
    hideMenu();
    this.updateMenuState();
  }
};

breathingMenu.toggleModal = function () {
  if (this.modalIsDisplayed) {
    hideModal();
    this.setHideMenuTimer(5000);
    this.updateModalState();
  } else if (!this.modalIsDisplayed) {
    this.updateModalState();
    showModal();
    clearTimeout(this.timer);
  }
};

export default breathingMenu;
