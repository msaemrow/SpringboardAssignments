"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $favoriteStoryList.show();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


/** Display new story for when submit is clicked in the header */
function navSubmitBtnClick(){
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStoryBtn.on("click", navSubmitBtnClick);

/** Display the list of favorites when favorites is clicked in the header */
function navFavoritesClick(){
  hidePageComponents();
  putFavoritesOnPage();
  $favoriteStoryList.show();
}

$showFavorites.on('click', navFavoritesClick);

/** Display the list of stories created by user when my stories is clicked in the header */
function navMyStoriesClick(){
  hidePageComponents();
  putUserStoriesOnPage();
  $userStoriesList.show();
}

$showMyStories.on('click', navMyStoriesClick);