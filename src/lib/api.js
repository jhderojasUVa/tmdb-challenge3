import {Movie, Serie} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

const genres = {
    28: 'sci-fi',
    878: 'horror',
    53: 'space',
    18: 'crime',
    35: 'humor',
    10751: 'animated',
    12: 'marvel',
    27: 'something',
    37: 'dark',
    878: 'run',
    80: 'something big',
    10759: 'hate',
    10768: 'love'    
}

/**
 * @todo:
 * call get with the correct url
 * https://api.themoviedb.org/3/movie/popular
 * and return the data
 */
export const getMovies = async()=> {
    const movies = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const {results = []} = movies;

    if(results.length){
        return results.map((data)=>{
            return new Movie(data, genres);
        });
    }

    return [];
};

export const getSeries = async() => {
    const series = await get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
    // I hope it has the same model of the movies because I'm lazy to create a new one
    // but no... it's different... ouch! 
    const {results = []} = series;

    if(results.length){
        return results.map((data)=>{
            return new Serie(data, genres);
        });
    }

    return [];
}

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

