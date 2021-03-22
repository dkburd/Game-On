// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//store.js store and edit values etc





// // ***DISPLAY RESULTS*** 


function displaySearchResults(responseJson) { 
  $('#custom-search').addClass('hidden')
  $('#search').addClass('hidden')
  $('.home').addClass('hidden')
  $('h1').addClass('hidden')
  $(".results-message").empty();
  $(".container").addClass('transparent')
  // $('#js-restart-six').addClass('hidden')
  $('#js-restart-two').addClass('button')
  $('#jrf-input').addClass('button')
  console.log(responseJson);  
  let results=responseJson.results
  if(results.length===0){
  failList()
  }else{
    // for (let i = 0; i < results.length; i++){
    // idList.push(results[i].id)
    // }
    $('#summary p').removeClass('tagline')
    $('#summary p')[0].innerHTML="Select game"
    $('#search').addClass('hidden')
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
      <input type='radio' class='radio screen-reader' name='baseGame' value='${responseJson.results[i].id}' required>
     </li> 
     `
      )
      $('#results-list').append(
      `
      <li class='results-list-item card grow v-center' aria-hidden='true'>
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


// question a items spilling out of their boxes 

function displayGenreOptions(genres){
console.log('sup')
$('#search').addClass('hidden')
$('#summary p')[0].innerHTML="Select Game Genres";
$('#js-add-genre').addClass('hidden')
$('#js-restart-one').addClass('hidden')
$('#js-restart-four').removeClass('hidden')
$('#genre').removeClass('hidden')
$('#genre-list').removeClass('hidden')
$('.home').addClass('hidden')
$('#summary p').removeClass('tagline')
$('h1').addClass('hidden')
$('#search').addClass('hidden')
$('#custom-search').addClass('hidden')
$(".container").addClass('transparent')
$('#genre-list').append(
`<h2> Genres </h2>`);
for(i=0;i<genres.length;i++){

  // question c screen readers and access using p instead of label

// for screen readers
// $('#genre-list').append(
//   `
//   <li>
//   <label for='${genres[i].slug}'>${genres[i].name}</label>
//   <input type='checkbox' id=${genres[i].id}' name='addGenre' value='${genres[i].slug}'>

// </li>
// `)
$('#genre-list').append(
  `
  <li class='group'>
  <p class='label left'>${genres[i].slug}</p>
  <label class="switch right">
  <input type='checkbox' id=${genres[i].id}' name='addGenre' value='${genres[i].slug}'>
      <span class="slider round"></span>
      </label>
</li>
`)
}
}



function displayPlatformOptions(){
  $('#genre').addClass('hidden')
  // question second loop it is not adding back
  $('#platforms-list').removeClass('hidden')
  $('#js-platforms-form').removeClass('hidden')
  $('#platforms').removeClass('hidden')
  $('#platforms').removeClass('hidden')
  $('#platforms input').removeClass('hidden')
  $('#summary p')[0].innerHTML="Select Gaming Platforms";
  $('#js-restart-two').addClass('hidden')
 $( '#js-more-platforms').removeClass('hidden')
//   $('#platforms-list').append(
//       `<h2> platforms </h2>
  
//       <li class='screen-reader'>
//       <label for="playstation5">PS5</label>
//       <input type="checkbox" id="187" name="addPlatform" value="playstation5">
//       </li>
//       <li>
//       <label for="playstation4">PS4</label>
//       <input type="checkbox" id="18" name="addPlatform" value="playstation4">
//       </li>
//       <li>
//       <label for="xbox-one">Xbox One</label>      
//       <input type="checkbox" id="1" name="addPlatform" value="xbox-one">
//       </li>
//       <li>
//       <label for="xbox360">Xbox 360</label>
//       <input type="checkbox"  id="14" name="addPlatform" value="xbox360">
//       </li>
//       <li>
//       <label for="nintendo-switch">Switch</label>
//       <input type="checkbox" id="7" name="addPlatform" value="nintendo-switch">
//       </li>
//       <li>
//       <label for="pc">PC</label>
//       <input type="checkbox" id="4" name="addPlatform" value="pc">
//       </li>
//       <li>
//       <label for="ios">iOS</label>
//       <input type="checkbox" id="3" name="addPlatform" value="ios">
//       </li>
//       <li>
//       <label for="android">Android</label>
//       <input type="checkbox" id="21" name="addPlatform" value="android">
//       </li>
// `
//  )
  $('#platforms-list').append(
      `<h2> platforms </h2>
      <li class='group'>
      <p class='label left'>PS5</p>
      <label class="switch right">
      <input type="checkbox" id="187" name="addPlatform" value="playstation5">
      <span class="slider round"></span>
      </label>
      </li>

    <li class='group'>
    <p class='label left'>PS4</p>
    <label class="switch right">
    <input type="checkbox" id="18" name="addPlatform" value="playstation4">    
    <span class="slider round"></span>
    </label>
    </li>

    <li class='group'>
    <p class='label left'>Xbox One</p>
    <label class="switch right">
    <input type="checkbox" id="1" name="addPlatform" value="xbox-one">
    <span class="slider round"></span>
    </label>
    </li>

  
  <li class='group'>
    <p class='label left'>Xbox Series S/X</p>
    <label class="switch right">
    <input type="checkbox"  id="186" name="addPlatform" value="xbox-series-x">
    <span class="slider round"></span>
    </label>
    </li>

     <li class='group'>
      <p class='label left'>Switch</p>
      <label class="switch right">
      <input type="checkbox" id="7" name="addPlatform" value="nintendo-switch">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>PC</p>
      <label class="switch right">
      <input type="checkbox" id="4" name="addPlatform" value="pc">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>ios</p>
      <label class="switch right">
      <input type="checkbox" id="3" name="addPlatform" value="ios">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Android</p>
      <label class="switch right">
      <input type="checkbox" id="21" name="addPlatform" value="android">
      <span class="slider round"></span>
      </label>
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
  <p class='label left'>${platforms[i].name}</p>
  <label class="switch right">
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


// question first why won't these buttons hide
function displaySelectedOptions(userPlatforms, userGenres){
  $('#summary p')[0].innerHTML="See Results";
  $('#genre').addClass('hidden')
  $('#genre-list').empty()
  // not working?
  $('#platforms').addClass('hidden')
  $('#platforms-list').addClass('hidden')
  $('#js-platforms-form').addClass('hidden')
  $('#platforms-list').empty()
  $('#js-more-platforms').addClass('hidden')
  $('#results').removeClass('hidden')
  $('#js-results-list').removeClass('hidden')
  $('#get-list').removeClass('hidden')
  $('#js-restart-two').removeClass('button')
  $('#jrf-input').removeClass('button')
  $('#jrf-input').addClass('hidden')
// the button class was preventing these 2 buttons from hiding with hidden class, remove and add the button class instead


  if(userGenres.includes(999)){
  $('.selectedResults').append(
`
<h2> No Genres Selected</h2>
<p> This may limit the number of results provided by the search</p>
`
)
  }else{
$('.selectedResults').append(
`
<h2>Selected Genres</h2>
`
)
   for(i=0;i<userGenres.length;i++){
    $('.selectedResults').append(
      `
      <p>${userGenres[i]}</>
      `
    )
  }
}
  if(userPlatforms.length===0){
   $('.selectedResults').append(
`
<h2> No Gaming Platforms Selected</h2>
<p>PlayStation 5, PlayStation 4, Xbox Series S|X, Xbox One and PC games will be included in this search</p>
`
)
   }else{
  $('.selectedResults').append(
`
<h2> Selected Platforms </h2>
`
)
  for(i=0;i<userPlatforms.length;i++){
    $('.selectedResults').append(
      `
      <p>${userPlatforms[i]}</>
      `
    )
   
  }
}
 
  }



  function displayDetailedList(detailedList){  
  $('#search').addClass('hidden')
  $('#platforms').addClass('hidden')
  $('#get-list').addClass('hidden')
  $( '#js-more-platforms').addClass('hidden')
  $('#results').addClass('hidden')
  $('#genre').addClass('hidden')
  $('.carousel-container').removeClass('hidden')
  // $('.js-restart-six').removeClass('hidden')
  $('#summary p')[0].innerHTML="";
  // console.log('before appened detailedList',detailedList, detailedList.length)
  console.log('detailedList',detailedList, detailedList.length)
  console.log('before appened')
  carLoop=detailedList.length-1
  for (let i = 0; i < detailedList.length; i++){
description=detailedList[i].description
sub=description.substring(0, 400)
    // subString=string(0,200)
    if(detailedList[i].website.length>1){
    $('.display-detailed-list').append(

  `
  <li class='hidden'>
  <a href="${detailedList[i].website}" target='blank'>
  <h3>${detailedList[i].name}</h3></a> 
  <img src="${detailedList[i].background_image}" class="results-img">
  <button class="previous"> ◀ </button>
  <button class="next"> ▶ </button>
<div class='sub'>
 <p>${sub} ...</p>
<button class="read-more"> Read On</button>
</div>
  <span class='full hidden'>${description}</p>
  </li>
     `
     )

}else{
    $('.display-detailed-list').append(
`
<li class='hidden'>
<h3>${detailedList[i].name}</h3> 
<img src="${detailedList[i].background_image}" class="results-img">
<div class='sub'>
 <p>${sub} ...</p>
<button class="read-more"> Read On</button>
</div>
 <span class='full hidden'>${description}</span>
</li>
`
     )
}

  }
  // readMore()
  $('.display-detailed-list > li:nth-of-type(1)').removeClass('hidden') 
 }


//question how add labels for screen reader
/* <span class='.screen-reader'>Previous</span> 
<span class='.screen-reader'>Next</span>*/



function navigate(count,prev) {
console.log('count: ', count, 'prev: ',prev)
let finalListItems=$('.display-detailed-list > li')
$(finalListItems[count]).removeClass('hidden') 
$(finalListItems[prev]).addClass('hidden') 

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
  $('#js-restart-two').addClass('hidden')
  $('#js-restart-six').addClass('hidden')
  $('#summary p')[0].innerHTML="Unfortunately this search is not likely to yield many recommendations."; 
  }




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
    $('#genre input').removeClass('hidden')
    $('#summary p').addClass('tagline')
    $('.home').removeClass('hidden')
    $('h1').removeClass('hidden')
    $('#results').addClass('hidden')
    $('#results-list').empty();
   $('#platforms-list').empty();
    $('#genre-list').empty();
    $('.display-detailed-list').empty()
    $('#summary p')[0].innerHTML="Find your next favorite game";
    $('#get-list').addClass('hidden')
    // $('#platforms').addClass('hidden')
    $('#genre').addClass('hidden')
    $('#platforms').addClass('hidden')
    $('#js-more-platforms').addClass('hidden')
    $('#search').removeClass('hidden')
    $('#custom-search').removeClass('hidden')
    $('#js-add-genre').addClass('hidden')
    $('.carousel-container').addClass('hidden')
    $('#js-search-option').val('')
    $(".container").removeClass('transparent')
    $('#js-restart-one').addClass('hidden')
    $('#js-restart-two').addClass('hidden')
    $('#js-restart-three').addClass('hidden')
    $('#js-restart-four').addClass('hidden')
    $('#js-restart-five').addClass('hidden')
    // $('#js-restart-six').addClass('hidden')
    // empty not working as planned Headers, second tiem through games stack under one 
    $('.display-detailed-list').empty()
    $('.selectedResults').empty()
    disableRecsButtons()

  }


