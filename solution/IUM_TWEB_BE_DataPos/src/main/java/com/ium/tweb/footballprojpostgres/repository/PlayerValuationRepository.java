package com.ium.tweb.footballprojpostgres.repository;

import com.ium.tweb.footballprojpostgres.data.model.PlayerValuation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerValuationRepository extends JpaRepository<PlayerValuation, Long> {


    List<PlayerValuation> findAll();

    List<PlayerValuation> findByIdPlayerId(Integer playerId);

    PlayerValuation findByIdPlayerIdAndIdDate(Integer playerId, LocalDate date);

    List<PlayerValuation> findByCurrentClubId(Integer clubId);


    @Query("SELECT pv, p, c FROM PlayerValuation pv " +
            "JOIN Player p ON pv.id.playerId = p.playerId " +
            "JOIN Club c ON p.currentClubId = c.clubId " +
            "WHERE p.currentClubId = :clubId")
    List<Object[]> findAllValuationsWithPlayerInfoByClubId(@Param("clubId") Integer clubId, Pageable pageable);

    @Query("SELECT pv, p, c FROM PlayerValuation pv " +
            "JOIN Player p ON pv.id.playerId = p.playerId " +
            "JOIN Club c ON p.currentClubId = c.clubId " +
            "WHERE p.playerId = :playerId")
    List<Object[]> findAllValuationsWithPlayerInfoByPlayerId(@Param("playerId") Integer playerId, Pageable pageable);

    @Query("SELECT pv, p, c FROM PlayerValuation pv " +
            "JOIN Player p ON pv.id.playerId = p.playerId " +
            "JOIN Club c ON p.currentClubId = c.clubId " +
            "WHERE p.playerId = :playerId AND pv.id.date BETWEEN :startDate AND :endDate")
    List<Object[]> findAllValuationsWithPlayerInfoByPlayerIdAndDates(@Param("playerId") Integer playerId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, Pageable pageable);

    @Query("SELECT pv, p, c FROM PlayerValuation pv " +
            "JOIN Player p ON pv.id.playerId = p.playerId " +
            "JOIN Club c ON p.currentClubId = c.clubId " +
            "WHERE pv.id.date BETWEEN :startDate AND :endDate " +
            "ORDER BY pv.marketValueInEur DESC")
    List<Object[]> findTopValuationsWithPlayerInfoByDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, Pageable pageable);

}
