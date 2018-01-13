// Deklaracja Zmiennych 
import setCounterOfTo from './movies-counter.js';
import MoviesStorage from './movies-storage.js';

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
    `
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
      console.log(editObj)
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
