"use strict";

  // This is the global list of the stories, an instance of StoryList
  let storyList;

  /** Get and show stories when site first loads. */

  async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStories();
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
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
        <div class = "icons-div">
          ${showDeleteBtn ? generateDeleteBtnHTML() : ""}
          ${showStar ? generateStarHTML(story, currentUser) : ""}
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

  function generateStarHTML(story, user){
    const favorite = user.isFavorite(story);
    const star = favorite ? "fas" : "far";
    return `
    <span class="star">
      <i class="${star} fa-star"></i>
    </span>`;
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
  }

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

  function putUserStoriesOnPage(){
    $userStoriesList.empty();

    if(currentUser.ownStories.length === 0){
      $userStoriesList.append("<p>You haven't created any stories. Time to go write one!</p>")
      console.log("Success")
    } else{
      for(let story of currentUser.ownStories){
        const myStory = generateStoryMarkup(story, true);
        $userStoriesList.append(myStory);
      }
    }
  }

  async function deleteStory(e){
    const closestLi = $(e.target).closest('li');
    const storyId = closestLi.attr('id');
    await storyList.removeStory(currentUser, storyId);
    await putUserStoriesOnPage();
  }

  $userStoriesList.on('click', ".trash-can", deleteStory);



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

