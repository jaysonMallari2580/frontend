import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class InterestratesService{

    constructor(){}


    getInterestrates() {
        const url = `${API_URL}/api/interestrates/`;
        return axios.get(url).then(response => response.data);
    }
    getInterestratesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getInterestrate(pk) {
        const url = `${API_URL}/api/interestrates/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteInterestrate(interestrate){
        const url = `${API_URL}/api/interestrates/${interestrate.pk}`;
        return axios.delete(url);
    }
    createInterestrate(interestrate){
        const url = `${API_URL}/api/interestrates/`;
        return axios.post(url,interestrate);
    }
    updateInterestrate(interestrate){
        const url = `${API_URL}/api/interestrates/${interestrate.pk}`;
        return axios.put(url,interestrate);
    }
}