// LEGEND
// app.js = ready function and event listeners
// fetch.js = api fetches
// store.js store and edit values etc
// render.js = generate templates
// display.js = display
// style.css=main css
// media.css= @media changes




// // ***DISPLAY RESULTS*** 


function displaySearchResults(responseJson) { 
  enabeStartButtons()
  $('#custom-search').addClass('hidden')
  $('#search').addClass('hidden')
  $('#summary').addClass('hidden')
  $(".container").addClass('transparent')
  // $('#js-restart-six').addClass('hidden')
  console.log(responseJson);  
  let results=responseJson.results
  if(results.length===0){  
  failList()
  // console.log('fail list')
  }else{
    // for (let i = 0; i < results.length; i++){
    // idList.push(results[i].id)
    // }
    $('#results-list').append(
      `
    <li class='card'>
    <h2> Select One Game</h2>
    </li> 
     `
      )
    $('#search').addClass('hidden')
    $('#results').removeClass('hidden')


    // $('#results input').removeClass('hidden')
    let genres;
    let tags;

    // for (let i = 0; i < results.length; i++){
    //  only show  10 
    for (let i = 0; i < 10; i++){

      tags = results[i].tags.map(t => { return t.name})
      genres = results[i].genres.map(g => { return g.name})
      
      
// question how to splice out non english tags

      $('#results-list').append(
      `
      <li class='results-list-item screen-reader'>
      <h3 class='screen-reader'>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</h3> 
      <p class='screen-reader'>Rating: ${results[i].rating}</p>    
      <p class='screen-reader'>Genres: ${genres.join(", ")}</p> 
      <pclass='screen-reader'>Tags: ${tags.join(", ")}</p> 
      <input type='radio' class='radio screen-reader' name='baseGame' value='${responseJson.results[i].id}' required>
     </li> 
     `
      )
      $('#results-list').append(
      `
      <li class='results-list-item card grow v-center' aria-hidden='true'>
      <img src="${results[i].background_image}" class='search-img'>
      <h3>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</h3> 
      <div class='solid js-solid'>
      <p>Rating: ${results[i].rating}</p>    
      <p>Genres: ${genres.join(", ")}</p> 
      <p>Tags: ${tags.join(", ")}</p> 
      </div>
      <input type='radio' class='hidden radio' name='baseGame' value='${responseJson.results[i].id}' required>
     </li> 
     `
      )

    }

  $('#results-list').append(
    `
     <li class='card v-center'>
      <div class='button-bar'>
      <input type='submit' class='button' value='Submit'></input>
      <button class='js-restart button'>New Search</button>
      </div>
    </li> 
   `
      )


  };
$(window).scrollTop(0)
gameSelect()
}
// alt image tag for these/ screen rader? 
  // <img src="${results[i].background_image}" class="results-img">


function displayBaseGameResults(responseJson) {  
  console.log('here is displayBaseGameResults(responseJson)')
  $('.selected-list').append(
      `
      <li>
      <h2>Selected Game</h2>
      <p>${responseJson.name} (${responseJson.released[0]}${responseJson.released[1]}${responseJson.released[2]}${responseJson.released[3]})</p> 
      <li id=${responseJson.id}>
      <img src="${responseJson.background_image}" class="results-img">
      </li>
`
  )
  $(window).scrollTop(0)
}



function displayGenresOptions(genres){
console.log('sup')
$('#search').addClass('hidden')
$('.alert').addClass('hidden')
$('.fail').addClass('hidden')
$('.warn').addClass('hidden')
$('#summary').addClass('hidden')
$('#js-add-genres').addClass('hidden')
$('#genres').removeClass('hidden')
$(".container").addClass('transparent')
$('#genres-list').append(
`<h2> Select Game Genres </h2>
<p class='hide'>Genres are broad categories to seperate games by content and theme </p>
`);
for(i=0;i<genres.length;i++){

// question c screen readers and access using p instead of label
// for screen readers
// $('#genres-list').append(
//   `
//   <li>
//   <label for='${genres[i].slug}'>${genres[i].name}</label>
//   <input type='checkbox' id=${genres[i].id}' name='addGenre' value='${genres[i].slug}'>

// </li>
// `)
$('#genres-list').append(
  `
  <li class='group'>
  <p class='label left'>${genres[i].slug}</p>
  <label class="switch right">
  <input type='checkbox' id=${genres[i].id}' name='addGenres' value='${genres[i].slug}'>
      <span class="slider round"></span>
      </label>
</li>
`)
}
$(window).scrollTop(0)

}



