package com.ium.tweb.footballprojpostgres.service;

import com.ium.tweb.footballprojpostgres.data.model.ClubGame;
import com.ium.tweb.footballprojpostgres.exception.ClubGameNotFoundException;

import java.util.List;

public interface ClubGameService {

    /**
     * Get all club games.
     * @return List of all club games.
     */
    List<ClubGame> getAllClubGames();
    /**
     * Get all club games.
     * @return List of all club games.
     */
    List<ClubGame> getClubGamesByGameId(Integer gameId);

    /**
     * Get club games by game ID and club ID.
     * @param gameId ID of the game.
     * @param clubId ID of the club.
     * @return List of club games with the given game ID and club ID.
     */
    ClubGame getClubGamesByGameIdAndClubId(Integer gameId, Integer clubId) throws ClubGameNotFoundException;

    /**
     * Delete club games by game ID and club ID.
     * @param gameId ID of the game.
     * @param clubId ID of the club.
     * @return Club game that was deleted.
     */
    ClubGame deleteClubGamesByGameIdAndClubId(Integer gameId, Integer clubId) throws ClubGameNotFoundException;

    /**
     * Update club games by game ID and club ID.
     * @param gameId ID of the game.
     * @param clubId ID of the club.
     * @return Club game that was updated.
     */
    ClubGame updateClubGamesByGameIdAndClubId(Integer gameId, Integer clubId, ClubGame clubGame) throws ClubGameNotFoundException;

    /**
     * Get club games by club ID.
     * @param clubId ID of the club.
     * @return List of club games with the given club ID.
     */
    List<ClubGame> getClubGamesByClubId(Integer clubId);

    /**
     * Get club games by opponent ID.
     * @param opponentId ID of the opponent.
     * @return List of club games with the given opponent ID.
     */
    List<ClubGame> getClubGamesByOpponentId(Integer opponentId);

    /**
     * Get club games by hosting (home or away).
     * @param hosting Hosting (home or away).
     * @return List of club games with the given hosting.
     */
    List<ClubGame> getClubGamesByHosting(String hosting);

    /**
     * Get all club games with pagination.
     * @param pageSize Number of club games per page.
     * @param pageNumber Page number.
     * @return List of club games in the given page.
     */
    List<ClubGame> getAllClubGamesWithPagination(Integer pageSize, Integer pageNumber);

    /**
     * Create a new club game.
     * @param clubGame Club game to create.
     * @return Created club game.
     */
    ClubGame createClubGame(ClubGame clubGame);
}

