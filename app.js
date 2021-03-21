// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc



//***EVENT LISTENERS*** */
function watchSearchForm() {
  $('#js-search-form').submit(event => {
    event.preventDefault();
    startSearch();
  });
}

function watchCustomSearch() { 
  $('#custom-search').on("click", "button", function (event){
  displayGenreOptions(genres)
  //  renderGenreOptions(genres)
   })
  }

function watchResultsForm() {
  $('#js-results-form').submit(event => {
    event.preventDefault();
    console.log('here?')
    baseGameId=$('input[name="baseGame"]:checked').val();
    console.log(`basegameId: ${baseGameId}`)
    getBaseGame(baseGameId)
    $( ".results-message").empty();
  });
}


function watchOptionsForm(displayPlatformOptions) {
  $('#js-platforms-form').submit(event => {
    event.preventDefault();
    console.log('message')
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms, userGenres)
  });
}

function watchGenreForm(displayGenreOptions) {
  $('#js-genre-form').submit(event => {
    event.preventDefault();
    updateGenres(userGenres);
    displayPlatformOptions()
  });
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
  });
}



function watchRestart() {
    $('.js-restart').on("click", function (event){
    event.preventDefault();
      restartSearch();
  });
}


function watchAddGenre() {
  $('#js-add-genre').on("click", "button", function (event){
    displayGenreOptions(genres)
  });
}


function gameSelect(){
$('.results-list-item').on('click', function(){  
console.log('this', typeof(this), this)
$(this).children().prop("checked", 'true')
$('input:radio').parent().removeClass('selected');
$(this).addClass('selected');
 }) 
};

// with div checking not working 
// function gameSelect(){
// $('.results-list-item').on('click', function(){  
// console.log('this', typeof(this), this)
// $(this).children().prop("checked", 'true')
// $('input:radio').parent().removeClass('selected');
// $(this).children().addClass('selected');
//  }) 
// };



//NAVIGATE CAROUSEL
function watchCarousel(count,prev)   { 
    let finalListItems=$('.display-detailed-list > li')
    $('.next').on("click", function (event){
    prev=count
    count+=1
    if (count>carLoop) {
   count=0
    } 
    if (prev>carLoop) {
    prev=0
    } 

    navigate(count,prev) 
   })
  $('.previous').on("click", function (event){
    $(finalListItems[count]).addClass('hidden') 
    prev=count
  count+=-1
    if (count<1) {
   count=carLoop
    }
    if (prev<1) {
   count=carLoop
    }

    navigate(count,prev) 
   })
  }



$(function() {
  console.log('App loaded! Waiting for submit!');
  disableStartButtons()
  disableRecsButtons()
  watchSearchForm();
  watchResultsForm(); 
  watchOptionsForm();
  watchMoreOptions();
  watchGetListForm();
  getPlatforms();
  getGenres();
  getTags();
  updateDate();
  watchRestart()
  watchCustomSearch()
  watchGenreForm(displayGenreOptions)
  watchAddGenre()
  watchCarousel(count,prev)  
  // renderGenreOptions(genres)
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