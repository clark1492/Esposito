package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.PlayerNotFoundException;

import java.util.List;

public interface PlayerService {
    /**
     * Get all players.
     * @return List of all players.
     */
    List<Player> getAllPlayers();

    /**
     * Get all players with pagination.
     * @param pageSize Number of players per page.
     * @param pageNumber Page number.
     * @return List of all players with pagination.
     */
    List<Player> getAllPlayersWithPagination(Integer pageSize, Integer pageNumber);


    /**
     * Get player by ID.
     * @param playerId ID of the player.
     * @return Player with the given ID.
     */
    Player getPlayerById(Integer playerId) throws PlayerNotFoundException;

    /**
     * Get players by current club ID.
     * @param currentClubId ID of the current club.
     * @return List of players with the given ID.
     */
    List<Player> getPlayerByCurrentClubId(Integer currentClubId);


    /**
     * Create a new player.
     * @param player Player to create.
     * @return Created player.
     */
    Player createPlayer(Player player);

    /**
     * Update a player.
     * @param playerId ID of the player to update.
     * @param player New player data.
     * @return Updated player.
     */
    Player updatePlayer(Integer playerId, Player player) throws PlayerNotFoundException;

    /**
     * Delete a player.
     * @param playerId ID of the player to delete.
     * @return Deleted player.
     */
    Player deletePlayer(Integer playerId) throws PlayerNotFoundException;

    // Search players by name
    /**
     * Search players by name.
     * @param name Name of the player.
     * @param pageSize Number of players per page.
     * @param pageNumber Page number.
     * @return List of players with the given name.
     */
    List<Player> searchPlayersByName(String name, Integer pageSize, Integer pageNumber);

    // Search players by position
    /**
     * Search players by position.
     * @param position Position of the player.
     * @param pageSize Number of players per page.
     * @param pageNumber Page number.
     * @return List of players with the given position.
     */
    List<Player> searchPlayerByPosition(String position, Integer pageSize, Integer pageNumber);


    // Search players by name and position
    /**
     * Search players by name and position.
     * @param name Name of the player.
     * @param position Position of the player.
     * @param pageSize Number of players per page.
     * @param pageNumber Page number.
     * @return List of players with the given name and the given position.
     */
    List<Player> searchPlayersByNamePosition(String name, String position, Integer pageSize, Integer pageNumber);

    /**
     * Search players by playerIds and position.
     * @param playerIds List of playerIds.
     * @param position Position of the player.
     * @param pageSize Number of players per page.
     * @param pageNumber Page number.
     * @return List of players with the given playerIds and the given position.
     */
    List<Player> searchPlayersByPlayerIdsAndPos(List<Integer> playerIds, String position, Integer pageSize, Integer pageNumber);

}
