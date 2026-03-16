import api from "../api";

const StravaService = {
    getRecentActivities() {
        return api.get("strava/recent-activities")
    }
}

export default new StravaService();
