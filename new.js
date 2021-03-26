// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc

//new.js generate/ render, needs to be combined with display


function renderSections(){
  const sections = generateSections();
  $(".main").append(sections);
}

    // <section id='warning'></section>

function generateSections(){
  return (
    `
    <section id='results' class='hidden center'></section>
    <section id='genres' class='hidden card'></section>
    <section id='tags' class='hidden card'></section>
    <section id='platforms' class='hidden card'></section>
    <section id='js-add-genres' class='hidden'></section>
    <section id='get-list' class='hidden'></section>
    <section class="carousel-container hidden card"></section>
    `
  )
}

function renderTemplates(){
  
  // const searchTemplate = generateSearchTemplate();
  const resultsTemplate = generateResultsTemplate();
  const genresTemplate = generateGenresTemplate();
  const tagTemplate = generateTagTemplate();
  const platformsTemplate = generatePlatformsTemplate();
  const choicesTemplate = generateChoicesTemplate();
  const carouselTemplate = generateCarouselTemplate();
  

  // $("#search").append(searchTemplate);
  $("#results").append(resultsTemplate);
  $("#genres").append(genresTemplate);
  $("#tags").append(tagTemplate);
  $("#platforms").append(platformsTemplate);
  $("#get-list").append(choicesTemplate);
  $(".carousel-container").append(carouselTemplate);

}



function generateCarouselTemplate(){
return (
  `
  <div class='bar v-center'>

  <span class='indicators'>
  </span>
      <button class="previous left">◀
      <!-- <span class='.screen-reader'>Previous</span> -->
      </button>
      <button class="next right">▶
      <!-- <span class='.screen-reader'>Next</span>  -->   
      </button>
  </div>
  <ul class="display-detailed-list">
      </ul>

      <div  class='button-bar'>
        <button class='js-restart button'>New Search</button>
        </div>
  `
)
}

function generateChoicesTemplate(){
  return (
    `
      <form id='js-get-list-form' class='card'>
      <div class='selected-list'></div>
      <div class='button-bar-two'>
         <input id='get-recs' class='button' type='submit' value='Get Games'></input>
          <button class='button js-restart'>New Search</button>
          </div>
      </form>

    `
  )

}


// function generateSearchTemplate(){
//   return (
//     `
//     <form id='js-search-form'></form>
//     `
//   )
// }

// deleted 2 p above FormData, dont think they were being used
function generateResultsTemplate(){
  return (
    `
      <form id='js-results-form' class='center'>
      <ul id='results-list'class='center'></ul>
      </form>
  
    `
  )
}



function generateGenresTemplate(){
  return (
    `
      <form id='js-genres-form'>
      <ul id='genres-list'>
      </ul>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='button js-restart'>New Search</button>
      </div>
      </form>
    `
  )

}


function generateTagTemplate(){
  return (
    `
      <form id='js-tags-form'>
      <ul id='tags-list'>
      </ul>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='button js-restart'>New Search</button>
      </div>
      </form>
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
    

