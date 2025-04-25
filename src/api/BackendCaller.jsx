import {string} from "prop-types";
import axios from "axios";

const API_URL = 'https://api.sportsee.jperret.dev';

export const getUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return {
            ...response.data.data,
            score: response.data.data.todayScore ? response.data.data.todayScore : response.data.data.score
        };
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        throw new Error("Impossible de récupérer les informations de l'utilisateur.");
    }
};

export const getUserDailyActivity = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/activity`);
        return {
            ...response.data.data,
        };
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        throw new Error("Impossible de récupérer les informations de l'utilisateur.");
    }
};

export const getUserPerformance = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/performance`);
        return {
            ...response.data.data,
        };
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        throw new Error("Impossible de récupérer les informations de l'utilisateur.");
    }
}


export const getUserAverageSessions = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}/average-sessions`);
        return {
            ...response.data.data,
        };
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
        throw new Error("Impossible de récupérer les informations de l'utilisateur.");
    }
}


getUserDetails.propTypes = {
    userId: string.isRequired
}

getUserDailyActivity.propTypes = {
    userId: string.isRequired
}

getUserPerformance.propTypes = {
    userId: string.isRequired
}

getUserAverageSessions.propTypes = {
    userId: string.isRequired
}
