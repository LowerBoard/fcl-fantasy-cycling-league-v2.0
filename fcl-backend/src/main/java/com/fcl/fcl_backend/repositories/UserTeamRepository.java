package com.fcl.fcl_backend.repositories;

import com.fcl.fcl_backend.models.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
    List<UserTeam> findByLeagueId(Long leagueId); // This method allows us to find all user teams that belong to a specific league, which is useful for displaying league standings and managing league members.
}
