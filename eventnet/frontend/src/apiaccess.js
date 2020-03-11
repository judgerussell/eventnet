import axios from 'axios';
const API_URL = 'http://localhost:8000/api';

export default class ApiAccess{

    constructor(){}

    getEvents() {
        const url = `${API_URL}/events/`;
        return axios.get(url).then(response => response.data);
    }

    getEvent(id) {
        const url = `${API_URL}/events/${id}`;
        return axios.get(url).then(response => response.data)
    }

    getEventByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    deleteEvent(event){
        const url = `${API_URL}/events/${event.id}`;
        return axios.delete(url);
    }
    createEvent(event){
        const url = `${API_URL}/events/`;
        return axios.post(url,event);
    }
    updateEvent(event){
        const url = `${API_URL}/events/${event.id}`;
        return axios.put(url,event);
    }

    getVenues() {
        const url = `${API_URL}/venues/`;
        return axios.get(url).then(response => response.data);
    }

    getVenue(id) {
        const url = `${API_URL}/venues/${id}`;
        return axios.get(url).then(response => response.data)
    }

    getVenueByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    deleteVenue(venue){
        const url = `${API_URL}/venues/${venue.id}`;
        return axios.delete(url);
    }
    createVenue(venue){
        const url = `${API_URL}/venues/`;
        return axios.post(url,venue);
    }
    updateVenue(venue){
        const url = `${API_URL}/venues/${venue.id}`;
        return axios.put(url,venue);
    }

    getArtists() {
        const url = `${API_URL}/artists/`;
        return axios.get(url).then(response => response.data);
    }

    getArtist(id) {
        const url = `${API_URL}/artists/${id}`;
        return axios.get(url).then(response => response.data)
    }

    getArtistByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    deleteArtist(artist){
        const url = `${API_URL}/artists/${artist.id}`;
        return axios.delete(url);
    }
    createArtist(artist){
        const url = `${API_URL}/artists/`;
        return axios.post(url,artist);
    }
    updateArtist(artist){
        const url = `${API_URL}/artists/${artist.id}`;
        return axios.put(url,artist);
    }

    getProfiles() {
        const url = `${API_URL}/users/`;
        return axios.get(url).then(response => response.data);
    }

    getProfile(id) {
        const url = `${API_URL}/users/${id}`;
        return axios.get(url).then(response => response.data)
    }

    getProfileByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    deleteProfile(user){
        const url = `${API_URL}/users/${user.id}`;
        return axios.delete(url);
    }

    createProfile(user){
        const url = `${API_URL}/users/`;
        return axios.post(url,user);
    }

    updateProfile(user){
        const url = `${API_URL}/users/${user.id}`;
        return axios.put(url,user);
    }
}