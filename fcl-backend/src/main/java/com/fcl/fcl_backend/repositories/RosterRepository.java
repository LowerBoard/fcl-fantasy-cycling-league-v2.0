package com.fcl.fcl_backend.repositories;

import com.fcl.fcl_backend.models.Roster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RosterRepository extends JpaRepository<Roster, Long> {
    Optional<Roster> findByUserTeamIdAndRaceId(Long userTeamId, Long raceId); //
}