import axios from "axios";

export default class MovieService {
    static async getAll() {
        return await axios.get("http://localhost:8080/api/genre");
    }

    static async getMovieById(id) {
        return await axios.get("http://localhost:8080/api/movie/detail/" + id);
    }

    static async getMoviesByGenre(genre) {
        return await axios.get("http://localhost:8080/api/genre/" + genre);
    }

    static async getLastTwoBigMovies() {
        return await axios.get("http://localhost:8080/api/lasttwo");
    }
}