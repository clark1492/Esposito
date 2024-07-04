package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.PlayerNotFoundException;
import com.ium.tweb.footballprojpostgres.service.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/rest/player")  /* Use request mapping for versioning */
public class PlayerController {
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        try {
            List<Player> players = playerService.getAllPlayers();
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get all players but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<Player>> getAllPlayersWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Player> players = playerService.getAllPlayersWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        try {
            return ResponseEntity.ok(playerService.createPlayer(player));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Integer playerId, @RequestBody Player player) {
        try {
            return ResponseEntity.ok(playerService.updatePlayer(playerId, player));
        } catch (PlayerNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{playerId}")
    public ResponseEntity<Player> deletePlayer(@PathVariable Integer playerId) {
        try {
            Player player = playerService.deletePlayer(playerId);
            return ResponseEntity.ok(player);
        } catch (PlayerNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") int playerId) {
        try {
            Player player = playerService.getPlayerById(playerId);
            return ResponseEntity.ok(player);
        }
        catch (PlayerNotFoundException e){
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/club/{currentClubId}")
    public ResponseEntity<List<Player>> getPlayerByCurrentClubId(@PathVariable Integer currentClubId) {
        try {
            List<Player> players = playerService.getPlayerByCurrentClubId(currentClubId);
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Player>> searchPlayersByName(@RequestParam String name,
                                                            @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                            @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Player> players = playerService.searchPlayersByName(name, pageSize, pageNumber);
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/search/name/position")
    public ResponseEntity<List<Player>> searchPlayersByNamePosition(@RequestParam(required = false, defaultValue = "") String name,
                                                                    @RequestParam(required = false, defaultValue = "") String position,
                                                                    @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Player> players = playerService.searchPlayersByNamePosition(name,position,pageSize,pageNumber);
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search/playerIds")
    public ResponseEntity<List<Player>> searchPlayersByPayerIds(@RequestParam(required = false, defaultValue = "") List<Integer> playerIds,
                                                                    @RequestParam(required = false, defaultValue = "") String position,
                                                                    @RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Player> players = playerService.searchPlayersByPlayerIdsAndPos(playerIds,position,pageSize,pageNumber);
            return ResponseEntity.ok(players);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

/*https://spring.io/guides/tutorials/rest*/


