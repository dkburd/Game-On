// 'use strict'; added 3/12, caused problems? 
// 'use strict';
let apiKey='96fd8fa562c547a3925bf94299e36bc0'
let search=$('#js-search-option').val()
let baseGame=[]
let baseGameSlug=''
let baseGameId=''
let baseGameDev=[]
let userGenres=[]
let platforms=[]
let genres=[]
let tags=[]
let userPlatforms=[]
let userIds=[]
let editList=[]
let detailedList=[]
let platformList=[]
let currentDate=''
let filteredList=[]
let uniqueMap={}


// carousel
  let counter = 0;
  let direction = 0



// ***STORE/UPDATE VALUES***
function updateSearch(){
search=$('#js-search-option').val();
$( ".results-message").empty();
// $('#js-search-option input:text').empty()
}

function updateDate(){
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

currentDate = yyyy + '-' + mm + '-' + dd;
console.log('currentDate',currentDate);
}


function updatePlatforms(userIds, userPlatforms){
  $('input[name="addPlatform"]:checked').each(function() {
  userPlatforms.push(this.value)
  userIds.push(this.id)
});
    if(userIds.length===0){
      // add ps4, ps5, xbox-one and pc
      userIds.push('18','187','1','4')
    }
   console.log("userIds",userIds)
   if(userGenres.includes(999)){
    getPGames(userIds, editList) 
   }else{
    getGenreGames(userGenres, userIds, editList)

  }
}


function updateGenres(userGenres){
$('input[name="addGenre"]:checked').each(function() {
  userGenres.push(this.value)
});
if(userGenres.length===0){
  userGenres.push(999)
}
console.log("userGenres",userGenres)      
    }



function editGameList(editList, baseGameSlug, userGenres){
console.log('editGameList - editlist: ',editList.length,editList)
  if(userPlatforms.length===0 ||userGenres.includes(999)){
  filteredList=editList
  // console.log('no platforms selected nothing to edit out')
    }else{
    // console.log('else')      
      for(let i=0; i<editList.length; i++){
        for(let j=0; j<editList[i].platforms.length ;j++){
            if(userPlatforms.includes(editList[i].platforms[j].platform.slug)){
              if(filteredList.indexOf(editList[i]) === -1) {
                filteredList.push(editList[i])
                // console.log('added to filtered list bc platform match') 
              }
            }
        }
      }
    }
let tempList = filteredList.filter(game => {return game.slug !== baseGameSlug})
if (userGenres.includes('fighting')){
  console.log('fighting game handicap')
tempList = tempList.filter(game => {return game.rating > 3.85})
}else{
tempList = tempList.filter(game => {return game.rating > 4.15})
}
console.log({'tempList':tempList.length, 'filteredList':filteredList.length})
return tempList
wait()
}

async function wait(){
let list = await editGameList(editList, baseGameSlug, userGenres)
// console.log({list})
if (list.length===0){
failList()
}else{
 getDetailedList(list)   
}
}


function failList(){
  $('#platforms-list').addClass('hidden')
  $('#get-list').addClass('hidden')
  if(detailedList.length===0){
    $('#summary p')[0].innerHTML="Unfortunately this search did not yield any recommendations. Please add at least one genre and gaming platform to try again.";
    displayGenreOptions(genres)
        }
      }



function reccomendRestart(responseJson){
  displayBaseGameResults(responseJson)
  // console.log('hello line 111')
  $('#platforms-list').addClass('hidden')
  $('#get-list').addClass('hidden')
  $('#js-add-genre').removeClass('hidden')
  $('#summary p')[0].innerHTML="Unfortunately this search is not likely to yield many recommendations."; 
  }





// ***FETCH TO API***
function getPlatforms() {
  fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
    platforms=responseJson.results
  console.log(platforms)
  enabeStartButtons()
      })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'))
}

function getGenres() {
  fetch(`https://api.rawg.io/api/genres?key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
    genres=responseJson.results
    console.log(genres)
      })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}

function getTags() {
  fetch(`https://api.rawg.io/api/tags?page_size=25&key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
   tags=responseJson.results
    console.log(tags)
      })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}



