let arr=[]
arr=JSON.parse(localStorage.getItem("Arr"))

let main1= document.getElementById("sec1")

async function rener(arr){

    main1.innerHTML= await continueTo(arr)

    let watchlist =document.querySelectorAll('.watchlist')
for(let i=0;i<watchlist.length;i++){
            console.log(watchlist[i])
            watchlist[i].addEventListener("click",(e)=>{
            e.preventDefault() 
            if(e.target.id){
                console.log("entered")
                navigateToRemove(e.target.id)
                
            }     
        })
    }
}


rener(arr)



 
async function continueTo(arr){
    
     let str1=''
 if(arr){  
 for(let el of arr){
 console.log(el)
 const res= await fetch(`http://www.omdbapi.com/?apikey=825ff9ad&i=${el}`)
 const info=await res.json()
  str1+=render1(info)
     }
 }
     return str1
 }
 function navigateToRemove(id){
    
arr=arr.filter(function(id1){
       return  id1!=id
    })
    
localStorage.setItem("arr",JSON.stringify(arr))
    
rener(arr)
}
 
function render1(movie){
    return `
    <div class="item">
    <div class="img1"><img id="img1" src="${movie.Poster}" alt="movie image"></div>
    <div class="data">
        <div class="title">${movie.Title}<span id="rating">⭐ ${movie.imdbRating}</span></div>
        <div class="info" >
            <div class="time">${movie.Runtime}</div>
            <div class="theme">${movie.Genre}</div>
            <div class="btn" >
        
            <div class="watchlist" id=${movie.imdbID}>
            <i id=${movie.imdbID} class="fa-solid fa-minus"></i></i>  Remove</div>
           </div>
        </div>
        <div class="description">
            <p>${movie.Plot}</p>
        </div>
    </div>
</div>
    `
}