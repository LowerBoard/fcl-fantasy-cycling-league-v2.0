package com.fcl.fcl_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rosters")
public class Roster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "race_id", nullable = false)
    private Race race;

    @JsonBackReference("team-rosters") // This annotation is used to manage the bidirectional relationship between Roster and UserTeam. It prevents infinite recursion during JSON serialization by marking this side of the relationship as the "back" side.)
    @ManyToOne
    @JoinColumn(name = "user_team_id", nullable = false)
    private UserTeam userTeam;

    @ManyToMany
    @JoinTable(
            name = "roster_riders",
            joinColumns = @JoinColumn(name = "roster_id"),
            inverseJoinColumns = @JoinColumn(name = "rider_id")
    )
    private List<Rider> riders;

    public Roster() {}

    public Roster(Race race, UserTeam userTeam) {
        this.race = race;
        this.userTeam = userTeam;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public UserTeam getUserTeam() {
        return userTeam;
    }

    public void setUserTeam(UserTeam userTeam) {
        this.userTeam = userTeam;
    }

    public List<Rider> getRiders() {
        return riders;
    }

    public void setRiders(List<Rider> riders) {
        this.riders = riders;
    }
}