function startSearch() {
  updateSearch();

  fetch(`https://api.rawg.io/api/games?search=${search}&key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
      displaySearchResults(responseJson)
      })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}


function getBaseGame(baseGameId) {
  if(typeof(baseGameId)==="string"){
    // adding the api key to this call caused an error
fetch(`https://api.rawg.io/api/games/${baseGameId}?key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {    
    console.log("2nd call", responseJson, typeof(responseJson.website),responseJson.website.length )
    baseGameSlug=responseJson.slug
      for (let i=0;i<responseJson.developers.length;i++){
        baseGameDev.push(responseJson.developers[i].slug)
      }
     for (let i=0;i<responseJson.genres.length;i++){
      //  change userGenre to the slug not the whole object
        userGenres.push(responseJson.genres[i].slug)
      }
    console.log('basegameslug',baseGameSlug, 'baseGameDev', baseGameDev, 'userGenres',userGenres)

if(responseJson.genres.length===0){
   reccomendRestart(responseJson)
    }else{
    displayBaseGameResults(responseJson)
    displayPlatformOptions()
}
    })
    .then(responseJson => { 

    getDevGames(baseGameDev, editList)
    })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}
}
// 


function getGenreGames(userGenres, userIds, editList) {
  let promises=[]
if(userIds.length===0){
console.log('userIds: ', userIds)
console.log('no platforms selected onto edit')
wait()
}else{
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<userGenres.length;j++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1980-01-01,${currentDate}&platforms=${userIds[i]}&genres=${userGenres[j]}`)
      .then(response => response.json())
      .then(responseJson => {   
      results=responseJson.results
      for(i=0;i<results.length;i++){
          if(!uniqueMap[results[i].slug]){
          uniqueMap[results[i].slug] = true;
          editList.push(results[i])
          // console.log(results[i])
         }
        }
    })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'))
    )}
}
}
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)

      wait()
})
}


function getPGames(userIds, editList) {
  let promises=[]
if(userIds.length===0){
console.log('userIds: ', userIds)
console.log('no platforms selected onto edit')
wait()
}else{
for(let i=0;i<userIds.length;i++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1980-01-01,${currentDate}&platforms=${userIds[i]}`)
      .then(response => response.json())
      .then(responseJson => {   
      results=responseJson.results
      for(i=0;i<results.length;i++){
          if(!uniqueMap[results[i].slug]){
          uniqueMap[results[i].slug] = true;
          editList.push(results[i])
         }
        }
    })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'))
    )
}
}
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)

      wait()
})
}

// function getSuggested(baseGameSlug,baseGameId) {
  // adding api key causes errors
  // fetch(`https://api.rawg.io/api/games/${baseGameSlug}/suggested`)
  // fetch(`https://api.rawg.io/api/games/${baseGameId}/suggested?key=${apiKey}`)
  // fetch(`https://api.rawg.io/api/games/${baseGameSlug}/suggested?key=${apiKey}`)
  // fetch(`https://api.rawg.io/api/games/${tempId}?key=${apiKey}`)
//     .then(response => response.json())
//     .then(responseJson => {    
//     console.log("getSuggested call", responseJson)
//     games=responseJson.results
//       for (i=0;i<games.length;i++){
//         editList.push(games[i])
//         uniqueMap[games[i].slug] = true;
//       }
//        })
//     .then(responseJson => {
//     console.log('from getsuggested edit list',editList.length, editList)
//     getDevGames(baseGameDev, editList)
//       })
//     .catch(error => console.log(error,'Something went wrong. Please try again later.'));
// }


