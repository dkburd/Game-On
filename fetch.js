// LEGEND
// app.js = ready function and event listeners
// fetch.js = api fetches
// store.js store and edit values etc
// render.js = generate templates
// display.js = display
// style.css=main css
// media.css= @media changes

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
  fetch(`https://api.rawg.io/api/tags?page_size=100&key=${apiKey}`)
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
        userGenres.push(responseJson.genres[i].slug)
      }
     for (let i=0;i<responseJson.tags.length;i++){
       if(responseJson.tags[i].language==='eng'){
        userTags.push(responseJson.tags[i].slug)
       }
      }
// console.log('basegameslug',baseGameSlug, 'baseGameDev', baseGameDev, 'userGenres',userGenres, 'userTags', userTags)
console.log( 'userTags', userTags)

if(responseJson.genres.length===0){
  console.log('reccomend restart here')
   reccomendRestart()
  //  displayBaseGameResults(responseJson)
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
// if(userTags.length===0){
// console.log('no tags, two loop fetch')
// } 
// else{
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<userGenres.length;j++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1960-01-01,${currentDate}&platforms=${userIds[i]}&genres=${userGenres[j]}`)
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
// }
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)

      wait()
})
}


function getTagGames(userTags, userIds, editList) {
console.log('tag games triggered')
let promises=[]
if (userTags.length<2){
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<userTags.length;j++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1960-01-01,${currentDate}&platforms=${userIds[i]}&tags=${userTags[j]}`)
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
}else{
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<userTags.length;j++){
    for(let k=1; k<userTags.length;k++){
        if (userTags[j]===userTags[k]){
        console.log(userTags[j], userTags[k], 'skipped duplicate')
        }else{
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1960-01-01,${currentDate}&platforms=${userIds[i]}&tags=${userTags[j]},${userTags[k]}`)
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
    }
  }
}
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)

      wait()
})
}



function getBothGames(userTags, userIds, userGenres, editList) {
// console.log('to add working on it three layer loop')
let promises=[]
for(let i=0;i<userIds.length;i++){
  for(let j=0;j<userGenres.length;j++){
    for(let k=0; k<userTags.length;k++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1960-01-01,${currentDate}&platforms=${userIds[i]}&genres=${userGenres[j]}&tags=${userTags[k]}`)
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
}
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)
      wait()
})
}




function getPGames(userIds, editList) {
let promises=[]
// if(userIds.length===0){
// console.log('userIds: ', userIds)
// console.log('no platforms selected onto edit')
// wait()
// }else{
for(let i=0;i<userIds.length;i++){
    promises.push(
      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=1960-01-01,${currentDate}&platforms=${userIds[i]}`)
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
// }
    Promise.all(promises).then(function(){
      console.log('after promise all editList: ',editList.length, editList)

      wait()
})
}



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

