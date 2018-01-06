// Deklaracja Zmiennych 
let counterOfMoviesSeen = 0; //Zmienna przechowująca licznik obejrzanych filmów
let counterOfAllMovies = 0;  //Zmienna przechowująca licznik wszystkich filmów 
let output ="";            //Zmienna za pomocą,której wyśtietlamy informacje o filmach     
const moviesSeenDisplay=document.querySelector("#moviesCounterSeen"); 
const moviesAllDisplay=document.querySelector("#moviesCounterAll");
const moviesListDisplay=document.querySelector("#moviesList");
const cloneMoviesData = Object.assign({},moviesData); //Klonowanie tablicy obiektów moviesData

Object.keys(cloneMoviesData).forEach(key => {   //Metoda,która iteruje przez tablice obiektów sklonowaną 
  if(cloneMoviesData[key].seen=="T"){   //Sprawdza czy wartośc atrybutu seen jest równa T
    counterOfMoviesSeen++;              //Jeśli tak -Ikrementacja licznika filmów obejrzanych
    cloneMoviesData[key].seen="\u2714"; //Zmiana wartości atrybutu seen z T na unicode Heavy Checkmark
  }
  else{
    cloneMoviesData[key].seen="\u274C"; //Zmiana wartości atrybutu seen z F na unicode Crossmark
  }
  //"Wyrzucenie" podstawowych informacji o filmach
  output +=`  
  <li class="moviesDisplay">  
    <h2 class="titleDisplay">Title: ${cloneMoviesData[key].title}</h2>  
    <p class="yearDisplay">Year: ${cloneMoviesData[key].year}</p>
    <p class="genreDisplay">Genre: ${cloneMoviesData[key].genre}</p>
    <p class="summaryDisplay">Summary: ${cloneMoviesData[key].summary}</p>
    <button onClick="toggleSeen(${key})" class="seenSymbol" id="symbol${key}">Seen: ${cloneMoviesData[key].seen}</button>
  </li>
  `
  counterOfAllMovies++;  // Ikrementacja licznika wszystkich filmów
});
const toggleSeen=(index) =>{  //Metoda która zmienia symbol po kliknięciu
    let toggler=document.querySelector(`#symbol${index}`)
    let protoCounter=counterOfMoviesSeen; // Pomocnicza zmienna przechowująca licznik objerzanych filmów 
    toggler.innerHTML=cloneMoviesData[index].seen;
    if (toggler.innerHTML=="\u2714"){        //Sprawdza czy zawartość wyświetlana to Heavy Checkmark
        moviesData[index].seen="F";          //Jeśli tak to zmienia wartość atrybutu seen w tablicy moviesData obiektu o indexie[index] z T na F
        cloneMoviesData[index].seen="\u274C";//Zmienia wartośc atrybutu z Heavy Checkmark na Crossmark
        toggler.innerHTML="Seen: \u274C";   //Zmienia wyświetlany symbol z Heavy Checkmark na Crossmark
        protoCounter--; //Dekrementuje licznik pomocniczy obejrzanych filmów 
        moviesSeenDisplay.innerHTML=parseInt(protoCounter,10); //Aktualizuje licznik obejrzanych filmów             
    }
    else{
        moviesData[index].seen="T"; //Zmienia wartość atrybutu seen w tablicy moviesData obiektu o indexie[index] z F na T
        cloneMoviesData[index].seen="\u2714"; //Zmienia wartośc atrybutu z Crossmark na Heavy Checkmark
        toggler.innerHTML="Seen: \u2714";  //Zmienia wyświetlany symbol z Crossmark na Heavy Checkmark
        protoCounter++; //Ikrementuje licznik pomocniczy obejrzanych filmów 
        moviesSeenDisplay.innerHTML=parseInt(protoCounter,10); //Aktualizuje licznik obejrzanych filmów    
    }
  

  counterOfMoviesSeen=protoCounter; //Przypisanie licznikowi wyświetlanych filmów wartości z pomocniczego licznika
  };

moviesAllDisplay.innerHTML=parseInt(counterOfAllMovies,10); //Wyświetlanie licznika wszystkich filmów 
moviesSeenDisplay.innerHTML=parseInt(counterOfMoviesSeen,10);//Wyświetlanie licznika obejrzanych filmów 
moviesListDisplay.innerHTML=output; //Wyświetlanie podstawowych informacji o filmach
