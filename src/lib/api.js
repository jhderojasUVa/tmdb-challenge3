import {Movie} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

/**
 * @todo:
 * call get with the correct url
 * https://api.themoviedb.org/3/movie/popular
 * and return the data
 */
export const getMovies = async()=> {
    const movies = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const {results = []} = movies;

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
        878: 'run'
    }

    if(results.length){
        return results.map((data)=>{
            return new Movie(data, genres);
        });
    }

    return [];
};

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

