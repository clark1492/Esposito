package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.GameLineUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GameLineUpRepository extends JpaRepository<GameLineUp,String> {

  List<GameLineUp> findAll();

  GameLineUp findByGameLineUpId(String gameLineUpId);

  List<GameLineUp> findByGameId(Integer gameId);

  List<GameLineUp> findByClubId(Integer clubId);

  List<GameLineUp> findByPlayerId(Integer playerId);

}
