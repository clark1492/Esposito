package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.GameLineUp;
import com.ium.tweb.footballprojpostgres.exception.GameLineUpNotFoundException;
import com.ium.tweb.footballprojpostgres.service.GameLineUpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/rest/gameLineUps")
public class GameLineUpController {
  private static final Logger logger = LoggerFactory.getLogger(GameLineUpController.class);

  private final GameLineUpService gameLineUpService;

  public GameLineUpController(GameLineUpService gameLineUpService) {
    this.gameLineUpService = gameLineUpService;
  }

  @GetMapping
  public ResponseEntity<List<GameLineUp>> getAllGameLineUps(){
    try {
      return ResponseEntity.ok(gameLineUpService.getAllGameLineUps());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }

    // Get all game lineups but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<GameLineUp>> getAllGameLineUpsWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<GameLineUp> gameLineUps = gameLineUpService.getAllGameLineUpsWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(gameLineUps);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<GameLineUp> createGameLineUp(@RequestBody GameLineUp gameLineUp) {
        try {
            return ResponseEntity.ok(gameLineUpService.createGameLineUp(gameLineUp));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{gameLineUpId}")
    public ResponseEntity<GameLineUp> updateGameLineUp(@PathVariable String gameLineUpId, @RequestBody GameLineUp gameLineUp) {
        try {
            return ResponseEntity.ok(gameLineUpService.updateGameLineUp(gameLineUpId, gameLineUp));
        } catch (GameLineUpNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{gameLineUpId}")
    public ResponseEntity<GameLineUp> deleteGameLineUp(@PathVariable String gameLineUpId) {
        try {
            GameLineUp gameLineUp = gameLineUpService.deleteGameLineUp(gameLineUpId);
            return ResponseEntity.ok(gameLineUp);
        } catch (GameLineUpNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

  @GetMapping("/{gameLineUpId}")
  public ResponseEntity<GameLineUp> getGameLineUpById(@PathVariable String gameLineUpId){
    try {
      return ResponseEntity.ok(gameLineUpService.getGameLineUpById(gameLineUpId));
    }
    catch (GameLineUpNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
    catch (Exception e){
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping("/game/{gameId}")
  public ResponseEntity<List<GameLineUp>> getGameLineUpByCompetitionId(@PathVariable Integer gameId){
    try {
      return ResponseEntity.ok(gameLineUpService.getGameLineUpByGameId(gameId));
    }
    catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping("/club/{clubId}")
  public ResponseEntity<List<GameLineUp>> getGameLineUpByHomeClubId(@PathVariable Integer clubId) {
    try {
      return ResponseEntity.ok(gameLineUpService.getGameLineUpByClubId(clubId));
    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping("/player/{playerId}")
  public ResponseEntity<List<GameLineUp>> getGameLineUpByPlayerId(@PathVariable Integer playerId){
    try {
      return ResponseEntity.ok(gameLineUpService.getGameLineUpByPlayerId(playerId));
    }
    catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }
}
