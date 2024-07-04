package com.ium.tweb.footballprojpostgres.controller;

import com.ium.tweb.footballprojpostgres.data.model.Competition;
import com.ium.tweb.footballprojpostgres.exception.CompetitionNotFoundException;
import com.ium.tweb.footballprojpostgres.service.CompetitionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/rest/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    private static final Logger logger = LoggerFactory.getLogger(CompetitionController.class);

    @GetMapping
    public List<Competition> getAllCompetitions() {
        return competitionService.getAllCompetitions();
    }

    // Get all competitions but with pagination (optional arguments: pageSize, pageNumber)
    // If not set used default value (pageSize = 25, pageNumber = 0)
    @GetMapping("/page")
    public ResponseEntity<List<Competition>> getAllCompetitionsWithPagination(@RequestParam(required = false, defaultValue = "25") Integer pageSize,
                                                                              @RequestParam(required = false, defaultValue = "0") Integer pageNumber) {
        try {
            List<Competition> competitions = competitionService.getAllCompetitionsWithPagination(pageSize, pageNumber);
            return ResponseEntity.ok(competitions);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{competitionId}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable String competitionId) {
        try {
            Competition competition = competitionService.getCompetitionById(competitionId);
            return ResponseEntity.ok(competition);
        } catch (CompetitionNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        try {
            return ResponseEntity.ok(competitionService.createCompetition(competition));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{competitionId}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable String competitionId, @RequestBody Competition competition) {
        try {
            return ResponseEntity.ok(competitionService.updateCompetition(competitionId, competition));
        } catch (CompetitionNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{competitionId}")
    public ResponseEntity<Competition> deleteCompetition(@PathVariable String competitionId) {
        try {
            return ResponseEntity.ok(competitionService.deleteCompetition(competitionId));
        } catch (CompetitionNotFoundException e) {
            logger.error(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/type/{type}")
    public List<Competition> getCompetitionsByType(@PathVariable String type) {
        return competitionService.getCompetitionsByType(type);
    }

}