function getDevGames(baseGameDev, editList) {
console.log(`${baseGameDev}`, 'before call editlist length is', editList.length)
for(i=0;i<baseGameDev.length;i++)
{
    fetch(`https://api.rawg.io/api/games?developers=${baseGameDev[i]}&key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {    
    // console.log("from getDevGames", responseJson)
    results=responseJson.results
      for (i=0;i<results.length;i++){
          if(!uniqueMap[results[i].slug]){
          uniqueMap[results[i].slug] = true;
          editList.push(results[i])
  }
      }
  })
  .then(responseJson => { 
    console.log('from getdev games edit list',editList)
  })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}
}


function getDetailedList(list){
  console.log('getDetailedList Working','list: ', list.length, list)
    for(let i=0; i<list.length;i++){
      let tempId=list[i].id 
    fetch(`https://api.rawg.io/api/games/${tempId}?key=${apiKey}`)
        .then(response => response.json())
        .then(responseJson => {    
        results=responseJson
        // console.log('results: ', results)
        detailedList.push(results)
        enabeRecsButtons()
      })
     .catch(error => console.log(error,'Something went wrong. Please try again later.'));
    }
}

// // ***DISPLAY RESULTS*** 


function displaySearchResults(responseJson) { 
  $('#custom-search').addClass('hidden')
  $('#search').addClass('hidden')
  $('.home').addClass('hidden')
  $('h1').addClass('hidden')
  $(".results-message").empty();
  $(".container").addClass('transparent')
  console.log(responseJson);  
  let results=responseJson.results
  if(results.length===0){
  failList()
  }else{
    // for (let i = 0; i < results.length; i++){
    // idList.push(results[i].id)
    // }
  
    $('#summary p').removeClass('tag')
    $('#summary p')[0].innerHTML="Select game"
    $('#search').addClass('hidden')
    $( '#js-restart').removeClass('hidden')
    $('#results').removeClass('hidden')
    $('#results input').removeClass('hidden')
    let genres;
    let tags;

    // for (let i = 0; i < results.length; i++){
    //  only show  10 
    for (let i = 0; i < 10; i++){
      tags = results[i].tags.map(g => { return g.name})
      genres = results[i].genres.map(g => { return g.name})
      $('#results-list').append(
      `
      <li class='results-list-item screen-reader'>
      <h3 class='screen-reader'>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</h3> 
      <p class='screen-reader'>Rating: ${results[i].rating}</p>    
      <p class='screen-reader'>Genres: ${genres.join(", ")}</p> 
      <input type='radio' class='radio' name='baseGame' value='${responseJson.results[i].id}' required>
     </li> 
     `
      )
      $('#results-list').append(
      `
      <li class='results-list-item' aria-hidden='true'>
      <img src="${results[i].background_image}" class="results-img">
      <h3>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</h3> 
      <p>Rating: ${results[i].rating}</p>    
      <p>Genres: ${genres.join(", ")}</p> 
      <input type='radio' class='hidden radio' name='baseGame' value='${responseJson.results[i].id}' required>
     </li> 
     `
      )

    }
  };
gameSelect()
}
// alt image tag for these/ screen rader? 
  // <img src="${results[i].background_image}" class="results-img">


function displayBaseGameResults(responseJson) {  
  $( '#js-more-platforms').addClass('hidden')
  $( '#results input').addClass('hidden')
  $('#results-list').empty();
  $('#results-list').append(
      `
      <h3>${responseJson.name} (${responseJson.released[0]}${responseJson.released[1]}${responseJson.released[2]}${responseJson.released[3]})</h3> 
      <li id=${responseJson.id}>
      <img src="${responseJson.background_image}" class="results-img">
      </li>
`
  )
}

// removed because games without genres sometimes cause error? zero tolerance can you put a for loop in an apend
      // <p>Rating: ${responseJson.rating}</p>    
      // <p>Genres: ${responseJson.genres[0].name}</p> 

function displaySelectedOptions(userPlatforms, userGenres){
  $('#summary p')[0].innerHTML="See Results";
  $('#platforms input').addClass('hidden')
  $('#get-list').removeClass('hidden')
  $('#platforms-list').empty()
  $('#js-more-platforms').addClass('hidden')
  $('#platforms-list').append(
`
<h2> Selected Platforms </h2>
`
)
  for(i=0;i<userPlatforms.length;i++){
    $('#platforms-list').append(
      `
      <li>
      <p>${userPlatforms[i]}</>
      </li>
      `
    )
    $('#platforms-list').append(
      `
      <h2> Selected Genres </h2>
      `
    )
  }
    
  for(i=0;i<userGenres.length;i++){
    $('#platforms-list').append(
      `
      <li>
      <p>${userGenres[i]}</>
      </li>
      `
    )
  }
  
}


function displayGenreOptions(genres){
  console.log('sup')
$('#search').addClass('hidden')
$('#summary p')[0].innerHTML="Select Gaming Platforms";
$('#js-restart').removeClass('hidden')
$('#js-add-genre').addClass('hidden')
$('#genre').removeClass('hidden')
$('.home').addClass('hidden')
$('#summary p').removeClass('tag')
$('h1').addClass('hidden')
$('#search').addClass('hidden')
$('#custom-search').addClass('hidden')
$(".container").addClass('transparent')
$('#genre-list').append(
`<h2> Genres </h2>`);
for(i=0;i<genres.length;i++){
$('#genre-list').append(
  `
  <li>
  <label for='${genres[i].slug}'>${genres[i].name}</label>
  <input type='checkbox' id=${genres[i].id}' name='addGenre' value='${genres[i].slug}'>

</li>
`)
}
}


function displayPlatformOptions(){
  $('#genre').addClass('hidden')
    $('#platforms-list').removeClass('hidden')
  $('#summary p')[0].innerHTML="Select Gaming Platforms";
  $('#js-restart').removeClass('hidden')
  $( '#platforms').removeClass('hidden')
  $('#platforms input').removeClass('hidden')
 $( '#js-more-platforms').removeClass('hidden')
  $('#platforms-list').append(
      `<h2> platforms </h2>
  
      <li>
      <label for="playstation5">PS5</label>
      <input type="checkbox" id="187" name="addPlatform" value="playstation5">
      </li>
      <li>
      <label for="playstation4">PS4</label>
      <input type="checkbox" id="18" name="addPlatform" value="playstation4">
      </li>
      <li>
      <label for="xbox-one">Xbox One</label>      
      <input type="checkbox" id="1" name="addPlatform" value="xbox-one">
      </li>
      <li>
      <label for="xbox360">Xbox 360</label>
      <input type="checkbox"  id="14" name="addPlatform" value="xbox360">
      </li>
      <li>
      <label for="nintendo-switch">Switch</label>
      <input type="checkbox" id="7" name="addPlatform" value="nintendo-switch">
      </li>
      <li>
      <label for="pc">PC</label>
      <input type="checkbox" id="4" name="addPlatform" value="pc">
      </li>
      <li>
      <label for="ios">iOS</label>
      <input type="checkbox" id="3" name="addPlatform" value="ios">
      </li>
      <li>
      <label for="android">Android</label>
      <input type="checkbox" id="21" name="addPlatform" value="android">
      </li>
`
 )

}



function displayMoreOptions(platforms){
$('#js-more-platforms').addClass('hidden')
$('#platforms-list').empty();
$('#platforms-list').append(
`<h2>platforms</h2>`);
for(i=0;i<platforms.length;i++){
$('#platforms-list').append(
  `
<li class='group'>
<p class='label'>${platforms[i].name}</p>
<label class="switch">
<input type='checkbox' id='${platforms[i].id}' name='addPlatform' value='${platforms[i].slug}'>
<span class="slider round"></span>
</label>
</li>
`)
}
}

/* {<li class='group'>
<p class='label left' aria-hidden="true">${platforms[i].name}</p>
<label class="switch right" aria-hidden="true">
<label class="switch right"> ${platforms[i].name}</label>
<input type='checkbox right' id='${platforms[i].id}' name='addPlatform' value='${platforms[i].slug}'>
<span class="slider round right"></span>

</label>} */

//HERE BACK TO HERE BEFORE SWIPER
  function displayDetailedList(detailedList){  
  $('#search').addClass('hidden')
  $('#platforms').addClass('hidden')
  $('#get-list').addClass('hidden')
  $( '#js-more-platforms').addClass('hidden')
  $('#results').addClass('hidden')
  $('.carousel-container').removeClass('hidden')
  $('.carousel-nav').removeClass('hidden')
  $('#summary p')[0].innerHTML="";
  // console.log('before appened detailedList',detailedList, detailedList.length)
  console.log('detailedList',detailedList, detailedList.length)
  console.log('before appened')
  for (let i = 0; i < detailedList.length; i++){
    if(detailedList[i].website.length>1){
    $('.display-detailed-list').append(


  `
  <li class='hidden'>
  <a href="${detailedList[i].website}" target='blank'>
  <h3>${detailedList[i].name}</h3></a> 
  <img src="${detailedList[i].background_image}" class="results-img">
  
  </li>
     `
     )

}else{
    $('.display-detailed-list').append(
`
<li class='hidden'>
<h3>${detailedList[i].name}</h3> 
<img src="${detailedList[i].background_image}" class="results-img">
</li>
`
     )
}

  }
  $('.display-detailed-list > li:nth-of-type(1)').removeClass('hidden') 
 }
//  <p>${detailedList[i].description_raw}</p>



  function restartSearch(){
    console.log('restart search')
    baseGame=[]
    baseGameSlug=''
    baseGameDev=[]
    userGenres=[]
    userPlatforms=[]
    userIds=[]
    editList=[]
    detailedList=[]
    filteredList=[]
    uniqueMap={}
    $('#summary p').addClass('tag')
    $('#js-restart').addClass('hidden')
    $('.home').removeClass('hidden')
    $('h1').removeClass('hidden')
    $('#results').addClass('hidden')
    $('#results-list').empty();
    $('#platforms-list').empty();
    $('#genre-list').empty();
    $('.display-detailed-list').empty()
    $('#summary p')[0].innerHTML="Find your next favorite game";
    $('#get-list').addClass('hidden')
    $('#platforms').addClass('hidden')
    $('#genre').addClass('hidden')
    $('#js-more-platforms').addClass('hidden')
    $('#search').removeClass('hidden')
    $('#custom-search').removeClass('hidden')
    $('#js-add-genre').addClass('hidden')
    $('.carousel-container').addClass('hidden')
    $('#js-search-option').val('')
    $(".container").removeClass('transparent')
    disableRecsButtons()

  }

//MISC

function disableStartButtons(){
  $('#search input[type="submit"]').prop('disabled',true)
  $('.custom').prop('disabled',true)
}

function enabeStartButtons(){
  $('#search input[type="submit"]').prop('disabled',false)
  $('.custom').prop('disabled',false)
}

function disableRecsButtons(){
  $('#get-recs').prop('disabled',true)
}

function enabeRecsButtons(){
  $('#get-recs').prop('disabled',false)
}


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
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms, userGenres)
    // console.log('from watchOptionsForm(displayPlatformOptions)')
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
    $('#js-more-platforms').on("click", "button", function (event){
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
    $('#js-restart').on("click", "button", function (event){
    restartSearch();
  });
}


function watchAddGenre() {
  $('#js-add-genre').on("click", "button", function (event){
    displayGenreOptions(genres)
  });
}



// let finalListItems= $('.display-detailed-list > li')
//   $('.display-detailed-list > li:nth-of-type(1)').addClass('hidden') 
//   console.log('direction', direction)
//   console.log('counter', counter)    

    // }
    // current = items[counter];
//   for(let i=counter; i<=finalListItems.length; i++){
//   if(finalList.indexOf(finalListItems[i])===counter){
//   finalListItems[i].removeClass('hidden') 
// }
//     // current = items[counter];
//   }


//0 problem 
    // if (direction === -1 && 
    //     counter < 0) { 
    //   counter = amount - 1; 
    // }
    // if (direction === 1 && 
    //     !items[counter]) { 
    //   counter = 0;


//NAVIGATE CAROUSEL

function navigate(counter) {
console.log('from navigate', 'counter', typeof(counter), counter)
// let finalList= $('.display-detailed-list')
// let finalListItems= $('.display-detailed-list > li')

//replace hard code 2 for counter value
$('.display-detailed-list > li:nth-of-type(2)').removeClass('hidden') 
}

function watchCarouselNext(direction, counter) { 
    $('.next').on("click", function (event){
      //replace hard code 1 for counter value
    $('.display-detailed-list > li:nth-of-type(1)').addClass('hidden')    
    direction=1;
    counter = counter + direction
    console.log('from next')
    navigate(counter) 
   })
  }

  function watchCarouselPrevious(direction, counter) { 
    $('.previous').on("click", function (event){
    direction=-1;
    counter = counter + direction
    navigate(counter) 
   })
  }


function gameSelect(){
$('.results-list-item').on('click', function(){  
console.log('this', typeof(this), this)
$(this).children().prop("checked", 'true')
$('input:radio').parent().removeClass('selected');
$(this).addClass('selected');
 }) 
};



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
  watchCarouselNext(direction, counter)
  watchCarouselPrevious(direction, counter) 
    // watchGameSearch() 
  // gameSelect()
});






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