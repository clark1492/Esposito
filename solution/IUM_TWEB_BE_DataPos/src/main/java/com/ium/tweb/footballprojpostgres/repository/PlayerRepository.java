package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.Player;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    List<Player> findAll();
    Player findByPlayerId(Integer playerId);
    List<Player> findByCurrentClubId(Integer currentClubId);
    List<Player> findByPosition(String position,Pageable page);
    List<Player> findByNameContainingIgnoreCaseOrderByName(String name, Pageable pageable);
    List<Player> findByPositionAndNameContainingIgnoreCaseOrderByName(String position, String name, Pageable pageable);

    List<Player> findByPlayerIdIn(List<Integer> playerIds, Pageable pageable);

    List<Player> findByPlayerIdInOrderByName(List<Integer> playerIds, Pageable pageable);

    List<Player> findByPlayerIdInAndPosition(List<Integer> playerIds, String position, Pageable pageable);

    List<Player> findByPlayerIdInAndPositionOrderByName(List<Integer> playerIds, String position, Pageable pageable);

}
