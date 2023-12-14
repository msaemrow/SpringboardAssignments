"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

//story list selectors
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoriteStoryList = $("#favorite-story-list");
const $userStoriesList = $("#user-story-list");
const $storiesList = $(".stories-list");
const $storiesContainer = $(".stories-container")


//form selectors
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#new-story-form");
const $updateForm = $("#update-story-form");
const $updateBtn = $("#update-story-btn");
const $updateFormStoryId = $("#edit-story-author")

//nav button selectors
const $navSubmitStoryBtn = $('#nav-submit');
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $showFavorites = $("#nav-favorites");
const $showMyStories = $("#nav-my-stories");

//icon seletors
const $trashCan = $(".trash-can");
const $editBtn= $(".edit-btn")

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $favoriteStoryList,
    $userStoriesList,
    $loginForm,
    $signupForm,
    $submitForm,
    $updateForm
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  if(await checkForRememberedUser() === false){
    $navSubmitStoryBtn.hide();
    $showFavorites.hide();
    $showMyStories.hide();
  }
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
