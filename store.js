// app.js = function and event listeners
//fetch.js = api fetches
//display.js = render/display 
//misc.js store and edit values etc

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
let count = 0;
let carLoop=0;
let prev=0
let subString=''

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
      userIds.push('18','187','1','4','186')
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