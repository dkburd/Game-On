// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc
//new.js to be renamed stores renders and generates

function renderSections(){
  const sections = generateSections();
  $(".main").append(sections);
}

    // <section id='warning'></section>

function generateSections(){
  return (
    `

    <section id='search'></section>
    <section id='results' class='hidden center'></section>
    <section id='genre' class='hidden card v-center'></section>
    <section id='platforms' class='hidden card v-center'></section>
    <section id='js-add-genre' class='hidden'></section>
    <section id='get-list' class='hidden'></section>
    <section class="carousel-container hidden card v-center"></section>
    `
  )
}

function renderTemplates(){
  // const warningTemplate = generateWarningTemplate();
  const searchTemplate = generateSearchTemplate();
  const resultsTemplate = generateResultsTemplate();
  const genreTemplate = generateGenreTemplate();
  const platformsTemplate = generatePlatformsTemplate();
  const choicesTemplate = generateChoicesTemplate();
  const carouselTemplate = generateCarouselTemplate();
  
  // $("#warning").append(warningTemplate);
  $("#search").append(searchTemplate);
  $("#results").append(resultsTemplate);
  $("#genre").append(genreTemplate);
  $("#platforms").append(platformsTemplate);
  $("#get-list").append(choicesTemplate);
  $(".carousel-container").append(carouselTemplate);

}



// function generateWarningTemplate(){
//   return
// (
// `
// <p class='fail'>Unfortunately this search did not yield any recommendations. Please add at least one genre to try again.</p>
// <p class='alert'>Unfortunately this search is not likely to yield many recommendations. Please add at least one genre for better results.</p>
// <div>
//   <button class='button'>Add Genre</button>
//   <button class='button js-restart'>New Search</button>
// </div>
// `
// )
// }


function generateCarouselTemplate(){
return (
  `
  <ul class="display-detailed-list">
      </ul>
      <button class="previous">◀
      <!-- <span class='.screen-reader'>Previous</span> -->
      </button>
      <button class="next right">▶
      <!-- <span class='.screen-reader'>Next</span>  -->   
      </button>
      <div  class='button-bar'>
        <button id='js-restart-six' class='js-restart button'>New Search</button>
        </div>
  `
)
}

function generateChoicesTemplate(){
  return (
    `
      <form id='js-get-list-form'>
      <div class='selected-list card'></div>
          <div class='button-bar-two'>
              <input id='get-recs' class='button' type='submit' value='Get Games'></input>
              <button class='button js-restart'>New Search</button>
          </div>
      </form>

    `
  )

}


function generateSearchTemplate(){
  return (
    `
    <form id='js-search-form'></form>

    `
  )
}

// deleted 2 p above FormData, dont think they were being used
function generateResultsTemplate(){
  return (
    `
      <form id='js-results-form' class='center'>
      <ul id='results-list'class='center'></ul>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='js-restart button'>New Search</button>
      </div>
      </form>
  
    `
  )
}



function generateGenreTemplate(){
  return (
    `
      <form id='js-genre-form'>
      <ul id='genre-list'>
      </ul>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='button js-restart'>New Search</button>
    `
  )

}

function generatePlatformsTemplate(){
  return (
    `
    <form id='js-platforms-form'>
    <ul id='platforms-list'>
    </ul>
    <div class='button-bar'>
    <input type='submit' class='button' value='Submit'></input>
    <button id='js-more-platforms' class='button'>More options</button>  
    <button class='button js-restart'>New Search</button>
    </div>
    </form>
    `
  )

  }

function renderResultsTemplate(){
  const searchTemplate = generateSearchTemplate();
  $("#results").append(searchTemplate);
}

function renderSearch(){
$("#js-search-form").append(generateSearch());
$("#search").append(generateCustomSearch());
}

function generateSearch(){
  return(
  `
      <label for="search-option">Start with a game you love</label>
      <input id='js-search-option' type='text' name='search-option' placeholder='e.g., The Last of Us'>
      <input type='submit' value='Search'>
  `
)
}

function generateCustomSearch(){
  return(
`
<br>
    <label for="custom">Or create a custom search</label>
    <button id='custom-search' class="custom" name='custom'>Custom Search</button>
`
  )
 }
    

