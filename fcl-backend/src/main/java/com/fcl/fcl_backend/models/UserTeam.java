package com.fcl.fcl_backend.models;

import jakarta.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserTeam() {}

    public UserTeam(String teamName, User user) {
        this.teamName = teamName;
        this.user = user;
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
