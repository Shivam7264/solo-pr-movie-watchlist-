let arr=[]
arr=JSON.parse(localStorage.getItem("Arr"))
let main1= document.getElementById("sec1")
async function rener(arr){
console.log("rener called")
main1.innerHTML= await continueTo(arr)
}
rener(arr)
//console.log(arr)//null 
async function continueTo(arr){
   // console.log("continue to called")
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
        
            <div  data-watch="watch-${movie.imdbID}">
            <i id=${movie.imdbID} class="fa-solid fa-circle-plus watchlist"></i>Remove</div>
           </div>
        </div>
        <div class="description">
            <p>${movie.Plot}</p>
        </div>
    </div>
</div>
    `
}