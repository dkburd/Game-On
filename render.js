// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc

//new.js generate/ render, needs to be combined with display


// HERE After form working 




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
  const contactTemplate = generateContactTemplate();

  // $("#search").append(searchTemplate);
  $("#results").append(resultsTemplate);
  $("#genres").append(genresTemplate);
  $("#tags").append(tagTemplate);
  $("#platforms").append(platformsTemplate);
  $("#get-list").append(choicesTemplate);
  $(".carousel-container").append(carouselTemplate);
  $('.contact').append(contactTemplate);
}


function generateContactTemplate(){
  return (
  `
    <div class='container'> 
     <form class='card v-center ' action="https://formspree.io/f/mknkwenr" method="POST">
     <h3>Send a Message</h3>
     <label for="user-name">Name:</label>
     <input id="user-name" type="text" name="name" required>
            
     <label for="user-email">Email:</label>
     <input id="user-email" type="text" name="email" required>
            
      <label for="user-message">Message:</label>
      <textarea id="user-message" name="message" required></textarea>
      <button class="contact-form button" type="submit">Submit</button>
      </form>
      
      <button id='contact-form-close'>X</button>
      </div>
  `
)
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
    <input type='submit' class='button platforms-list-item' value='Submit'></input>
    <button id='js-more-platforms' class='button platforms-list-item'>More options</button>  
    <button class='button js-restart platforms-list-item'>New Search</button>
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
      <input id='js-search-option' type='text' name='search-option' placeholder=''>
      <button id='game-search' name='search'>Search</button>
      
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
    

