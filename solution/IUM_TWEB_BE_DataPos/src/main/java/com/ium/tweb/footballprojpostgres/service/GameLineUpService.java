package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.GameLineUp;
import com.ium.tweb.footballprojpostgres.exception.GameLineUpNotFoundException;

import java.util.List;

public interface GameLineUpService {
  /**
   * Get all game lineups.
   * @return List of all game lineups.
   */
  List<GameLineUp> getAllGameLineUps();

  /**
   * Get game lineups by ID.
   * @param gameLineUpId ID of the game lineups.
   * @return Game lineups with the given ID.
   */
  GameLineUp getGameLineUpById(String gameLineUpId) throws GameLineUpNotFoundException;

  /**
   * Get game lineup by game ID.
   * @param gameId ID of the game.
   * @return List of game lineups with the given game.
   */
  List<GameLineUp> getGameLineUpByGameId(Integer gameId);

  /**
   * Get game lineup by club ID.
   * @param clubId ID of the club.
   * @return List of game lineups with the given club.
   */
  List<GameLineUp> getGameLineUpByClubId(Integer clubId);

  /**
   * Get game lineups by player ID.
   * @param playerId ID of the player.
   * @return List of game lineups with the given player.
   */
  List<GameLineUp> getGameLineUpByPlayerId(Integer playerId);

    List<GameLineUp> getAllGameLineUpsWithPagination(Integer pageSize, Integer pageNumber);

    /**
     * Create a new game lineup.
     * @param gameLineUp Game lineup to create.
     * @return Created game lineup.
     */
    GameLineUp createGameLineUp(GameLineUp gameLineUp);

    /**
     * Update a game lineup.
     * @param gameLineUpId ID of the game lineup to update.
     * @param gameLineUp New game lineup data.
     * @return Updated game lineup.
     */
    GameLineUp updateGameLineUp(String gameLineUpId, GameLineUp gameLineUp) throws GameLineUpNotFoundException;

    /**
     * Delete a game lineup.
     * @param gameLineUpId ID of the game lineup to delete.
     * @return Deleted game lineup.
     */
    GameLineUp deleteGameLineUp(String gameLineUpId) throws GameLineUpNotFoundException;
}
