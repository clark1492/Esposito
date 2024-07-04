package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {

    // Find all clubs
    List<Club> findAll();

    // Find club by club id
    Club findByClubId(Integer clubId);

    // Find club by club code
    Club findByClubCode(String clubCode);

    // Find clubs by domestic competition ID
    List<Club> findByDomesticCompetitionId(String domesticCompetitionId);

    // Find clubs by squad size greater than
    List<Club> findBySquadSizeGreaterThan(Integer size);

    // Find clubs by average age between
    List<Club> findByAverageAgeBetween(Double minAge, Double maxAge);

    // Find clubs by foreigners percentage greater than
    List<Club> findByForeignersPercentageGreaterThan(Double percentage);

    // Find clubs by national team players greater than
    List<Club> findByNationalTeamPlayersGreaterThan(Integer players);

    // Find clubs by last season
    List<Club> findByLastSeason(Integer lastSeason);

    // Find clubs by coach name exists or not
    List<Club> findByCoachNameNotNull();

    // Find clubs by club code containing a certain string
    List<Club> findByClubCodeContaining(String code);

    List<Club> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Club> findByNameContainingIgnoreCaseOrderByName(String name,Pageable pageable);

    List<Club> findByClubIdIn(List<Integer> clubIds);
}

