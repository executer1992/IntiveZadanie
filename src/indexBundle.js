(function () {
'use strict';

function setCounterOfTo(element,wartosc){
element.innerHTML = wartosc;
}

class MoviesStorage{
    constructor(moviesData){
        if (localStorage.getItem('movies') === null && !Array.isArray(localStorage.getItem('movies') ) ) {
            this._data = [
                {
                    "id": 1,
                    "title": "The Shawshank Redemption",
                    "year": 1994,
                    "genre": "drama",
                    "summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                    "seen": "T"
                },
                {
                    "id": 2,
                    "title": "The Godfather",
                    "year": 1972,
                    "genre": "crime",
                    "summary": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                    "seen": "T"
                },
                {
                    "id": 3,
                    "title": "The Dark Knight",
                    "year": 2008,
                    "genre": "action",
                    "summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                    "seen": "T"
                },
                {
                    "id": 5,
                    "title": "12 Angry Men",
                    "year": 1957,
                    "genre": "drama",
                    "summary": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
                    "seen": "F"
                },
                {
                    "id": 8,
                    "title": "Schindler's List",
                    "year": 1993,
                    "genre": "biography",
                    "summary": "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
                    "seen": "F"
                },
                {
                    "id": 13,
                    "title": "Pulp Fiction",
                    "year": 1994,
                    "genre": "crime",
                    "summary": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                    "seen": "T"
                },
                {
                    "id": 21,
                    "title": "The Good, the Bad and the Ugly",
                    "year": 1966,
                    "genre": "western",
                    "summary": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
                    "seen": "F"
                }
              ]; 
              localStorage.setItem('movies', JSON.stringify(this._data));
        }
        else{
            this._data = localStorage.getItem('movies');
        }            
    }
    
       get allMovies(){
            const allMovies = JSON.parse(localStorage.getItem('movies')) || [];
            return allMovies;
       }
        movieById(Id){        
            const findMovie = JSON.parse(localStorage.getItem('movies')) || [];
            Object.keys(findMovie).forEach(key =>{
               if(findMovie[key].id === Id){
                   return findMovie[key];
               }
           });
       }
       set addMovie(data){
            if (typeof(data !== null) && typeof(data === 'object') ){
               this._data.push(data);
               const oldMovies = JSON.parse(localStorage.getItem('movies')) || [];
               oldMovies.push(data);
               localStorage.setItem('movies', JSON.stringify(oldMovies));
        }
       }
        editMovie(Id, data){  
            const editData = JSON.parse(localStorage.getItem('movies')) || [];    
                Object.keys(editData).forEach(key =>{
                    if(editData[key].id === parseInt(Id.substring(4),10)){
                        editData[key].title = data.title;
                        editData[key].year = data.year;
                        editData[key].genre = data.genre;
                        editData[key].summary = data.summary;
                        localStorage.setItem('movies', JSON.stringify(editData));                       
                        location.reload();
                    }
                    else if(editData[key].id === parseInt(Id.substring(6),10)){
                        editData[key].seen = data.seen;
                        localStorage.setItem('movies', JSON.stringify(editData));
                    }
        });
       }
       remove(Id){
            const removeMovie = JSON.parse(localStorage.getItem('movies')) || [];
                Object.keys(removeMovie).forEach(key => {
                if(removeMovie[key].id == Id){                    
                    removeMovie.splice(key,1);
                    localStorage.setItem('movies', JSON.stringify(removeMovie));  
                    this._data = removeMovie;
                    location.reload();
                              
               
        }           
    });
}
        
}

// Deklaracja Zmiennych 
let counterOfMoviesSeen = 0; 
let counterOfAllMovies = 0;  
let output ="";            //Zmienna za pomocą,której wyśtietlamy informacje o filmach     
const moviesSeenDisplay = document.querySelector("#moviesCounterSeen"); 
const moviesAllDisplay = document.querySelector("#moviesCounterAll");
const moviesListDisplay = document.querySelector("#moviesList");
const moviesLibrary = new MoviesStorage();
const moviesLibraryArray = moviesLibrary.allMovies;
const editObj = {};


Object.keys(moviesLibraryArray).forEach(key => {   //Metoda,która iteruje przez tablice obiektów sklonowaną 
    if(moviesLibraryArray[key].seen == "T"){   
      counterOfMoviesSeen++;             
      moviesLibraryArray[key].symbol = "\u2714"; //Zmiana wartości atrybutu seen z T na unicode Heavy Checkmark
    }
    else{
      moviesLibraryArray[key].symbol = "\u274C"; //Zmiana wartości atrybutu seen z F na unicode Crossmark
    }
    //"Wyrzucenie" podstawowych informacji o filmach
    output +=`  
    <li class="moviesDisplay">  
      <h2 class="titleDisplay">Title: <span contenteditable="true">${moviesLibraryArray[key].title}</span></h2>  
      <p class="yearDisplay">Year: <span contenteditable="true">${moviesLibraryArray[key].year}</span></p>
      <p class="genreDisplay">Genre: <span contenteditable="true">${moviesLibraryArray[key].genre}</span></p>
      <p class="summaryDisplay">Summary: <span contenteditable="true">${moviesLibraryArray[key].summary}</span></p>
      <button class="button-edit" id="Edit${moviesLibraryArray[key].id}">Save your data</button>
      <div class="button-container">
        <button class="button-symbol" id="Symbol${moviesLibraryArray[key].id}">Seen: ${moviesLibraryArray[key].symbol}</button>
        <button class="button-deleteMovie" id="Delete${moviesLibraryArray[key].id}">Remove Movie </button>
      </div>
    </li>
    `;
    counterOfAllMovies++;  
  });

  moviesListDisplay.addEventListener('click', function(e){ //Dodanie metody do rodzica wyświetlanych filmów 
    if(e.target.id.charAt(0) == 'D'){   //Warunek dla przycisku usuwania 
       moviesLibrary.remove(e.target.id.substring(6));  //Substring usuwa z id Symbol i przekazuje samo id jako argument
    }
    if(e.target.id.charAt(0) == "E"){
      const parent = e.target.parentNode;
      editObj.title = parent.children[0].lastElementChild.textContent;
      editObj.year = parent.children[1].lastElementChild.textContent;
      editObj.genre = parent.children[2].lastElementChild.textContent;
      editObj.summary = parent.children[3].lastElementChild.textContent;
      console.log(editObj);
      moviesLibrary.editMovie(e.target.id, editObj);
    }
    else{
        Object.keys(moviesLibraryArray).forEach(key =>{
          let protoCounter=counterOfMoviesSeen;
            if (moviesLibraryArray[key].id == e.target.id.substring(6) && e.target.id.charAt(0) == 'S'){  //Warunek dla przycisku edycji
                if (moviesLibraryArray[key].seen === 'T'){
                    moviesLibraryArray[key].seen = 'F';
                    moviesLibrary.editMovie(e.target.id,moviesLibraryArray[key]);
                    e.target.innerHTML = "Seen: \u274C";
                    protoCounter--;
                    setCounterOfTo(moviesSeenDisplay,protoCounter);               
                     }     
                else {
                    moviesLibraryArray[key].seen = 'T';
                    e.target.innerHTML = "Seen: \u2714";
                    moviesLibrary.editMovie(e.target.id,moviesLibraryArray[key]);
                    protoCounter++;
                    setCounterOfTo(moviesSeenDisplay,protoCounter); 
          }
        }          
                    
                    counterOfMoviesSeen=protoCounter;
    });
  }   
});

setCounterOfTo(moviesAllDisplay,counterOfAllMovies); //Wyświetlanie licznika wszystkich filmów 
setCounterOfTo(moviesSeenDisplay,counterOfMoviesSeen);//Wyświetlanie licznika obejrzanych filmów 
moviesListDisplay.innerHTML=output; //Wyświetlanie podstawowych informacji o filmach

}());
