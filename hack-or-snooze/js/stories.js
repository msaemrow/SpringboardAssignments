//these functions focus on DOM manipulation. functions to update API data are under models.js

"use strict";

  // This is the global list of the stories, an instance of StoryList
  let storyList;


  //==============================================================================
  //functions to put stories on page (all, favorites, my stories)

  /** Get and show stories when site first loads. */
  async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStories(20, 20);
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
  }

  /** Gets list of stories from server, generates their HTML, and puts on page. */
  function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    for (let story of storyList.stories) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }

    $allStoriesList.show();
    $moreStories.show();
  }


  /** Gets list of favorite stories from server, generates their HTML, and puts on page. */
  function putFavoritesOnPage(){
    $favoriteStoryList.empty();
  
    if(currentUser.favorites.length === 0){
       $favoriteStoryList.append("<p>No favorites have been added yet! Time to go read some stories!</p>")
    } else{
        for(let story of currentUser.favorites){
          const favStory = generateStoryMarkup(story);
          $favoriteStoryList.append(favStory);
        }
    }
    $moreStories.hide();
    }
  
    //add all user created stories to the page
    function putUserStoriesOnPage(){
      $userStoriesList.empty();
  
      if(currentUser.ownStories.length === 0){
        $userStoriesList.append("<p>You haven't created any stories. Time to go write one!</p>")
      } else{
        for(let story of currentUser.ownStories){
          const myStory = generateStoryMarkup(story, true, true);
          $userStoriesList.append(myStory);
        }
      }
      $moreStories.hide();
    }
  
  //=======================================================================================
  //Story and icon html generation functions 
  function generateStoryMarkup(story, showDeleteBtn = false, showEditBtn = false) {
    // console.debug("generateStoryMarkup", story);

    const hostName = story.getHostName();

    const showStar = Boolean(currentUser);

    return $(`
        <li id="${story.storyId}">
        <div class = "icons-div">
          ${showDeleteBtn ? generateDeleteBtnHTML() : ""}
          ${showStar ? generateStarHTML(story, currentUser) : ""}
          ${showEditBtn ? generateEditBtnHTML() : ""}
        </div>
        <div class="story-information">
          <div class="story-top-row">
            <a href="${story.url}" target="a_blank" class="story-link">
              ${story.title}
            </a>
            <small class="story-hostname">(${hostName})</small>
          </div>
            <small class="story-author">by ${story.author}</small>
            <small class="story-user">posted by ${story.username}</small>
          </div>
        </li>
      `);
  }

  function generateDeleteBtnHTML() {
    return `
        <span class="trash-can">
          <i class="fas fa-trash-alt"></i>
        </span>`;
  }

  function generateEditBtnHTML() {
    return `
        <span class="edit-btn">
          <i class="fas fa-edit"></i>
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

  //===========================================================================================
  //functions for clicking on icons (favorite, delete, edit)
  async function toggleFavoriteStar(e){
    const target = $(e.target);
    const closestLi = target.closest("li");
    const storyId = closestLi.attr("id");
    const story = storyList.stories.find(s => s.storyId === storyId);

    if(target.hasClass("fas")){
      await currentUser.unfavoriteStory(story);
      target.closest("i").toggleClass("fas far");
    } else{
      await currentUser.favoriteStory(story);
      target.closest("i").toggleClass("fas far");
    }
  }

  $storiesList.on("click", ".star", toggleFavoriteStar);

  async function deleteStory(e){
    const closestLi = $(e.target).closest('li');
    const storyId = closestLi.attr('id');
    await storyList.removeStory(currentUser, storyId);
    await putUserStoriesOnPage();
  }

  $userStoriesList.on('click', ".trash-can", deleteStory);

  async function editStory(e){
    e.preventDefault();
    const storyId = $("#edit-story-id").val();
    const author = $("#edit-story-author").val();
    const title = $("#edit-story-title").val();
    const url = $("#edit-story-url").val();

    await storyList.editStoryAuthorTitleUrl(currentUser, storyId, author, title, url);
    putUserStoriesOnPage();
    $updateForm.hide();
  }

  $updateBtn.on('click', editStory);

  //=================================================================================
  //functions that act on new story form and edit form
  function myStoriesEditBtnClick(e){
    hidePageComponents();
    const closestLi = $(e.target).closest('li');
    const storyId = closestLi.attr('id');
    $("#edit-story-id").val(storyId);
    const storyToEdit = currentUser.ownStories.find((s) => s.storyId === storyId);
    const author = storyToEdit.author;
    const title = storyToEdit.title;
    const url = storyToEdit.url;
    $("#edit-story-author").val(author)
    $("#edit-story-title").val(title)
    $("#edit-story-url").val(url)
    $userStoriesList.show();
    $updateForm.show();
  }
  
  $userStoriesList.on('click', ".edit-btn", myStoriesEditBtnClick)

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


  //===========================================================================
  function getMoreStories(e){
    console.log("trying to get more stories is not functional yet")
  }

  $moreStories.on('click', getMoreStories)