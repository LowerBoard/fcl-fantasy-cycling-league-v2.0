package com.fcl.fcl_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table (name="user_teams")
public class UserTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String teamName;

    @Column
    private Double totalPoints = 0.0;


    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-team-single") // This annotation is used to manage the bidirectional relationship between UserTeam and User. It prevents infinite recursion during JSON serialization by marking this side of the relationship as the "back" side.)
    private User user;

    @JsonBackReference("league-teams") // This annotation is used to manage the bidirectional relationship between UserTeam and League. It prevents infinite recursion during JSON serialization by marking this side of the relationship as the "back" side.
    @ManyToOne
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    @JsonManagedReference("team-rosters") // This annotation is used to manage the bidirectional relationship between UserTeam and Roster. It prevents infinite recursion during JSON serialization by marking this side of the relationship as the "managed" side.
    @OneToMany(mappedBy = "userTeam", cascade = CascadeType.ALL) // This annotation specifies that when a UserTeam is deleted, all associated Roster entities should also be deleted (cascade = CascadeType.ALL). The mappedBy attribute indicates that the relationship is managed by the userTeam field in the Roster class.
    private List<Roster> rosters;

    public UserTeam() {}

    public UserTeam(String teamName, User user, League league) {
        this.teamName = teamName;
        this.user = user;
        this.league = league;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Double getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Double totalPoints) {
        this.totalPoints = totalPoints;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
