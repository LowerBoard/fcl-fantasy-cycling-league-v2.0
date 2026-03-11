package com.fcl.fcl_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity // tells JPA that this class is an entity and should be mapped to a database table
public class Rider {

    @Id // tells JPA that this field is the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // tells JPA to automatically generate the value of this field using the database's identity column feature
    private Long id;
    private String name;
    private String proTeam;
    private int points;

    @ManyToMany
    @JsonIgnoreProperties("riders") //
    @JoinTable(
            name = "rider_races",
            joinColumns = @JoinColumn(name = "rider_id"),
            inverseJoinColumns = @JoinColumn(name = "race_id")
    )
    private List<Race> races;


    public Rider() {
    }

    public Rider(String name, String proTeam, int points) {
        this.name = name;
        this.proTeam = proTeam;
        this.points = points;
    }

    public List<Race> getRaces() {
        return races;
    }

    public void setRaces(List<Race> races) {
        this.races = races;
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

    public String getProTeam() {
        return proTeam;
    }

    public void setProTeam(String proTeam) {
        this.proTeam = proTeam;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}


