import api from "../api";

const RosterService = {
    getOrCreateRoster: async (teamId, raceId) => {
        const response = await api.get(`/rosters/userteam/${teamId}/race/${raceId}`);
        return response.data;
    },

    updateRoster: async (rosterId, riderIds) => {
        const response = await api.put(`/rosters/${rosterId}/riders`, riderIds);
        return response.data;
    }
};

export default RosterService;