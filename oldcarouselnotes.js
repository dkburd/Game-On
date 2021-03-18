

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



         Boolean flag = Character.isDigit(str.charAt(1));
         if(flag) {
            System.out.println("'"+ str.charAt(1)+"' is a number");
         }
         else {
            System.out.println("'"+ str.charAt(1)+"' is nan");
         }


           for (let i = 0; i < detailedList.length; i++){
            console.log(detailedList[i].charAt(1));
         }

           for (let i = 0; i < detailedList.length; i++){
         if(detailedList[i].charAt(1).isDigit) {
            console.log(detailedList[i].charAt(1));
         }
         else {
            console.log("is nan");
         }




         unction navigate(count, finalList) {
console.log('from navigate', 'count', count)
// $('.display-detailed-list > li:nth-of-type(2)').removeClass('hidden') 
// $('.display-detailed-list > li').get($('count')).removeClass('hidden') 
 for (var i = 0; i < finalList.length; i++) {
        if (indexOf(finalList[i]===count){
          finalList[i].removeClass('hidden')
        }
}
}
}

function watchCarousel(count, finalList)   { 
    $('.next').on("click", function (event){
      //replace hard code 1 for count value
    // $('.display-detailed-list > li[count]').removeClass('hidden') 
    // $('.display-detailed-list > li:nth-of-type(1)').addClass('hidden')  
    $(finalList).each(li).addClass('hidden')  
//0 problem 
    count+=1
    navigate(count, finalList) 
   })
 $('.previous').on("click", function (event){
    count+=-1
    navigate(count, finalList) 
   })


  }





// thought i was close
function navigate(count) {
console.log('from navigate', 'count', typeof(count), count)
let finalListItems=$('.display-detailed-list > li')

for (i=0; i>finalListItems.length;i++){
  // if(indexOf($(finalListItems[i]))===count){
if($('.display-detailed-list').indexOf($(finalListItems[i]))===count){
  $(finalListItems[i]).removeClass('hidden') 
  }else{
    // console.log('$(finalListItems[i])', $(finalListItems[i]))
  $(finalListItems[i]).addClass('hidden')  
  }
}
}