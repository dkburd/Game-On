
let userTags=[]

function updateTags(userTags){
$('input[name="addTag"]:checked').each(function() {
  userTags.push(this.value)
});
console.log("userTags",userTags)    
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

