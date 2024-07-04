package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {

    List<Competition> findAll();

    Competition findByCompetitionId(String competitionId);
    List<Competition> findByType(String type);

    List<Competition> findBySubType(String subType);

    List<Competition> findByCountryId(Integer countryId);

    List<Competition> findByCountryName(String countryName);

    List<Competition> findByConfederation(String confederation);

}

