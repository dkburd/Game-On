// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc
<<<<<<< HEAD
//new.js to be renamed stores renders and generates

// HERE After form working 


=======

//new.js generate/ render, needs to be combined with display
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1


function renderSections(){
  const sections = generateSections();
  $(".main").append(sections);
}

    // <section id='warning'></section>

function generateSections(){
  return (
    `
<<<<<<< HEAD

    <section id='search'></section>
    <section id='results' class='hidden center'></section>
    <section id='genre' class='hidden card v-center'></section>
    <section id='platforms' class='hidden card v-center'></section>
    <section id='js-add-genre' class='hidden'></section>
    <section id='get-list' class='hidden'></section>
    <section class="carousel-container hidden card v-center"></section>
=======
    <section id='results' class='hidden center'></section>
    <section id='genres' class='hidden card'></section>
    <section id='tags' class='hidden card'></section>
    <section id='platforms' class='hidden card'></section>
    <section id='js-add-genres' class='hidden'></section>
    <section id='get-list' class='hidden'></section>
    <section class="carousel-container hidden card"></section>
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
    `
  )
}

function renderTemplates(){
<<<<<<< HEAD
  // const warningTemplate = generateWarningTemplate();
  const searchTemplate = generateSearchTemplate();
  const resultsTemplate = generateResultsTemplate();
  const genreTemplate = generateGenreTemplate();
  const platformsTemplate = generatePlatformsTemplate();
  const choicesTemplate = generateChoicesTemplate();
  const carouselTemplate = generateCarouselTemplate();
<<<<<<< Updated upstream:new.js
  
  // $("#warning").append(warningTemplate);
  $("#search").append(searchTemplate);
=======
  const contactTemplate = generateContactTemplate();

  // $("#search").append(searchTemplate);
>>>>>>> Stashed changes:render.js
  $("#results").append(resultsTemplate);
  $("#genre").append(genreTemplate);
  $("#platforms").append(platformsTemplate);
  $("#get-list").append(choicesTemplate);
  $(".carousel-container").append(carouselTemplate);
  $('.contact').append(contactTemplate);
}


function generateContactTemplate(){
  return (
  `
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
      <div> 
      <button class='button' id='contact-form-close'>X</button>
      </div>
  `
)
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

=======
  
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


>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1

function generateCarouselTemplate(){
return (
  `
<<<<<<< HEAD
  <ul class="display-detailed-list">
      </ul>
      <button class="previous">◀
=======
  <div class='bar v-center'>

  <span class='indicators'>
  </span>
      <button class="previous left">◀
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
      <!-- <span class='.screen-reader'>Previous</span> -->
      </button>
      <button class="next right">▶
      <!-- <span class='.screen-reader'>Next</span>  -->   
      </button>
<<<<<<< HEAD
      <div  class='button-bar'>
        <button id='js-restart-six' class='js-restart button'>New Search</button>
=======
  </div>
  <ul class="display-detailed-list">
      </ul>

      <div  class='button-bar'>
        <button class='js-restart button'>New Search</button>
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
        </div>
  `
)
}

function generateChoicesTemplate(){
  return (
    `
<<<<<<< HEAD
<<<<<<< Updated upstream:new.js
      <form id='js-get-list-form'>
      <div class='selected-list card'></div>
          <div class='button-bar-two'>
              <input id='get-recs' class='button' type='submit' value='Get Games'></input>
              <button class='button js-restart'>New Search</button>
=======
=======
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
      <form id='js-get-list-form' class='card'>
      <div class='selected-list'></div>
      <div class='button-bar-two'>

         <input id='get-recs' class='button' type='submit' value='Get Games'></input>
          <button class='button js-restart'>New Search</button>
<<<<<<< HEAD
>>>>>>> Stashed changes:render.js
=======
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
          </div>
      </form>

    `
  )

}


<<<<<<< HEAD
function generateSearchTemplate(){
  return (
    `
    <form id='js-search-form'></form>

=======
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
  
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
    `
  )
}

<<<<<<< HEAD
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
=======


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
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
      </ul>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='button js-restart'>New Search</button>
<<<<<<< HEAD
=======
      </div>
      </form>
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
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
    

