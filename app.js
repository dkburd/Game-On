// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc



//***EVENT LISTENERS*** */
function watchSearchForm() {
  $('#js-search-form').submit(event => {
    event.preventDefault();
    startSearch();
    // $(window).scrollTop(0)
  });
}

function watchCustomSearch() { 
  $('#custom-search').on("click", function (event){
  displayGenreOptions(genres)
  //  renderGenreOptions(genres)
  // $(window).scrollTop(0)
   })
  }

function watchResultsForm() {
  $('#js-results-form').submit(event => {
    event.preventDefault();
    baseGameId=$('input[name="baseGame"]:checked').val();
    console.log(`basegameId: ${baseGameId}`)
    getBaseGame(baseGameId)
  // $( ".results-message").empty();
  
  });
}


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
  });
}


function watchPlatforms(displayPlatformOptions) {
  $('#js-platforms-form').submit(event => {
    event.preventDefault();
    console.log('message')
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms, userGenres);
    // $(window).scrollTop(0)
  })
}
// displaySelectedOptions(userPlatforms, userGenres, baseGameSlug, baseGame) renamed
// displaySelectedOptions(userPlatforms, userGenres)



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
$('input:radio').parent().addClass('card');
$('input:radio').parent().removeClass('selected');
$(this).addClass('selected');
$(this).removeClass('card');
 }) 
};

// readMore not working not sure why


// recognizing click but no hiding the parent 
// function readMore(){
// $('.read-more').on('click', function(){
//   console.log('read more')
  // console.log('this', this)
  // question not working how to hide the sub string?
// $('.full').removeClass('hidden');
// $(this).parent().addClass('hidden');
// });
// }




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
  watchGenreForm(displayGenreOptions)
  watchAddGenre()
  watchContinue() 
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
