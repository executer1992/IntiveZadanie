export default class MoviesStorage{
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
