// LEGEND
// app.js = ready function and event listeners
// fetch.js = api fetches
// store.js store and edit values etc
// render.js = generate templates
// display.js = display
// style.css=main css
// media.css= @media changes

// HERE After form working 


//***EVENT LISTENERS*** */
function watchContactLink() {
  $('#link-button').on("click", function (event){
  event.preventDefault();
// console.log('contact click')
 displayContactForm()
  });
}

function watchContactForm() {
$('#contact-form button').on("click", function (event){
// console.log('contact submit')
$('.contact').addClass('hidden')
  });
}

function watchContactFormClose() {
$('div > #contact-form-close').on("click", function (event){
event.preventDefault();
// console.log('form closed')
$('.contact').addClass('hidden')
  });
}



function watchSearchForm() {
  $('#game-search').on("click", function (event){
    event.preventDefault();
    disableStartButtons()
    startSearch();
  });
}

function watchCustomSearch() { 
  $('#custom-search').on("click", function (event){
    disableStartButtons()
    displayGenresOptions(genres)
   })
  }

function watchResultsForm() {
  $('#js-results-form').submit(event => {
    event.preventDefault();
    baseGameId=$('input[name="baseGame"]:checked').val();
    console.log(`basegameId: ${baseGameId}`)
    getBaseGame(baseGameId)
  });
}

function addGenre() {
  $('#add-genre').on("click", function (event){
  event.preventDefault();
console.log('add genre click')
 displayContactForm()
  });
}

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
    if(userTags.length<6){
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
    console.log('click')
    console.log('RESTART HERE')
    baseGame=[]
    baseGameSlug=''
    baseGameDev=[]
    userGenres=[]
    userTags=[]
    userPlatforms=[]
    userIds=[]
    editList=[]
    detailedList=[]
    filteredList=[]
    uniqueMap={}
    prev=0
    count = 0;
    carLoop=0;
    prev=0
    showLength=''
    $('.indicators').empty(); 
    $('.display-detailed-list').empty(); 
    $('.alert').addClass('hidden')
    $('#summary p')[0].innerHTML='Find your next favorite game'
    $('#summary').removeClass('hidden')
    $('#results').addClass('hidden')
    $('#results-list').empty();
   $('#platforms-list').empty();
    $('#genres-list').empty();
    $('#tags-list').empty();
    $('.display-detailed-list').empty()
    $('.selected-list').empty()
    $('#get-list').addClass('hidden')
    $('#platforms').addClass('hidden')
    $('#genres').addClass('hidden')
    $('#genres').addClass('hidden')
    $('#tags').addClass('hidden')
    $('#platforms').addClass('hidden')
    $('#js-more-platforms').addClass('hidden')
    $('#search').removeClass('hidden')
    $('#custom-search').removeClass('hidden')
    $('#js-add-genres').addClass('hidden')
    $('.carousel-container').addClass('hidden')
    $('#js-search-option').val('')
    $('.display-detailed-list').empty()
    $('.selectedResults').empty()
    disableRecsButtons()
    enabeStartButtons()
    $('.next').prop('disabled',false)
    $('.previous').prop('disabled',false)
        console.log('RESTART HAPPENED')
  });
}




function gameSelect(){
$('.results-list-item').on('click', function(){  
// console.log('this', typeof(this), this)
$(this).children().prop("checked", 'true')
$('input:radio').parent().addClass('unselected');
$('input:radio').parent().removeClass('selected');
$(this).addClass('selected');
$(this).removeClass('unselected');
$('.selected > div').removeClass('solid');
$('.unselected > div').addClass('solid');
        setTimeout(
            function() {
$(document).scrollTop($(document).height())
            },
            1000);
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
console.log('count: ', count, 'prev: ', prev)
    navigate(count,prev) 
   })
  $('.previous').on("click", function (event){
    $(finalListItems[count]).addClass('hidden') 
    prev=count
  count+=-1
    if (count===-1) {
   count=carLoop
    }
console.log('count: ', count, 'prev: ', prev)
    navigate(count,prev) 
   })
  }




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
  watchGenresForm()
  watchTagsForm()
  watchDisplayGenres()
  watchContinue() 
  watchCarousel(count,prev)  
  watchDots()
  watchContactForm() 
  watchContactLink() 
  watchContactFormClose()
  renderPlaceholder()
});