function displayTagOptions(){
  $('.alert').addClass('hidden')
  $('#genres').addClass('hidden')
  $('#results').addClass('hidden')
  $('#js-more-platforms').removeClass('hidden')
  $('#tags-list').empty();
  $('#tags').removeClass('hidden')
  $('#tags-list').append(
      `<h2>Select Game Tags</h2>
      <p class='hide'>Tags are sub-genres that specify a search</p>

      <li class='group'>
      <p class='label left'>2D</p>
      <label class="switch right">
      <input type="checkbox" id="2d" name="addTag" value="2d">
      <span class="slider round"></span>
      </label>
      </li>     
      
      <li class='group'>
      <p class='label left'>Battle Royale</p>
      <label class="switch right">
      <input type="checkbox" id="battle-royale-2" name="addTag" value="battle-royale-2">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Classic</p>
      <label class="switch right">
      <input type="checkbox" id="classic" name="addTag" value="classic">
      <span class="slider round"></span>
      </label>
      </li>


      <li class='group'>
      <p class='label left'>Comedy</p>
      <label class="switch right">
      <input type="checkbox" id="comedy" name="addTag" value="comedy">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Cross-Platform Multiplayer</p>
      <label class="switch right">
      <input type="checkbox" id="cross-platform-multiplayer" name="addTag" value="cross-platform-multiplayer">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Exclusive</p>
      <label class="switch right">
      <input type="checkbox" id="exclusive" name="addTag" value="exclusive">
      <span class="slider round"></span>
      </label>
      </li>


      <li class='group'>
      <p class='label left'>Exploration</p>
      <label class="switch right">
      <input type="checkbox" id="exploration" name="addTag" value="exploration">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Female Protagonist</p>
      <label class="switch right">
      <input type="checkbox" id="female-protagonist" name="addTag" value="female-protagonist">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>First Person</p>
      <label class="switch right">
      <input type="checkbox" id="first-person" name="addTag" value="first-person">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Great Soundtrack</p>
      <label class="switch right">
      <input type="checkbox" id="great-soundtrack" name="addTag" value="great-soundtrack">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Historic</p>
      <label class="switch right">
      <input type="checkbox" id="historic" name="addTag" value="historic">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Horror</p>
      <label class="switch right">
      <input type="checkbox" id="horror" name="addTag" value="horror">
      <span class="slider round"></span>
      </label>
      </li>


      <li class='group'>
      <p class='label left'>LGBTQ+</p>
      <label class="switch right">
      <input type="checkbox" id="lgbtq-2" name="addTag" value="lgbtq-2">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Multiplayer</p>
      <label class="switch right">
      <input type="checkbox" id="multiplayer" name="addTag" value="multiplayer">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Online Co-op</p>
      <label class="switch right">
      <input type="checkbox" id="online-co-op" name="addTag" value="online-co-op">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Sandbox</p>
      <label class="switch right">
      <input type="checkbox" id="sandbox" name="addTag" value="sandbox">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Sci-Fi</p>
      <label class="switch right">
      <input type="checkbox" id="sci-fi" name="addTag" value="sci-fi">
      <span class="slider round"></span>
      </label>
      </li>      

      <li class='group'>
      <p class='label left'>Singleplayer</p>
      <label class="switch right">
      <input type="checkbox" id="singleplayer" name="addTag" value="singleplayer">
      <span class="slider round"></span>
      </label>
      </li>  


      <li class='group'>
      <p class='label left'>Stealth</p>
      <label class="switch right">
      <input type="checkbox" id="stealth" name="addTag" value="stealth">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Survival</p>
      <label class="switch right">
      <input type="checkbox" id="survival" name="addTag" value="survival">
      <span class="slider round"></span>
      </label>
      </li>

      <li class='group'>
      <p class='label left'>Third Person</p>
      <label class="switch right">
      <input type="checkbox" id="third-person" name="addTag" value="third-person">
      <span class="slider round"></span>
      </label>
      </li>
`
 )
$(window).scrollTop(0)
}



