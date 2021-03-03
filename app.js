let apiKey='96fd8fa562c547a3925bf94299e36bc0'
let search=$('#js-search-option').val()
let baseGame=[]
let baseGameSlug=''
let baseGameDev=[]
let baseGameGenres=[]
let platforms=[]
let userPlatforms=[]
let userIds=[]
let editList=[]
let detailedList=[]
let platformList=[]
let currentDate=''
let filteredList=[]
let uniqueMap={}

//todo priority, remove filteredList variable, fix errors for older platofrms and add more options back in 

// ***STORE VALUES***
function updateSearch(){
search=$('#js-search-option').val();
$( ".results-message").empty();
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
   console.log("userIds",userIds)  
getPlatformGames(baseGameGenres, userIds, editList)
}

function editGameList(editList, baseGameSlug){
console.log('editGameList - editlist: ',editList.length,editList)
  if(userPlatforms.length===0){
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
tempList = tempList.filter(game => {return game.rating > 4.05})
console.log({'tempList':tempList.length, 'filteredList':filteredList.length})
return tempList
wait()
}

async function wait(){
  console.log('wait function working?')
    let list = await editGameList(editList, baseGameSlug)
    console.log({list})
    getDetailedList(list)
}


// console.log('filteredList:', filteredList, 'editList: ',editList)    
// //remove from suggested if it is the base game
//   for(let i=0; i<filteredList.length; i++){
//     if(filteredList[i].slug===baseGameSlug){
//       filteredList.splice([i],1)
//       console.log('removed because match', `${baseGameSlug}`)
//     }
//      if(parseFloat(filteredList[i].rating)<4.25){

//     console.log(filteredList[i].slug,filteredList[i].rating,'REMOVED FOR LOW RATING', typeof(filteredList[i].rating),'filteredList length:', filteredList.length)
//    filteredList.splice([i],1)
//   }
//   }
// replace loops with funciton method



// ***FETCH TO API***
function getPlatforms() {
  fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
    platforms=responseJson.results
    // console.log(platforms)
      })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}

function startSearch() {
  updateSearch();
// tester
  // fetch(`https://api.rawg.io/api/games?key=96fd8fa562c547a3925bf94299e36bc0&dates=1980-01-01,2020-01-01&platforms=7&genres=action`)

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
        baseGameGenres.push(responseJson.genres[i])
      }
    console.log('basegameslug',baseGameSlug, 'baseGameDev', baseGameDev, 'baseGameGenres',baseGameGenres)
    displayBaseGameResults(responseJson)
    displayOptions()
    })
    .then(responseJson => { 
    // getSuggested(baseGameSlug,baseGameId)
    getDevGames(baseGameDev, editList)
    })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'));
}
}
// 

