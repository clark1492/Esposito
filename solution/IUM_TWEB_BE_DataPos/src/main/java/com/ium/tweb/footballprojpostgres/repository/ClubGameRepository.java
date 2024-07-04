package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.ClubGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClubGameRepository extends JpaRepository<ClubGame, ClubGame.ClubGameId> {

    // Find all club games
    List<ClubGame> findAll();

    // Find club games by game ID
    List<ClubGame> findByIdGameId(Integer gameId);

    // Find club games by game ID and club ID
    ClubGame findByIdGameIdAndIdClubId(Integer gameId, Integer ClubId);

    // Find club games by club ID
    List<ClubGame> findByIdClubId(Integer clubId);

    // Find club games by opponent ID
    List<ClubGame> findByOpponentId(Integer opponentId);

    // Find club games by hosting (home or away)
    List<ClubGame> findByHosting(String hosting);

}
