let apiKey='96fd8fa562c547a3925bf94299e36bc0'
let search=$('#js-select-option').val()
let baseGame=[]
let baseGameSlug=''
let baseGameDev=[]
let baseSuggested=[]
let platforms=[]
let userPlatforms=[]
let editList=[]
let detailedList=[]
let listLength=0

// ***STORE VALUES***
function updateSearch(){
search=$('#js-select-option').val();
$( ".results-message").empty();
}

function updatePlatforms(displayOptions){
$('input[name="addPlatform"]:checked').each(function() {
   userPlatforms.push(this.value)
});
   console.log(userPlatforms)

}

function secondUpdatePlatforms(displayMoreOptions){
$('input[name="addPlatform"]:checked').each(function() {
   userPlatforms.push(this.value)
});
}


function editSuggested(){
  let check=userPlatforms
  let temp=editList
  console.log(check)
  console.log('editSuggested Working here editlist NEED KEEP GOING',editList.length,editList)
let filteredList=[];
for(let game of editList){
if(game.rating > 4){
filteredList.push(game)
}
}
listLength=filteredList.length
console.log(filteredList, filteredList.length)
getDetailedSuggested(filteredList)
}


// ***FETCH TO API***
function getPlatforms() {
  fetch(`https://api.rawg.io/api/platforms`)
    .then(response => response.json())
    .then(responseJson => {
    platforms=responseJson.results
    console.log(platforms)
      })
    .catch(error => alert(error,'Something went wrong. Please try again later.'));
}

function startSearch() {
  updateSearch();
  fetch(`https://api.rawg.io/api/games?search=${search}`)
    .then(response => response.json())
    .then(responseJson => {
      displayResults(responseJson)
      })
    .catch(error => alert(error,'Something went wrong. Please try again later.'));
}

function getDevGames(baseGameDev) {
console.log(`${baseGameDev}`, 'before call editlist length is', editList.length)
for(i=0;i<baseGameDev.length;i++)
{
    fetch(`https://api.rawg.io/api/games?developers=${baseGameDev[i]}`)
    .then(response => response.json())
    .then(responseJson => {    
    console.log("from getDevGames", responseJson)
    results=responseJson.results
      for (j=0;j<results.length;j++){
        editList.push(results[j])
      }
  })
  .then(responseJson => { 
    console.log('from getdev games edit list',editList)
    editSuggested();
  })
    .catch(error => alert(error,'Something went wrong. Please try again later.'));

}
}


function getSuggested(baseGameSlug) {
  fetch(`https://api.rawg.io/api/games/${baseGameSlug}/suggested`)
    .then(response => response.json())
    .then(responseJson => {    
    console.log("getSuggested call", responseJson)
    games=responseJson.results
      for (i=0;i<games.length;i++){
        editList.push(games[i])
      }
       })
    .then(responseJson => {
    console.log('from getsuggested edit list',editList.length, editList)
    getDevGames(baseGameDev);
      })
    .catch(error => alert(error,'Something went wrong. Please try again later.'));

}



function getBaseGame(baseGameId) {
  if(typeof(baseGameId)==="string"){
fetch(`https://api.rawg.io/api/games/${baseGameId}`)
    .then(response => response.json())
    .then(responseJson => {    
    console.log("2nd call", responseJson)
    baseGameSlug=responseJson.slug
      for (i=0;i<responseJson.developers.length;i++){
        baseGameDev.push(responseJson.developers[i].slug)
      }
    console.log('basegameslug',baseGameSlug)
    console.log(baseGameDev)
    displayBaseGameResults(responseJson)
    displayOptions()
  })
    .catch(error => alert(error,'Something went wrong. Please try again later.'));
}
}



function getDetailedSuggested(filteredList){
  console.log('getDetailedSuggested Working')
  console.log('filteredList.length', filteredList.length)
    for(let i=0; i<filteredList.length;i++){
      let tempId=filteredList[i].id 
    fetch(`https://api.rawg.io/api/games/${tempId}`)
        .then(response => response.json())
        .then(responseJson => {    
        detailedList.push(responseJson)
      })
        .catch(error => console.log(error,'Something went wrong. Please try again later.'));
    }
    displayDetailedList(detailedList)
}



// ***DISPLAY RESULTS*** 

