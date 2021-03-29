<<<<<<< HEAD
<<<<<<< Updated upstream
// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc

=======
=======
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
// LEGEND
// app.js = ready function and event listeners
// fetch.js = api fetches
// store.js store and edit values etc
// render.js = generate templates
// display.js = display
// style.css=main css
// media.css= @media changes
<<<<<<< HEAD

// HERE After form working 
>>>>>>> Stashed changes

=======
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1

//***EVENT LISTENERS*** */
function watchContactLink() {
  $('#link-button').on("click", function (event){
  event.preventDefault();
console.log('contact click')
 displayContactForm()
  });
}

function watchContactForm() {
$('#contact-form button').on("click", function (event){
console.log('contact submit')
$('.contact').addClass('hidden')
  });
}

function watchContactFormClose() {
$('div > #contact-form-close').on("click", function (event){
event.preventDefault();
console.log('form closed')
$('.contact').addClass('hidden')
  });
}



function watchSearchForm() {
  $('#game-search').on("click", function (event){
    event.preventDefault();
    disableStartButtons()
    startSearch();
    // $(window).scrollTop(0)
  });
}

function watchCustomSearch() { 
  $('#custom-search').on("click", function (event){
<<<<<<< HEAD
<<<<<<< Updated upstream
  displayGenreOptions(genres)
  //  renderGenreOptions(genres)
  // $(window).scrollTop(0)
=======
    disableStartButtons()
    displayGenresOptions(genres)
>>>>>>> Stashed changes
=======
    disableStartButtons()
    displayGenresOptions(genres)
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
   })
  }

function watchResultsForm() {
  $('#js-results-form').submit(event => {
    event.preventDefault();
    baseGameId=$('input[name="baseGame"]:checked').val();
    console.log(`basegameId: ${baseGameId}`)
    getBaseGame(baseGameId)
<<<<<<< HEAD
=======
  // $( ".results-message").empty();
  
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
  });
}


<<<<<<< HEAD
function watchAddGenre() {
 $('.add-genre').on("click", function (event){
      event.preventDefault();
      displayGenreOptions(genres)
  });
}

function watchContinue() {
  $('.continue').on("click", function (event){
      event.preventDefault();
      if(userIds.length===0){
        displayPlatformOptions()
      }else{
        displaySelectedOptions(userPlatforms, userGenres)
    }
  });
}

// function watchAddGenre() {
//   $('#js-add-genre').on("click", "button", function (event){
//     displayGenreOptions(genres)
//     // $(window).scrollTop(0)
//   });
// }

