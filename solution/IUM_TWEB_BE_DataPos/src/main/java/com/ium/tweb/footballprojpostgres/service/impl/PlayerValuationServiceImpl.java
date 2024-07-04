package com.ium.tweb.footballprojpostgres.service.impl;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.data.model.PlayerValuation;
import com.ium.tweb.footballprojpostgres.data.output.PlayerValuationDTO;
import com.ium.tweb.footballprojpostgres.exception.PlayerValuationNotFoundException;
import com.ium.tweb.footballprojpostgres.repository.PlayerValuationRepository;
import com.ium.tweb.footballprojpostgres.service.PlayerValuationService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerValuationServiceImpl implements PlayerValuationService {


    private final PlayerValuationRepository playerValuationRepository;

    public PlayerValuationServiceImpl(PlayerValuationRepository playerValuationRepository) {
        this.playerValuationRepository = playerValuationRepository;
    }

    @Override
    public List<PlayerValuation> getAllPlayerValuations() {
        return playerValuationRepository.findAll();
    }

    @Override
    public List<PlayerValuation> getPlayerValuationsByPlayerId(Integer playerId) {
        return playerValuationRepository.findByIdPlayerId(playerId);
    }



    @Override
    public PlayerValuation getPlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date) throws PlayerValuationNotFoundException {
        PlayerValuation playerValuation = playerValuationRepository.findByIdPlayerIdAndIdDate(playerId, date);
        if (playerValuation == null) {
            throw new PlayerValuationNotFoundException("Player valuation not found for player ID: " + playerId + " and date: " + date);
        } else {
            return playerValuation;
        }
    }

    @Override
    public PlayerValuation deletePlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date) throws PlayerValuationNotFoundException {
        PlayerValuation playerValuation = playerValuationRepository.findByIdPlayerIdAndIdDate(playerId, date);
        if (playerValuation == null) {
            throw new PlayerValuationNotFoundException("Player valuation not found for player ID: " + playerId + " and date: " + date);
        } else {
            playerValuationRepository.delete(playerValuation);
            return playerValuation;
        }
    }

    @Override
    public PlayerValuation updatePlayerValuationsByPlayerIdAndDate(Integer playerId, LocalDate date, PlayerValuation playerValuation) throws PlayerValuationNotFoundException {
        PlayerValuation playerValuationToUpdate = playerValuationRepository.findByIdPlayerIdAndIdDate(playerId, date);
        if (playerValuationToUpdate == null) {
            throw new PlayerValuationNotFoundException("Player valuation not found for player ID: " + playerId + " and date: " + date);
        } else {
            playerValuationToUpdate.setLastSeason(playerValuation.getLastSeason());
            playerValuationToUpdate.setDatetime(playerValuation.getDatetime());
            playerValuationToUpdate.setDateWeek(playerValuation.getDateWeek());
            playerValuationToUpdate.setMarketValueInEur(playerValuation.getMarketValueInEur());
            playerValuationToUpdate.setN(playerValuation.getN());
            playerValuationToUpdate.setCurrentClubId(playerValuation.getCurrentClubId());
            playerValuationToUpdate.setPlayerClubDomesticCompetitionId(playerValuation.getPlayerClubDomesticCompetitionId());

            playerValuationRepository.save(playerValuationToUpdate);
            return playerValuationToUpdate;
        }
    }

    @Override
    public List<PlayerValuation> getPlayerValuationsByClubId(Integer clubId) {
       return playerValuationRepository.findByCurrentClubId(clubId);
    }

    @Override
    public List<PlayerValuationDTO> getPlayerValuationsAndInfoByClubId(Integer clubId, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        List<Object[]> results = playerValuationRepository.findAllValuationsWithPlayerInfoByClubId(clubId, page);
        return results.stream().map(result -> {
            PlayerValuation pv = (PlayerValuation) result[0];
            Player p = (Player) result[1];
            Club c = (Club) result[2];
            return new PlayerValuationDTO(pv, p, c);
        }).collect(Collectors.toList());
    }

    @Override
    public List<PlayerValuationDTO> getPlayerValuationsAndInfoByPlayerId(Integer playerId, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        List<Object[]> results = playerValuationRepository.findAllValuationsWithPlayerInfoByPlayerId(playerId, page);
        return results.stream().map(result -> {
            PlayerValuation pv = (PlayerValuation) result[0];
            Player p = (Player) result[1];
            Club c = (Club) result[2];
            return new PlayerValuationDTO(pv, p, c);
        }).collect(Collectors.toList());
    }

    @Override
    public List<PlayerValuationDTO> getPlayerValuationsAndInfoByPlayerIdAndDates(Integer playerId, LocalDate startDate, LocalDate endDate, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        List<Object[]> results = playerValuationRepository.findAllValuationsWithPlayerInfoByPlayerIdAndDates(playerId, startDate, endDate, page);
        return results.stream().map(result -> {
            PlayerValuation pv = (PlayerValuation) result[0];
            Player p = (Player) result[1];
            Club c = (Club) result[2];
            return new PlayerValuationDTO(pv, p, c);
        }).collect(Collectors.toList());
    }

    @Override
    public List<PlayerValuationDTO> getTopValuationsAndInfoByDates(LocalDate startDate, LocalDate endDate, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        List<Object[]> results = playerValuationRepository.findTopValuationsWithPlayerInfoByDates(startDate, endDate, page);
        return results.stream().map(result -> {
            PlayerValuation pv = (PlayerValuation) result[0];
            Player p = (Player) result[1];
            Club c = (Club) result[2];
            return new PlayerValuationDTO(pv, p, c);
        }).collect(Collectors.toList());
    }

    @Override
    public List<PlayerValuation> getAllPlayerValuationsWithPagination(Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return playerValuationRepository.findAll(page).getContent();
    }

    @Override
    public PlayerValuation createPlayerValuation(PlayerValuation playerValuation) throws PlayerValuationNotFoundException {
        return playerValuationRepository.save(playerValuation);
    }

}