//trouble
function getPlatformGames(baseGameGenres, userIds, editList) {
  let promises=[]
  console.log("userIds",userIds,typeof(userIds))
if(userIds.length===0){
console.log('no platforms selected onto edit')
wait()
}else{
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<baseGameGenres.length;j++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1980-01-01,${currentDate}&platforms=${userIds[i]}&genres=${baseGameGenres[j].slug}`)
      .then(response => response.json())
      .then(responseJson => {   
      results=responseJson.results
      for(i=0;i<results.length;i++){
          if(!uniqueMap[results[i].slug]){
          uniqueMap[results[i].slug] = true;
          editList.push(results[i])
          console.log(results[i])
         }
        }
    })
    .catch(error => console.log(error,'Something went wrong. Please try again later.'))
    )}
}
}
    Promise.all(promises).then(function(){
      console.log('after proise all editList: ',editList.length, editList)

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
    console.log("from getDevGames", responseJson)
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
      })
     .catch(error => console.log(error,'Something went wrong. Please try again later.'));
    }
}

// // ***DISPLAY RESULTS*** 

function displaySearchResults(responseJson) { 
  console.log(responseJson);  
  let results=responseJson.results
  if(results.length===0){
    $('#results-list').empty();
    $('#results p')[0].innerHTML=`${option}`;
    $('#results p')[1].innerHTML=`${responseJson.message}`;
  }else{
    $('#summary p')[0].innerHTML="Select game";
    $('#search').addClass('hidden')
    $( '#js-restart').removeClass('hidden')
    $( '#results input').removeClass('hidden')
    $('#results-list').empty();
    let genres;
    let tags;
    // for (let i = 0; i < results.length; i++){
    //  only show  5 
    for (let i = 0; i < 5; i++){
      tags = results[i].tags.map(g => { return g.name})
      genres = results[i].genres.map(g => { return g.name})
      $('#results-list').append(
      `
      <li id=${results[i].id}>
      <img src="${results[i].background_image}" class="results-img">
      <p>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</p> 
      <p>Rating: ${results[i].rating}</p>    
      <p>Genres: ${genres.join(", ")}</p> 
      <input type='radio' name='baseGame' value=${responseJson.results[i].id} required> <label for='baseGame'/> 
     </li> 
     `
      )
    }
  };

}
// removed tags some are gibberish
// <p>Tags: ${tags.join(", ")}</p>

// video not working error Cross-Origin Read Blocking (CORB) blocked cross-origin response 

// <video width="320" height="240" controls>
//   <source src="https://www.youtube.com/watch?v=${responseJson.results[i].clip.video}" type="video/mp4">
// </video>
//       )
//     }
// }



function displayBaseGameResults(responseJson) {  
  $( '#more-options').addClass('hidden')
  $( '#results input').addClass('hidden')
  $('#results-list').empty();
  $('#results-list').append(
      `
      <li id=${responseJson.id}>
      <img src="${responseJson.background_image}" class="results-img">
      <p>${responseJson.name} (${responseJson.released[0]}${responseJson.released[1]}${responseJson.released[2]}${responseJson.released[3]})</p> 
      <p>Rating: ${responseJson.rating}</p>    
      <p>Genres: ${responseJson.genres[0].name}</p> 
      </li>
`
  )

}

function displaySelectedOptions(userPlatforms){
  $('#summary p')[0].innerHTML="See Results";
  $('#options input').addClass('hidden')
  $('#get-list').removeClass('hidden')
  $('#options-list').empty()
  $('#more-options').addClass('hidden')
  $('#options-list').append(
`
<h2> Selected Platforms </h2>
`
)
  for(i=0;i<userPlatforms.length;i++)
   $('#options-list').append(
      `
      <li>
      <p>${userPlatforms[i]}</>
      </li>
      `
   )
}


// todo:
// add back in any platform with if statements
  //  <li>
  //     <input type="checkbox" id="999" name="addPlatform" value="any">
  //     <label for="any">Any</label>
  //     </li>


function displayOptions(){
  $('#summary p')[0].innerHTML="Select Gaming Platforms";
  $( '#options').removeClass('hidden')
  $('#options input').removeClass('hidden')
  // more options for now older platforms cause errors
 $( '#more-options').removeClass('hidden')
  $('#options-list').append(
      `<h2> platforms </h2>
  
      <li>
      <input type="checkbox" id="187" name="addPlatform" value="playstation5">
      <label for="playstation5">PS5</label>
      </li>
      <li>
      <input type="checkbox" id="18" name="addPlatform" value="playstation4">
      <label for="playstation4">PS4</label>
      </li>
      <li>
      <input type="checkbox" id="1" name="addPlatform" value="xbox-one">
      <label for="xbox-one">Xbox One</label>
      </li>
      <li>
      <input type="checkbox"  id="14" name="addPlatform" value="xbox360">
      <label for="xbox360">Xbox 360</label>
      </li>
      <li>
      <input type="checkbox" id="7" name="addPlatform" value="nintendo-switch">
      <label for="nintendo-switch">Switch</label>
      </li>
      <li>
      <input type="checkbox" id="4" name="addPlatform" value="pc">
      <label for="pc">PC</label>
      </li>
      <li>
      <input type="checkbox" id="3" name="addPlatform" value="ios">
      <label for="ios">iOS</label>
      </li>
      <li>
      <input type="checkbox" id="21" name="addPlatform" value="android">
      <label for="android">Android</label>
      </li>
`
 )

}

// hide more options for now older platforms cause errors
function displayMoreOptions(platforms){
console.log('hello from displayMore')
$( '#more-options').addClass('hidden')
$('#options-list').empty();
$('#options-list').append(
`<h2> platforms </h2>`);
for(i=0;i<platforms.length;i++){
$('#options-list').append(
  `
  <li>
<input type='checkbox' id=${platforms[i].id}' name='addPlatform' value='${platforms[i].slug}'>
<label for='${platforms[i].slug}'>${platforms[i].name}</label>
</li>
`)
}
}

  function displayDetailedList(detailedList){  
  $( '#options').addClass('hidden')
  $('#get-list').addClass('hidden')
  $( '#more-options').addClass('hidden')
  $('#results-list').addClass('hidden')
  $('#js-suggested-form').removeClass('hidden')
  $('#summary p')[0].innerHTML="";
  // console.log('before appened detailedList',detailedList, detailedList.length)
console.log('detailedList',detailedList, detailedList.length)
console.log('before appened')
for (let i = 0; i < detailedList.length; i++){
if(detailedList[i].website.length>1){
  $('#suggested-list').append(
`
<li> 

<a href="${detailedList[i].website}" target='blank'>
${detailedList[i].name}</a> 
<img src="${detailedList[i].background_image}" class="results-img">
<p>${detailedList[i].description}</p>
</li>
     `
     )

}else{
    $('#suggested-list').append(
`
<li> 
<p>${detailedList[i].name}</p> 
<img src="${detailedList[i].background_image}" class="results-img">
<p>${detailedList[i].description}</p>
</li>
     `
     )
}

  }
 }
 
//add date but change format (${detailedList[i].released})
//add a list view for exporting list
//add delete button to remove game from list or just in list view? 
  // <div class="list-item-controls">
  //   <button class="game-remove js-game-remove">
  //       <span class="button-label">remove</span>
  //   </button>
  // </div>


  function restartSearch(){
    console.log('restart search')
    baseGame=[]
    baseGameSlug=''
    baseGameDev=[]
    baseGameGenres=[]
    userPlatforms=[]
    userIds=[]
    editList=[]
    detailedList=[]
    filteredList=[]
    uniqueMap={}
    $('#search').removeClass('hidden')
    $( '#js-restart').addClass('hidden')
    $('#results-list').empty();
    $('#options-list').empty();
    $('#suggested-list').empty();
    $('#summary p')[0].innerHTML="";
    $('#get-list').addClass('hidden')
    $( '#options').addClass('hidden')
    $( '#more-options').addClass('hidden')
    // $('#results-list').addClass('hidden')
    // $('#js-suggested-form').addClass('hidden')

  }


//***EVENT LISTENERS*** */


function watchSearchForm() {
  $('#js-search-form').submit(event => {
    event.preventDefault();
    startSearch();
    $( ".results-message").empty();
  });
}

function watchResultsForm() {
  $('#js-results-form').submit(event => {
    event.preventDefault();
    baseGameId=$('input[name="baseGame"]:checked').val();
    console.log(`basegameId: ${baseGameId}`)
    getBaseGame(baseGameId)
    $( ".results-message").empty();
  });
}

//thisone
function watchOptionsForm(displayOptions) {
  $('#js-options-form').submit(event => {
    event.preventDefault();
    updatePlatforms(userIds, userPlatforms);
    displaySelectedOptions(userPlatforms)
    // console.log('from watchOptionsForm(displayOptions)')
  });
}

function watchMoreOptionsForm() {
  $('#js-more-options-form').submit(event => {
    event.preventDefault();
    displayMoreOptions(platforms)
  });
}



function watchSuggestedForm() {
  $('#js-suggested-form').submit(event => {
    event.preventDefault();
    // console.log('PROGRESS watchSuggestedForm')
    
  });
}


function watchGetListForm() {
  $('#js-get-list-form').submit(event => {
    event.preventDefault();
    // console.log('get recs watchList')
    // setTimeout(delay(),10000)
    displayDetailedList(detailedList)
  });
}

function watchRestart() {
    $('#js-restart').on("click", "input", function (event){
    event.preventDefault();
    restartSearch();
  });
}



$(function() {
  console.log('App loaded! Waiting for submit!');
  watchSearchForm();
  watchResultsForm(); 
  watchOptionsForm();
  watchMoreOptionsForm();
  watchSuggestedForm();
  watchGetListForm();
  getPlatforms();
  updateDate();
  watchRestart()
});


