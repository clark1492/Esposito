package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.Competition;
import com.ium.tweb.footballprojpostgres.exception.CompetitionNotFoundException;

import java.util.List;

public interface CompetitionService {

    /**
     * Get all competitions.
     * @return List of all competitions.
     */
    List<Competition> getAllCompetitions();

    /**
     * Get competition by ID.
     * @param competitionId ID of the competition.
     * @return Competition with the given ID.
     */
    Competition getCompetitionById(String competitionId) throws CompetitionNotFoundException;

    /**
     * Get competitions by type.
     * @param type Type of the competition.
     * @return List of competitions with the given type.
     */
    List<Competition> getCompetitionsByType(String type);

    /**
     * Get competitions by subtype.
     * @param subType Subtype of the competition.
     * @return List of competitions with the given subtype.
     */
    List<Competition> getCompetitionsBySubType(String subType);

    /**
     * Get competitions by country ID.
     * @param countryId ID of the country.
     * @return List of competitions in the given country.
     */
    List<Competition> getCompetitionsByCountryId(Integer countryId);

    /**
     * Get competitions by country name.
     * @param countryName Name of the country.
     * @return List of competitions in the given country.
     */
    List<Competition> getCompetitionsByCountryName(String countryName);

    /**
     * Get competitions by confederation.
     * @param confederation Confederation of the competition.
     * @return List of competitions in the given confederation.
     */
    List<Competition> getCompetitionsByConfederation(String confederation);

    /**
     * Get all competitions with pagination.
     * @param pageSize Number of competitions per page.
     * @param pageNumber Page number.
     * @return List of all competitions with pagination.
     */
    List<Competition> getAllCompetitionsWithPagination(Integer pageSize, Integer pageNumber);

    /**
     * Create a new competition.
     * @param competition Competition to create.
     * @return Created competition.
     */
    Competition createCompetition(Competition competition);

    /**
     * Update competition by ID.
     * @param competitionId ID of the competition.
     * @param competition Competition to update.
     * @return Competition that was updated.
     */
    Competition updateCompetition(String competitionId, Competition competition) throws CompetitionNotFoundException;

    /**
     * Delete competition by ID.
     * @param competitionId ID of the competition.
     * @return Competition that was updated.
     */
    Competition deleteCompetition(String competitionId) throws CompetitionNotFoundException;
}

