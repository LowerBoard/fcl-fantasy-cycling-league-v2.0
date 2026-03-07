package com.fcl.fcl_backend.repositories;

import com.fcl.fcl_backend.models.Roster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RosterRepository extends JpaRepository<Roster, Long> {
     Roster findByLeagueId(Long leagueId); // This method allows us to find a roster by its associated league ID, which can be useful when we want to retrieve the roster for a
}
