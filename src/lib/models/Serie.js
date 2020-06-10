export default class Serie {
    constructor(obj, genres) {
        this._adult = obj.adult || false;
        this._backdrop_path = obj.backdrop_path;
        this._id = obj.id;
        this._original_language = obj.original_language;
        this._overview = obj.overview;
        this._popularity = obj.popularity;
        this._poster_path = obj.poster_path;
        this._release_date = obj.first_air_date;
        this._title = obj.original_name;
        this._video = obj.video || '';
        this._vote_average = obj.vote_average;
        this._vote_count = obj.vote_count;

        // Genre stuff
        this._genres = obj.genre_ids.map((element) => {
            return genres[element] || 'I don\'t know'
        }).join(' | ');
    }

    get adult() {
        return this._adult;
    }

    get background() {
        return this._backdrop_path;
    }

    get genres(){
        return this._genres;
    }

    get id() {
        return this._id;
    }

    get originalLanguage() {
        return this._original_language;
    }

    get overview() {
        return this._overview;
    }

    get popularity() {
        return this._popularity;
    }

    get poster() {
        return this._poster_path;
    }

    get releaseDate() {
        return this._release_date;
    }

    get title() {
        return this._title;
    }

    get type() {
        return this._type;
    }

    get video() {
        return this._video;
    }

    get voteAverage() {
        return this._vote_average;
    }

    get voteCount() {
        return this._vote_count;
    }
}