function displayPlatformOptions(){
  $('.alert').addClass('hidden')
  $('#tags').addClass('hidden')
  $('#genres').addClass('hidden')
  $('#results').addClass('hidden')
  $('#platforms').removeClass('hidden')
  $('#platforms-list').removeClass('hidden')
  $('#js-more-platforms').removeClass('hidden')
//   $('#platforms-list').append(
//       `<h2>Select Gaming Platforms</h2>
  
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
      `<h2>Select Gaming Platforms</h2>
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
$(window).scrollTop(0)
}



function displayMoreOptions(platforms){
// platforms.sort()
// todo replace this with a filter
let oldPlatforms=platforms
let currentGen=['playstation5','playstation4','xbox-one','xbox-series-x', 'nintendo-switch', 'pc', 'ios', 'android']
console.log(oldPlatforms)
  // todo replace this with a filter
  for(i=0; i< currentGen.length;i++){
    for(j=0; j<=8;j++){
      if(oldPlatforms[i].slug==currentGen[j]){
        oldPlatforms.splice(i, 1)
      }
    }
  }
  console.log(oldPlatforms)
// no idea why ps5 is still being included in oldgens


$('#js-more-platforms').addClass('hidden')
for(i=0;i<oldPlatforms.length;i++){
  if(oldPlatforms[i].id!==187){

$('#platforms-list').append(
  `
  <li class='group'>
  <p class='label left'>${oldPlatforms[i].name}</p>
  <label class="switch right">
  <input type='checkbox' id='${oldPlatforms[i].id}' name='addPlatform' value='${oldPlatforms[i].slug}'>
  <span class="slider round"></span>
  </label>
  </li>
  
`)
}
$(window).scrollTop(0)
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
  console.log('here is displaySelectedOptions(userPlatforms, userGenres)')
  $('#genres').addClass('hidden')
  $('#platforms').addClass('hidden')
  $('#js-more-platforms').addClass('hidden')
  $('#get-list').removeClass('hidden')
  $('#platforms').addClass('hidden')
// $('#results').addClass('hidden')
// if(baseGameSlug.length>0){
// $('#results-list').removeClass('hidden')
// $('#results').removeClass('hidden')
// }

  if(userGenres.includes(999)){
  $('.selected-list').append(
`
<li>
<h2> No Genres Selected</h2>
<p> This may limit the number of results provided by the search</p>
</li>
`
)
  }else{
$('.selected-list').append(
`
<h2>Selected Genres</h2>
`
)
   for(i=0;i<userGenres.length;i++){
    $('.selected-list').append(
      `
      <p>${userGenres[i]}</>
      `
    )
  }
}
if(userTags.length>0){
  $('.selected-list').append(
   `
   <h2>Selected Tags</h2>
   `
  )
  for(i=0;i<userTags.length;i++){
    $('.selected-list').append(
      `
      <p>${userTags[i]}</>
      `
    )
  }
}
  if(userPlatforms.length===0){
   $('.selected-list').append(
`

<h2> No Gaming Platforms Selected</h2>
<p>PlayStation 5, PlayStation 4, Xbox Series S|X, Xbox One and PC games will be included in this search</p>

`
)
   }else{
  $('.selected-list').append(
`

<h2> Selected Platforms </h2>

`
)
  for(i=0;i<userPlatforms.length;i++){
    $('.selected-list').append(
      `

      <p>${userPlatforms[i]}</>

      `
    )
   
  }
}
 $(window).scrollTop(0)
  }

// todo
// use tis to add in list of alt names? useful?
//         genres = results[i].genres.map(g => { return g.name})
//       <p>Genres: ${genres.join(", ")}</p> 


  function displayDetailedList(detailedList){  
  $('#search').addClass('hidden')
  $('#platforms').addClass('hidden')
  $('#get-list').addClass('hidden')
  $( '#js-more-platforms').addClass('hidden')
  $('#results').addClass('hidden')
  $('#genres').addClass('hidden')
  $('.carousel-container').removeClass('hidden')
  // $('.js-restart-six').removeClass('hidden')
  // console.log('before appened detailedList',detailedList, detailedList.length)
  console.log('detailedList',detailedList, detailedList.length)
  console.log('before appened')
  
if(detailedList.length<20){
  showLength=detailedList.length
}else{
  showLength=20
}
carLoop=showLength-1
for (let i = 0; i < showLength; i++){
    $('.indicators').append(
      `
        <button class='dots'></button>
      `
    )
  platforms = detailedList[i].platforms.map(g => { return g.name})  
    if(detailedList[i].website.length>1){
    $('.display-detailed-list').append(
  `
  <li class='hidden'>
    <div class='link'>
     <a href="${detailedList[i].website}" target='blank'>
      <h2>${detailedList[i].name}</h2>
     </a> 
     <p class='hide'>Visit: ${detailedList[i].website}</p>
    </div>
    <img src="${detailedList[i].background_image}" class="results-img">
    <div class='solid'>

    <p class='full'>${detailedList[i].description}</p>
  </div>
  </li>
     `
     )              
}else{
    $('.display-detailed-list').append(
`
<li class='hidden'>
<h2>${detailedList[i].name}</h2> 
<img src="${detailedList[i].background_image}" class="results-img">
<div class='solid'>
 <p class='full'>${detailedList[i].description}</p>
 </div>
</li>
`
     )
}
  }
  
  // readMore()
  watchDots()
  let first=$('.display-detailed-list > li:nth-of-type(1)')
  $(first).removeClass('hidden') 
  // trying to target them if they are inside the li
  // $(first).find('.dots > button:nth-of-type(1)').addClass('blue')
  // works ok just replaced with first var
  // $('.display-detailed-list > li:nth-of-type(1)').removeClass('hidden') 
  // works within ul 
  // $('.indicators > button:nth-of-type(1)').addClass('blue')

  // when other buttons in div but not working
  // $('.indicators > .dots button:nth-of-type(1)').addClass('blue')
  $(window).scrollTop(0)
 }




function navigate(count,prev) {
console.log('count: ', count, 'prev: ',prev)
let finalListItems=$('.display-detailed-list > li')
let editDots=$('.dots').map(function(){
  return this
})
$(finalListItems[count]).removeClass('hidden') 
$(editDots[count]).addClass('blue')
// need to get the dots in as tehir own item like final list item
 $(editDots[prev]).removeClass('blue')
$(finalListItems[prev]).addClass('hidden') 
}

function failList(){
  console.log('list failed')
  $('#platforms-list').addClass('hidden')
  $('#get-list').addClass('hidden')
  $('.alert').removeClass('hidden')
  $('.warn').addClass('hidden')
  $('.fail').removeClass('hidden')
  $(window).scrollTop(0)
  // displayGenreOptions(genres)
      }



function reccomendRestart(){
console.log('hello line 427')
$('.alert').removeClass('hidden')
$('.warn').removeClass('hidden')
$('#results').addClass('hidden')
$(window).scrollTop(0)
  }




  function restartSearch(){
    console.log('restart search')
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
    $('#platforms').addClass('hidden')
    $('#js-more-platforms').addClass('hidden')
    $('#search').removeClass('hidden')
    $('#custom-search').removeClass('hidden')
    $('#js-add-genres').addClass('hidden')
    $('.carousel-container').addClass('hidden')
    $('#js-search-option').val('')
    $(".container").removeClass('transparent')
    $('.display-detailed-list').empty()
    $('.selectedResults').empty()
    disableRecsButtons()
    enabeStartButtons()

  }


