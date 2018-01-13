(function () {
'use strict';

function setCounterOfTo(element,wartosc){
element.innerHTML = wartosc;
}

let anotherMoviesCounterSeen = 0;
let anotherMoviesCounterAll = 0;
const anotherMoviesSeenDisplay = document.querySelector("#anotherMoviesCounterSeen");
const anotherMoviesAllDisplay = document.querySelector("#anotherMoviesCounterAll");
const submitForm = document.querySelector("#createData");
const summaryKeyUp = document.querySelector("#summary");
const formMovie = document.querySelector('form');
const localStorageMoviesArray = JSON.parse(localStorage.getItem('movies')) || [];
const movie = {}; //Obiekt do którego wrzucamy nasze dane z formularza

Object.keys(localStorageMoviesArray).forEach(key => {
    if(localStorageMoviesArray[key].seen == "T"){
        anotherMoviesCounterSeen++;
    }
    anotherMoviesCounterAll++;
});

function checkForMovie(newMovie,anotherMoviesCounterSeen){
    const checkYear = /^\d{4}$/; //Proste wyrażenie regularne,które sprawdza czy zaczyna się i kończy na 4 cyfrach
    const localMovies = JSON.parse(localStorage.getItem('movies')) || [];
    //Metoda,która zwraca tablice.Jeśli długośc wynosi 0 to znaczy że tytułu nie ma w bazie
    const checkForTittle = localMovies.filter(name => name.title === newMovie.title);    
        if (newMovie.tittle !== ""){
            if(Number.isInteger(newMovie.year) && checkYear.test(newMovie.year)){
                if(checkForTittle == 0){    
                    if (newMovie.genre !== ""){
                        localMovies.push(newMovie);
                        localStorage.setItem('movies', JSON.stringify(localMovies));
                        anotherMoviesCounterAll++;
                        setCounterOfTo(anotherMoviesAllDisplay,anotherMoviesCounterAll);
                        setCounterOfTo(anotherMoviesSeenDisplay,anotherMoviesCounterSeen);
                        formMovie.reset();
                                }       
                        else{
                            alert("Please enter genre for your movie!");
                            }   
                    }
                    else{
                        alert("Your tittle is already in our database.Please choose another movie!");  
                        }
                }
                else{
                    alert("Please enter 4 digit year!");
                }
        }
        else{
            alert("Please enter tittle for your movie!");
        }
    
}
// Dodanie metody,która powiększa pole textarea żeby widzieć cały tekst
summaryKeyUp.addEventListener('keyup', function(e){
    e.target.style.height = "20px";
    e.target.style.height = (e.target.scrollHeight)+"px";
});
submitForm.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(formMovie);
    movie.title = formData.get('name');
    movie.year = parseInt(formData.get('productionYear'),10);
    movie.genre = formData.get('category');
    movie.summary = formData.get('description');
    movie.seen = formData.get('ifView');
    if(movie.seen == "T"){
        anotherMoviesCounterSeen++;
    }
    movie.id = Math.floor((Math.random() * 999999) + 1);
    checkForMovie(movie,anotherMoviesCounterSeen);
 });


 setCounterOfTo(anotherMoviesAllDisplay,anotherMoviesCounterAll);
 setCounterOfTo(anotherMoviesSeenDisplay,anotherMoviesCounterSeen);

}());
