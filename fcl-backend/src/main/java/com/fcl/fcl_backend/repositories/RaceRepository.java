package com.fcl.fcl_backend.repositories;

import com.fcl.fcl_backend.models.Race;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {

}
