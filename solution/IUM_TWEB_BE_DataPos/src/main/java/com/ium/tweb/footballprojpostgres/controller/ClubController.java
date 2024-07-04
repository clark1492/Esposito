package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.ClubNotFoundException;
import com.ium.tweb.footballprojpostgres.service.ClubService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/rest/clubs")
public class ClubController {

    private final ClubService clubService;

    private static final Logger logger = LoggerFactory.getLogger(ClubController.class);

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping
    public ResponseEntity<List<Club>> getAllClubs() {
        try {
            List<Club> clubs = clubService.getAllClubs();
            return ResponseEntity.ok(clubs);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get all clubs but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<Club>> getAllClubsWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Club> clubs = clubService.getAllClubsWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(clubs);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{clubId}")
    public ResponseEntity<Club> getClubById(@PathVariable Integer clubId) {
        try {
            return ResponseEntity.ok(clubService.getClubById(clubId));
        }
        catch (ClubNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Create a new club
    @PostMapping
    public ResponseEntity<Club> createClub(@RequestBody Club club) {
        try {
            Club newClub = clubService.createClub(club);
            return ResponseEntity.ok(newClub);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete a club
    @DeleteMapping("/{clubId}")
    public ResponseEntity<Club> deleteClub(@PathVariable Integer clubId) {
        try {
            Club club = clubService.deleteClub(clubId);
            return ResponseEntity.ok(club);
        }
        catch (ClubNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update a club
    @PutMapping("/{clubId}")
    public ResponseEntity<Club> updateClub(@PathVariable Integer clubId, @RequestBody Club club) {
        try {
            Club updatedClub = clubService.updateClub(clubId, club);
            return ResponseEntity.ok(updatedClub);
        }
        catch (ClubNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/competition/{domesticCompetitionId}")
    public ResponseEntity<List<Club>> getClubsByDomesticCompetitionId(@PathVariable String domesticCompetitionId) {
        try {
            List<Club> clubs = clubService.getClubsByDomesticCompetitionId(domesticCompetitionId);
            return ResponseEntity.ok(clubs);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Club>> searchClubsByName(@RequestParam(required = false, defaultValue = "") String name,
                                                         @RequestParam(required = false, defaultValue = "15") Integer pageSize,
                                                         @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
       try {
            List<Club> clubs = clubService.searchClubsByName(name, pageSize, pageNumber);
            return ResponseEntity.ok(clubs);
          } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
          }
     }

    // Search by a list of club IDs
    @GetMapping("/search/clubIds")
    public ResponseEntity<List<Club>> searchClubsByClubIds(@RequestParam List<Integer> clubIds) {
        try {
            List<Club> clubs = clubService.searchClubsByClubIds(clubIds);
            return ResponseEntity.ok(clubs);
        } catch (Exception e ) {
            return ResponseEntity.internalServerError().build();
        }
    }


}