function displayResults(responseJson) { 
  console.log(responseJson);  
  let results=responseJson.results
  if(results.length===0){
    $('#results-list').empty();
    $('#results p')[0].innerHTML=`${option}`;
    $('#results p')[1].innerHTML=`${responseJson.message}`;
  }else{
    $( '#results input').removeClass('hidden')
    $('#results p')[0].innerHTML="";
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
      <p>Tags: ${tags.join(", ")}</p>
      <input type='radio' name='baseGame' value=${responseJson.results[i].id} required> <label for='baseGame'/> 
     </li> 
     `
      )
    }
  };

}


// function displaySuggested(responseJson){
//   console.log('woooooooo baseSuggested',baseSuggested)
//   let results=responseJson.results
//   $( '#options').addClass('hidden')
//   $( '#more-options').addClass('hidden')
//   $( '#suggested').removeClass('hidden')
//     for (let i = 0; i < results.length; i++){
//       tags = responseJson.results[i].tags.map(g => { return g.name})
//       genres = responseJson.results[i].genres.map(g => { return g.name})
//       $('#results-list').append(
//       `
//       <li id=${results[i].id}>
//       <img src="${results[i].background_image}" class="results-img">
//       <p>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</p> 
//       <p>Rating: ${results[i].rating}</p>    
//       <p>Genres: ${genres.join(", ")}</p> 
//       <p>${results[i].short_description}</p>
//       <input type='radio' name='baseGame' value=${results[i].id} required> <label for='baseGame'/> 
//      </li> 
//      `

// video not working error Cross-Origin Read Blocking (CORB) blocked cross-origin response 

// <video width="320" height="240" controls>
//   <source src="https://www.youtube.com/watch?v=${responseJson.results[i].clip.video}" type="video/mp4">
// </video>
//       )
//     }
// }



function displayBaseGameResults(responseJson) { 
  console.log(responseJson);  
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



function displayOptions(){
  $( '#options').removeClass('hidden')
  $( '#more-options').removeClass('hidden')
  $('#options-list').append(
      `<h2> platforms </h2>
      <li>
      <input type="checkbox" name="addPlatform" value="any">
      <label for="any">Any</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="playstation5">
      <label for="playstation5">PS5</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="playstation4">
      <label for="playstation4">PS4</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="xbox-one">
      <label for="xbox-one">Xbox One</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="xbox360">
      <label for="xbox360">Xbox 360</label>
      </li>
      <li>
      <input type="checkbox"  name="addPlatform" value="nintendo-switch">
      <label for="nintendo-switch">Switch</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="pc">
      <label for="pc">PC</label>
      </li>
      <li>
      <input type="checkbox" name="addPlatform" value="ios">
      <label for="ios">iOS</label>
      </li>
      <li>
      <input type="checkbox"  name="addPlatform" value="android">
      <label for="android">Android</label>
      </li>
`
 )

}


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
<input type='checkbox' name='addPlatform' value='${platforms[i].slug}'>
<label for='${platforms[i].slug}'>${platforms[i].name}</label>
</li>
`)
}
}

  function displayDetailedList(detailedList){
  console.log('detailedList',detailedList, detailedList.length)
  console.log('filteredList',filteredList, filteredList.length)
  $( '#options').addClass('hidden')
  $( '#more-options').addClass('hidden')
  // $( '#suggested').removeClass('hidden')
   console.log('before appened')
   for (let i = 0; i < listLength; i++){
     let results=detailedList
      $('#suggested-list').append(
      `
      <li>
    <p>results[0].name</p>
     </li> 
     `
      )
    }
  }

//  for (let i = 0; i < results.length; i++){
//    }
// from above
//   <img src="${results[i].background_image}" class="results-img">
//       <p>${results[i].short_description}</p>



// function displayDetailedList(detailedList){
//   console.log('woooooooo')
//   let results=detailedList
//   console.log('results',results)
//   $( '#options').addClass('hidden')
//   $( '#more-options').addClass('hidden')
//   $( '#suggested').removeClass('hidden')
// for (let i = 0; i <results.length; i++){
//   console.log('results[i]',results[i])
      // tags = responseJson.results[i].tags.map(g => { return g.name})
      // genres = responseJson.results[i].genres.map(g => { return g.name})
      
    //   $('#suggested-list').append(
    //   `
    //   <li id=${results[i].id}>
    //   <img src="${results[i].background_image}" class="results-img">
    //   <p>${results[i].name} (${results[i].released[0]}${results[i].released[1]}${results[i].released[2]}${results[i].released[3]})</p> 
    //   <p>Rating: ${results[i].rating}</p>    
    //   <p>${results[i].description}</p>
    //   <input type='radio' name='game' value=${list[i].id} required> <label for='game'/> 
    //  </li> 
    //  `
    //  )
    // }
    //   }
    


// genre tags removed <p>Genres: ${genres.join(", ")}</p>*/


//***EVENT LISTENERS*** */

function watchSearchForm() {
  $('#js-select-option-form').submit(event => {
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
    // $( ".results-message").empty();
  });
}

//thisone
function watchOptionsForm(displayOptions) {
  $('#js-options-form').submit(event => {
    event.preventDefault();
    getSuggested(baseGameSlug);
    updatePlatforms(displayOptions);
    secondUpdatePlatforms(displayMoreOptions);
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
    console.log('PROGRESS')
    // add parametres for console and other options to search
    // getOptions()
  });
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  watchSearchForm();
  watchResultsForm(); 
  watchOptionsForm();
  watchMoreOptionsForm();
  watchSuggestedForm();
  getPlatforms();
});



//     .then(response => response.json())
//     .then(responseJson => {
//     let games=responseJson.results
//     console.log('from devGames', games.length)
//     for(i=0;i<games.length;i++){
//     devGames.push(games[i])
//     editList.push(games[i])

    
//     }
//     editSuggested(editList)
//     console.log('from devs new list length', editList.length)
//     console.log('this sb devgames',devGames)
//   })
//     .catch(error => alert(error,'Something went wrong. Please try again later.'));
//   }