function watchGenreForm(displayGenreOptions) {
  $('#js-genre-form').submit(event => {
    event.preventDefault();
    updateGenres(userGenres);
if(userIds.length===0){
displayPlatformOptions()
}else{
  displaySelectedOptions(userPlatforms, userGenres)
}

    
    // $(window).scrollTop(0)
=======
function watchDisplayGenres() {
 $('.display-genres').on("click", function (event){
      event.preventDefault();
      displayGenresOptions(genres)
  });
}


// needs to impact navigate
function watchDots() {
 $('.dots').on("click", function (event){
      event.preventDefault();
    console.log('dot click')
  });
}

function watchContinue() {
  $('.continue').on("click", function (event){
      event.preventDefault();
      if(userIds.length===0){
        displayPlatformOptions()
      }else{
        displaySelectedOptions(userPlatforms, userGenres)
    }
  });
}


function watchGenresForm() {
  $('#js-genres-form').submit(event => {
    event.preventDefault();
    updateGenres(userGenres);
    if(userTags.length===0){
      console.log(displayTagOptions)
    displayTagOptions()
    }else if (userIds.length===0){
      console.log(displayPlatformOptions)
      displayPlatformOptions()
    }else{
      console.log(displaySelectedOptions)
      displaySelectedOptions(userPlatforms, userGenres)
    }
  });
}


function watchTagsForm() {
  $('#js-tags-form').submit(event => {
    event.preventDefault();
    updateTags(userTags);
    if (userIds.length===0){
      console.log(displayPlatformOptions)
      displayPlatformOptions()
    }else{
      console.log(displaySelectedOptions)
      displaySelectedOptions(userPlatforms, userGenres)
    }
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
  });
}

function watchPlatforms(displayPlatformOptions) {
  $('#js-platforms-form').submit(event => {
    event.preventDefault();
    console.log('message')
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms, userGenres);

  })
}
// displaySelectedOptions(userPlatforms, userGenres, baseGameSlug, baseGame) renamed
// displaySelectedOptions(userPlatforms, userGenres)



function watchPlatforms(displayPlatformOptions) {
  $('#js-platforms-form').submit(event => {
    event.preventDefault();
    console.log('message')
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms, userGenres);
    // $(window).scrollTop(0)
  })
}


function watchMoreOptions() {
    $('#js-more-platforms').on("click", function (event){
      event.preventDefault();
    displayMoreOptions(platforms)
  });
}




function watchGetListForm() {
  $('#js-get-list-form').submit(event => {
    event.preventDefault();
    displayDetailedList(detailedList)
    $(window).scrollTop(0)
  });
}



function watchRestart() {
    $('.js-restart').on("click", function (event){
    event.preventDefault();
      restartSearch();
      // $(window).scrollTop(0)
  });
}




function gameSelect(){
$('.results-list-item').on('click', function(){  
// console.log('this', typeof(this), this)
$(this).children().prop("checked", 'true')
$('input:radio').parent().addClass('unselected');
$('input:radio').parent().removeClass('selected');
$(this).addClass('selected');
<<<<<<< HEAD
<<<<<<< Updated upstream
$(this).removeClass('card');
=======
$(this).removeClass('unselected');
$('.selected > div').removeClass('solid');
$('.unselected > div').addClass('solid');
>>>>>>> Stashed changes
=======
$(this).removeClass('unselected');
$('.selected > div').removeClass('solid');
$('.unselected > div').addClass('solid');
// $('.results-list-item' > '.selected').addClass('solid-selected');
// $('.results-list-item' > '.selected').addClass('solid');
// $('.results-list-item' > '.unselected').removeClass('solid-selected');

>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
 }) 
};


//NAVIGATE CAROUSEL
function watchCarousel(count,prev)   { 
    let finalListItems=$('.display-detailed-list > li')
    $('.next').on("click", function (event){
      console.log('click next')
    prev=count
    count+=1
    if (count>carLoop) {
   count=0
    } 
<<<<<<< HEAD
<<<<<<< Updated upstream
    if (prev>carLoop) {
    prev=0
    } 

=======
console.log('count: ', count, 'prev: ', prev)
>>>>>>> Stashed changes
=======
    // if (prev>carLoop) {
    // prev=0
    // } 
console.log('count: ', count, 'prev: ', prev)
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
    navigate(count,prev) 
   })
  $('.previous').on("click", function (event){
    $(finalListItems[count]).addClass('hidden') 
    prev=count
  count+=-1
    if (count===-1) {
   count=carLoop
    }
<<<<<<< HEAD
<<<<<<< Updated upstream

=======
console.log('count: ', count, 'prev: ', prev)
>>>>>>> Stashed changes
=======
  //   if (prev===0) {
  //  count=carLoop
  //   }
console.log('count: ', count, 'prev: ', prev)
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
    navigate(count,prev) 
   })
  }


// watchOptionsForm renamed watchPlatforms 


$(function() {
  console.log('App loaded! Waiting for submit!');
  renderSections()
  renderTemplates()
  renderSearch()
  disableStartButtons()
  disableRecsButtons()
  watchSearchForm();
  watchResultsForm(); 
  watchPlatforms();
  watchMoreOptions();
  watchGetListForm();
  getPlatforms();
  getGenres();
  getTags();
  updateDate();
  watchRestart()
  watchCustomSearch()
<<<<<<< HEAD
  watchGenreForm(displayGenreOptions)
  watchAddGenre()
  watchContinue() 
  watchCarousel(count,prev)  
<<<<<<< Updated upstream

  // renderGenreOptions(genres)
=======
  watchDots()
  watchContactForm() 
  watchContactLink() 
  watchContactFormClose()
>>>>>>> Stashed changes
});


=======
  watchGenresForm()
  watchTagsForm()
  watchDisplayGenres()
  watchContinue() 
  watchCarousel(count,prev)  
  watchDots()
  // renderGenresOptions(genres)
});




// 

// todo 


// add back in any platform with if statements
  //  <li>
  //     <input type="checkbox" id="999" name="addPlatform" value="any">
  //     <label for="any">Any</label>
  //     </li>

  //is there any possible way to prevent putting release year if it is already in title? Resident Evil (2002) (2002)



// old
// function watchGameSearch() { 
//   $('#search').on("click", "button", function (event){ 
//   console.log('gameSearch') 
//   displayGameSearch()
// })
// }
>>>>>>> e41fe654148f95f7742b827ab7ef92f36f5d0de1
