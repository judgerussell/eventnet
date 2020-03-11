import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiAccess{

    constructor(){}

    getEvents() {
        const url `${API_URL}/events/`;
        return axios.get(url).then(response => response.data);
    }

    getEvent(pk) {
        const url `${API_URL}/events/${pk}`;
        return axios.get(url).then(response => response.data)
    }

    deleteEvent(event){
        const url = `${API_URL}/api/events/${event.pk}`;
        return axios.delete(url);
    }
    createEvent(event){
        const url = `${API_URL}/api/events/`;
        return axios.post(url,event);
    }
    updateEvent(event){
        const url = `${API_URL}/api/events/${event.pk}`;
        return axios.put(url,event);
    }

    getVenues() {
        const url `${API_URL}/venues/`;
        return axios.get(url).then(response => response.data);
    }

    getVenue(pk) {
        const url `${API_URL}/venues/${pk}`;
        return axios.get(url).then(response => response.data)
    }

    deleteVenue(venue){
        const url = `${API_URL}/api/venues/${venue.pk}`;
        return axios.delete(url);
    }
    createVenue(venue){
        const url = `${API_URL}/api/venues/`;
        return axios.post(url,venue);
    }
    updateVenue(venue){
        const url = `${API_URL}/api/venues/${venue.pk}`;
        return axios.put(url,venue);
    }

    getArtists() {
        const url `${API_URL}/artists/`;
        return axios.get(url).then(response => response.data);
    }

    getArtist(pk) {
        const url `${API_URL}/artists/${pk}`;
        return axios.get(url).then(response => response.data)
    }

    deleteArtist(artist){
        const url = `${API_URL}/api/artists/${artist.pk}`;
        return axios.delete(url);
    }
    createArtist(artist){
        const url = `${API_URL}/api/artists/`;
        return axios.post(url,artist);
    }
    updateArtist(artist){
        const url = `${API_URL}/api/artists/${artist.pk}`;
        return axios.put(url,artist);
    }

    getProfiles() {
        const url `${API_URL}/users/`;
        return axios.get(url).then(response => response.data);
    }

    getProfile(pk) {
        const url `${API_URL}/users/${pk}`;
        return axios.get(url).then(response => response.data)
    }

    deleteProfile(user){
        const url = `${API_URL}/api/users/${user.pk}`;
        return axios.delete(url);
    }
    createProfile(user){
        const url = `${API_URL}/api/users/`;
        return axios.post(url,user);
    }
    updateProfile(user){
        const url = `${API_URL}/api/users/${user.pk}`;
        return axios.put(url,user);
    }
}