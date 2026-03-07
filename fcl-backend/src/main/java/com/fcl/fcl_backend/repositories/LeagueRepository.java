package com.fcl.fcl_backend.repositories;

import com.fcl.fcl_backend.models.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    Optional<League> findByName(String name); // This method allows us to find a league by its name, which can be useful for checking if a league already exists before creating a new one.
    Optional<League> findByLeagueCode(String leagueCode); // This method allows us to find a league by its unique league code, which can be used when a user wants to join a league using the code.
}
