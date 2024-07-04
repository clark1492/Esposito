package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.PlayerValuation;
import com.ium.tweb.footballprojpostgres.data.output.PlayerValuationDTO;
import com.ium.tweb.footballprojpostgres.exception.PlayerValuationNotFoundException;
import com.ium.tweb.footballprojpostgres.service.PlayerValuationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/v1/rest/playerValuations")
public class PlayerValuationController {

    private final PlayerValuationService playerValuationService;

    private static final Logger logger = LoggerFactory.getLogger(PlayerValuationController.class);

    public PlayerValuationController(PlayerValuationService playerValuationService) {
        this.playerValuationService = playerValuationService;
    }

    @GetMapping
    public ResponseEntity<List<PlayerValuation>> getAllPlayerValuations() {
        try {
            List<PlayerValuation> playersValuations = playerValuationService.getAllPlayerValuations();
            return ResponseEntity.ok(playersValuations);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get all player valuations but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<PlayerValuation>> getAllPlayerValuationsWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<PlayerValuation> playerValuations = playerValuationService.getAllPlayerValuationsWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(playerValuations);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/player/{playerId}")
    public ResponseEntity<List<PlayerValuation>> getPlayerValuationsByPlayerId(@PathVariable Integer playerId) {
        try {
            List<PlayerValuation> playerValuations = playerValuationService.getPlayerValuationsByPlayerId(playerId);
            return ResponseEntity.ok(playerValuations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/player/{playerId}/date/{date}")
    public ResponseEntity<PlayerValuation> getPlayerValuationsByPlayerId(@PathVariable Integer playerId, @PathVariable LocalDate date){

        try {
            PlayerValuation playerValuation = playerValuationService.getPlayerValuationsByPlayerIdAndDate(playerId, date);
            return ResponseEntity.ok(playerValuation);
        } catch (PlayerValuationNotFoundException e){
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();

        }
    }

    @GetMapping("/info/player/{playerId}")
    public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuationsInfoByPlayerId(@PathVariable Integer playerId,
                                                                                      @RequestParam(required = false, defaultValue = "1950-01-01") LocalDate startDate,
                                                                                      @RequestParam(required = false, defaultValue = "3000-12-12") LocalDate endDate,
                                                                                      @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {

        try {
            List<PlayerValuationDTO> playerValuationDTOS = playerValuationService.getPlayerValuationsAndInfoByPlayerIdAndDates(playerId, startDate, endDate, pageSize, pageNumber);
            return ResponseEntity.ok(playerValuationDTOS);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();

        }
    }

    @DeleteMapping("/player/{playerId}/date/{date}")
    public ResponseEntity<PlayerValuation> deletePlayerValuationsByPlayerId(@PathVariable Integer playerId, @PathVariable LocalDate date){

            try {
                PlayerValuation playerValuation = playerValuationService.deletePlayerValuationsByPlayerIdAndDate(playerId, date);
                return ResponseEntity.ok(playerValuation);
            } catch (PlayerValuationNotFoundException e){
                logger.error(e.getMessage());
                return ResponseEntity.notFound().build();

            }
    }

    @PutMapping("/player/{playerId}/date/{date}")
    public ResponseEntity<PlayerValuation> updatePlayerValuationsByPlayerId(@PathVariable Integer playerId, @PathVariable LocalDate date, @RequestBody PlayerValuation playerValuation){
        try {
            PlayerValuation updatedPlayerValuation = playerValuationService.updatePlayerValuationsByPlayerIdAndDate(playerId, date, playerValuation);
            return ResponseEntity.ok(updatedPlayerValuation);
        } catch (PlayerValuationNotFoundException e){
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();

        }
    }

    @PostMapping
    public ResponseEntity<PlayerValuation> createPlayerValuation(@RequestBody PlayerValuation playerValuation) {
        try {
            return ResponseEntity.ok(playerValuationService.createPlayerValuation(playerValuation));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<PlayerValuation>> getPlayerValuationsByClubId(@PathVariable Integer clubId){

        try {
            List<PlayerValuation> playerValuation = playerValuationService.getPlayerValuationsByClubId(clubId);
            return ResponseEntity.ok(playerValuation);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();

        }
    }

    @GetMapping("info/club/{clubId}")
    public ResponseEntity<List<PlayerValuationDTO>> getPlayerValuationsInfoByClubId(@PathVariable Integer clubId, @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                                   @RequestParam(required = false, defaultValue = "0") Integer pageNumber){

        try {
            List<PlayerValuationDTO> playerValuationDTOS = playerValuationService.getPlayerValuationsAndInfoByClubId(clubId, pageSize, pageNumber);
            return ResponseEntity.ok(playerValuationDTOS);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();

        }
    }

    @GetMapping("info/top/page")
    public ResponseEntity<List<PlayerValuationDTO>> getTopPlayerValuationsInfoByDates(@RequestParam(required = false, defaultValue = "1950-01-01") LocalDate startDate,
                                                                                      @RequestParam(required = false, defaultValue = "3000-12-12") LocalDate endDate,
                                                                                      @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                                      @RequestParam(required = false, defaultValue = "0") Integer pageNumber){

        try {
            List<PlayerValuationDTO> playerValuationDTOS = playerValuationService.getTopValuationsAndInfoByDates(startDate, endDate,pageSize, pageNumber);
            return ResponseEntity.ok(playerValuationDTOS);
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();

        }
    }
}
