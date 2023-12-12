"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showStar ? generateStarHTML(story, currentUser) : ""}
        ${showDeleteBtn ? generateDeleteBtnHTML() : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function generateDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

function generateStarHTML(story, user){
  const favorite = user.isFavorite(story);
  const star = favorite ? "fas" : "far";
  return `
  <span class="star">
    <i class="${star} fa-star"></i>
  </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitNewStoryClick(e){
  e.preventDefault();

  const author = $('#story-author').val();
  const title = $('#story-title').val();
  const url = $('#story-url').val();

  const storyData = {author, title, url}

  const addStory = await storyList.addStory(currentUser, storyData);
  const storyHtml = generateStoryMarkup(addStory);
  $allStoriesList.prepend(storyHtml);

  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on('submit', submitNewStoryClick);