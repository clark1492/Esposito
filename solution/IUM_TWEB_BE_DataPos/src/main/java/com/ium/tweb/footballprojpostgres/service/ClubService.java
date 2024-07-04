package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.ClubNotFoundException;

import java.util.List;

/**
 * Service for Club entity.
 */
public interface ClubService {
    /**
     * Get all clubs.
     * @return List of all clubs.
     */
    List<Club> getAllClubs();

    /**
     * Get club by ID.
     * @param clubId ID of the club.
     * @return Club with the given ID.
     */
    Club getClubById(Integer clubId)  throws ClubNotFoundException;

    /**
     * Get clubs by domestic competition ID.
     * @param domesticCompetitionId ID of the domestic competition.
     * @return List of clubs in the given domestic competition.
     */
    List<Club> getClubsByDomesticCompetitionId(String domesticCompetitionId);

    /**
     * Get all clubs with pagination.
     * @param pageSize Number of clubs per page.
     * @param pageNumber Page number.
     * @return List of clubs in the given page.
     */
    List<Club> getAllClubsWithPagination(Integer pageSize, Integer pageNumber);

    /**
     * Create a new club.
     * @param club Club to create.
     * @return Created club.
     */
    Club createClub(Club club);

    /**
     * Delete club by ID.
     * @param clubId ID of the club.
     * @return Club that was deleted.
     */
    Club deleteClub(Integer clubId) throws ClubNotFoundException;

    /**
     * Update club by ID.
     * @param clubId ID of the club.
     * @param club Club to update.
     * @return Club that was updated.
     */
    Club updateClub(Integer clubId, Club club) throws ClubNotFoundException;

    /**
     * Search clubs by name.
     * @param name Name of the club.
     * @param pageSize Number of clubs per page.
     * @param pageNumber Page number.
     * @return List of clubs with the given name.
     */
    List<Club> searchClubsByName(String name, Integer pageSize, Integer pageNumber);

    /**
     * Search clubs by ClubIds.
     * @param clubIds List of clubIds.
     * @return List of clubs with the given name.
     */
    List<Club> searchClubsByClubIds(List<Integer> clubIds);

}
