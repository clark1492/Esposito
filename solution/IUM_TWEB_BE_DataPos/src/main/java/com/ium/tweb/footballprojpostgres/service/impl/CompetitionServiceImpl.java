package com.ium.tweb.footballprojpostgres.service.impl;

import com.ium.tweb.footballprojpostgres.data.model.Competition;
import com.ium.tweb.footballprojpostgres.exception.CompetitionNotFoundException;
import com.ium.tweb.footballprojpostgres.repository.CompetitionRepository;
import com.ium.tweb.footballprojpostgres.service.CompetitionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CompetitionServiceImpl implements CompetitionService {
    private static final Logger logger = LoggerFactory.getLogger(PlayerServiceImpl.class);

    private final CompetitionRepository competitionRepository;

    public CompetitionServiceImpl(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    @Override
    public List<Competition> getAllCompetitions() {

        return competitionRepository.findAll();
    }

    @Override
    public Competition getCompetitionById(String competitionId) throws CompetitionNotFoundException {
        Competition competition = competitionRepository.findByCompetitionId(competitionId);
        if (competition == null) {
            String error = String.format("Competition with ID %s not found", competitionId);
            logger.error(error);
            throw new CompetitionNotFoundException(error);
        }
        else {
            return competition;
        }
    }

    @Override
    public List<Competition> getCompetitionsByType(String type) {
        return competitionRepository.findByType(type);
    }

    @Override
    public List<Competition> getCompetitionsBySubType(String subType) {
        return competitionRepository.findBySubType(subType);
    }

    @Override
    public List<Competition> getCompetitionsByCountryId(Integer countryId) {
        return competitionRepository.findByCountryId(countryId);
    }

    @Override
    public List<Competition> getCompetitionsByCountryName(String countryName) {
        return competitionRepository.findByCountryName(countryName);
    }

    @Override
    public List<Competition> getCompetitionsByConfederation(String confederation) {
        return competitionRepository.findByConfederation(confederation);
    }

    @Override
    public List<Competition> getAllCompetitionsWithPagination(Integer pageSize, Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return competitionRepository.findAll(pageable).getContent();
    }

    @Override
    public Competition createCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    /*
    public class Competition {

    @Id
    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "competition_code", nullable = false)
    private String competitionCode;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sub_type", nullable = false)
    private String subType;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "country_id", nullable = false)
    private Integer countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "domestic_league_code")
    private String domesticLeagueCode;

    @Column(name = "confederation", nullable = false)
    private String confederation;

    @Column(name = "url", nullable = false)
    private String url;
     */

    @Override
    public Competition updateCompetition(String competitionId, Competition competition) throws CompetitionNotFoundException {
        Competition oldCompetition = getCompetitionById(competitionId);
        if (oldCompetition == null) {
            throw new CompetitionNotFoundException("Competition not found");
        }
        oldCompetition.setCompetitionId(competition.getCompetitionId());
        oldCompetition.setCompetitionCode(competition.getCompetitionCode());
        oldCompetition.setName(competition.getName());
        oldCompetition.setCountryId(competition.getCountryId());
        oldCompetition.setCountryName(competition.getCountryName());
        oldCompetition.setConfederation(competition.getConfederation());
        oldCompetition.setSubType(competition.getSubType());
        oldCompetition.setType(competition.getType());
        oldCompetition.setDomesticLeagueCode(competition.getDomesticLeagueCode());
        oldCompetition.setUrl(competition.getUrl());
        competitionRepository.save(competition);
        return competition;
    }

    @Override
    public Competition deleteCompetition(String competitionId) throws CompetitionNotFoundException {
        Competition competition = getCompetitionById(competitionId);
        if (competition == null) {
            throw new CompetitionNotFoundException("Competition not found");
        }
        competitionRepository.delete(competition);
        return competition;
    }

}