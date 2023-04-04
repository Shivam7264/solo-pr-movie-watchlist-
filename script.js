
let Arr=[]
//arr is empty 
Arr = JSON.parse(localStorage.getItem("Arr")) || []

//parse(get)

let key=document.getElementById("sech")
let main= document.getElementById("sec")
let btnEl=document.getElementById("bt")
console.log(main)

btnEl.addEventListener("click",async ()=>{
    try{
    const res =await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=825ff9ad&s=${key.value}`)
    const data= await res.json()
    
await getmovie(data)
    }
    catch(err){
        console.log(err)
if(!key.value){
    main.innerHTML=`
    <div class="warn"><p>Please type a movie name in search bar<p></div>
    `
}
else{
    main.innerHTML=`<div class="warn"><p>No movie found </p></div>
    `
}
    }
})

async function getmovie(data){
    let str=''
    for(let mb of data.Search){
      str+=await movie(mb)    
    }
    main.innerHTML=str 
    let watchlist =document.querySelectorAll('.watchlist')
    /*change 
    */
    for(let i=0;i<watchlist.length;i++){
    watchlist[i].addEventListener("click",(e)=>{
        e.preventDefault() 
        if(e.target.id){
            document.getElementById(e.target.id).innerHTML=" ✔️ Added";
            console.log(e.target.id)
            navigateTo(e.target.id)
        }
           
     })
    }

}

function navigateTo(id){
    
    if(!Arr.includes(id)){
       
    Arr.push(id)
    //arr[]

    localStorage.setItem("Arr",JSON.stringify(Arr))
    }
    console.log(Arr)
}
async function movie(mb){
    const res =await fetch(`http://www.omdbapi.com/?apikey=825ff9ad&i=${mb.imdbID}`)
    const info= await res.json()
   return render(info)
}
 function render(movie){
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
            <i id= ${movie.imdbID} class="fa-solid fa-circle-plus "></i>
            watchlist
            </div>
           </div>
        </div>
        <div class="description">
            <p>${movie.Plot}</p>
        </div>
    </div>
</div>
    `
 }


