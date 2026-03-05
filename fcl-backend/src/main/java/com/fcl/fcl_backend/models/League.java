package com.fcl.fcl_backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "leagues")
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String leagueCode; // unique code for joining the league

    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL)
    private List<UserTeam> userTeams;

    public League() {}

    public League(String name, String leagueCode) {
        this.name = name;
        this.leagueCode = leagueCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLeagueCode() {
        return leagueCode;
    }

    public void setLeagueCode(String leagueCode) {
        this.leagueCode = leagueCode;
    }

    public List<UserTeam> getUserTeams() {
        return userTeams;
    }

    public void setUserTeams(List<UserTeam> userTeams) {
        this.userTeams = userTeams;
    }
}
