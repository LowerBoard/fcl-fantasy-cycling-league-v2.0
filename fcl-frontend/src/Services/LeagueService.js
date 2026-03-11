import api from "../api";

const LeagueService = {
    getStandings: async (leagueId) => {
        const response = await api.get(`/leagues/${leagueId}/standings`);
        return response.data;
    }
};

export default LeagueService;