package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.ClubGame;
import com.ium.tweb.footballprojpostgres.exception.ClubGameNotFoundException;
import com.ium.tweb.footballprojpostgres.service.ClubGameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/rest/clubGames")
public class ClubGameController {

    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final ClubGameService clubGameService;

    public ClubGameController(ClubGameService clubGameService) {
        this.clubGameService = clubGameService;
    }

    @GetMapping
    public List<ClubGame> getAllClubGames() {
        List<ClubGame> result = clubGameService.getAllClubGames();
        return result;
    }

    // Get all club games but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<ClubGame>> getAllClubGamesWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                    @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<ClubGame> clubGames = clubGameService.getAllClubGamesWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(clubGames);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/game/{gameId}")
    public List<ClubGame> getClubGamesByGameId(@PathVariable Integer gameId) {
        List<ClubGame> result =  clubGameService.getClubGamesByGameId(gameId);
        return result;
    }

    @GetMapping("/game/{gameId}/club/{clubId}")
    public ResponseEntity<ClubGame> getClubGamesByGameIdAndClubId(@PathVariable Integer gameId, @PathVariable Integer clubId) {
        try {
            ClubGame clubGame = clubGameService.getClubGamesByGameIdAndClubId(gameId, clubId);
            return ResponseEntity.ok(clubGame);
        } catch (ClubGameNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/game/{gameId}/club/{clubId}")
    public ResponseEntity<ClubGame> deleteClubGamesByGameIdAndClubId(@PathVariable Integer gameId, @PathVariable Integer clubId) {
        try {
            ClubGame clubGame = clubGameService.deleteClubGamesByGameIdAndClubId(gameId, clubId);
            return ResponseEntity.ok(clubGame);
        } catch (ClubGameNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/game/{gameId}/club/{clubId}")
    public ResponseEntity<ClubGame> updateClubGamesByGameIdAndClubId(@PathVariable Integer gameId, @PathVariable Integer clubId, @RequestBody ClubGame clubGame) {
        try {
            ClubGame updatedClubGame = clubGameService.updateClubGamesByGameIdAndClubId(gameId, clubId, clubGame);
            return ResponseEntity.ok(updatedClubGame);
        } catch (ClubGameNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ClubGame> createClubGame(@RequestBody ClubGame clubGame) {
        try {
            ClubGame newClubGame = clubGameService.createClubGame(clubGame);
            return ResponseEntity.ok(newClubGame);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/club/{clubId}")
    public List<ClubGame> getClubGamesByClubId(@PathVariable Integer clubId) {
        return clubGameService.getClubGamesByClubId(clubId);
    }

    @GetMapping("/opponent/{opponentId}")
    public List<ClubGame> getClubGamesByOpponentId(@PathVariable Integer opponentId) {
        return clubGameService.getClubGamesByOpponentId(opponentId);
    }

    @GetMapping("/hosting/{hosting}")
    public List<ClubGame> getClubGamesByHosting(@PathVariable String hosting) {
        return clubGameService.getClubGamesByHosting(hosting);
    }

}

