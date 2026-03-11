import api from "../api";

const LeagueService = {
    getStandings: async (leagueId) => {
        const response = await api.get(`/league/${leagueId}/standings`);
        return response.data;
    }
};

export default LeagueService;