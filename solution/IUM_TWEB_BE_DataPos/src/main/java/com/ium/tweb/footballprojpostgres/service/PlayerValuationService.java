package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.PlayerValuation;
import com.ium.tweb.footballprojpostgres.data.output.PlayerValuationDTO;
import com.ium.tweb.footballprojpostgres.exception.PlayerValuationNotFoundException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface PlayerValuationService {
    /**
     * Get all player valuations.
     * @return List of all player valuations.
     */
    List<PlayerValuation> getAllPlayerValuations();

    /**
     * Get player valuation by ID.
     * @param playerId ID of the player.
     * @param date date of the player valuation.
     * @return Player valuation with the given ID and date.
     */
    PlayerValuation getPlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date) throws PlayerValuationNotFoundException;

    /**
     * Delete player valuation by ID.
     * @param playerId ID of the player.
     * @param date date of the player valuation.
     * @return Player valuation that was deleted.
     */
    PlayerValuation deletePlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date) throws PlayerValuationNotFoundException;

    /**
     * Update player valuation by ID.
     * @param playerId ID of the player.
     * @param date date of the player valuation.
     * @return Player valuation that was updated.
     */
    PlayerValuation updatePlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date, PlayerValuation playerValuation) throws PlayerValuationNotFoundException;

    /**
     * Get player valuations by player ID.
     * @param playerId ID of the player.
     * @return List of player valuations with the given ID.
     */
    List<PlayerValuation> getPlayerValuationsByPlayerId(Integer playerId);
    /**
     * Get player valuations by club ID.
     * @param clubId ID of the club.
     * @return List of player valuations with the given Club ID.
     */
    List<PlayerValuation> getPlayerValuationsByClubId(Integer clubId);

    /**
     * Get player valuations and player info (i.e. name) by club ID.
     * @param clubId ID of the club.
     * @return List of player valuations merged with player Info for the given Club ID.
     */
    List<PlayerValuationDTO> getPlayerValuationsAndInfoByClubId(Integer clubId, Integer pageSize, Integer pageNumber);

    List<PlayerValuationDTO> getPlayerValuationsAndInfoByPlayerId(Integer playerId, Integer pageSize, Integer pageNumber);

    List<PlayerValuationDTO> getPlayerValuationsAndInfoByPlayerIdAndDates(Integer playerId, LocalDate startDate, LocalDate endDate, Integer pageSize, Integer pageNumber);

    List<PlayerValuationDTO> getTopValuationsAndInfoByDates(LocalDate startDate, LocalDate endDate, Integer pageSize, Integer pageNumber);

    /**
     * Get all player valuations with pagination.
     * @param pageSize Number of player valuations per page.
     * @param pageNumber Page number.
     * @return List of all player valuations with pagination.
     */
    List<PlayerValuation> getAllPlayerValuationsWithPagination(Integer pageSize, Integer pageNumber);


    /**
     * Create a new player valuation.
     * @param playerValuation Player valuation to create.
     * @return Created player valuation.
     */
    PlayerValuation createPlayerValuation(PlayerValuation playerValuation) throws PlayerValuationNotFoundException;
}

