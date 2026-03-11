import api from "../api";

const RiderService = {
    getRidersByRace(raceId) {
        return api.get(`/riders/race/${raceId}`);
    }
};

export default RiderService;