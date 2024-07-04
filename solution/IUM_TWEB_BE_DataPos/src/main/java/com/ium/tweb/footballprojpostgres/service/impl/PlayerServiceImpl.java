package com.ium.tweb.footballprojpostgres.service.impl;

import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.PlayerNotFoundException;
import com.ium.tweb.footballprojpostgres.repository.PlayerRepository;
import com.ium.tweb.footballprojpostgres.service.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {
    private static final Logger logger = LoggerFactory.getLogger(PlayerServiceImpl.class);
    private final PlayerRepository playerRepository;

    /* Using constructor injection */
    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public List<Player> getAllPlayersWithPagination(Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return playerRepository.findAll(page).getContent();
    }

    @Override
    public Player getPlayerById(Integer playerId) throws PlayerNotFoundException {
        Player player = playerRepository.findByPlayerId(playerId);
        if (player == null) {
            logger.error(String.format("Not Existing Player (playerId = %d)", playerId));
            throw new PlayerNotFoundException("Not Existing Player");
        } else {
            return player;
        }
    }

    @Override
    public List<Player> getPlayerByCurrentClubId(Integer currentClubId){
       return playerRepository.findByCurrentClubId(currentClubId);
    }

    @Override
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public Player updatePlayer(Integer playerId, Player player) throws PlayerNotFoundException {
        Player oldPlayer = getPlayerById(playerId);
        if (oldPlayer == null) {
            throw new PlayerNotFoundException("Player not found");
        }
        oldPlayer.setPlayerId(player.getPlayerId());
        oldPlayer.setFirstName(player.getFirstName());
        oldPlayer.setLastName(player.getLastName());
        oldPlayer.setName(player.getName());
        oldPlayer.setLastSeason(player.getLastSeason());
        oldPlayer.setCurrentClubId(player.getCurrentClubId());
        oldPlayer.setPlayerCode(player.getPlayerCode());
        oldPlayer.setCountryOfBirth(player.getCountryOfBirth());
        oldPlayer.setCityOfBirth(player.getCityOfBirth());
        oldPlayer.setCountryOfCitizenship(player.getCountryOfCitizenship());
        oldPlayer.setDateOfBirth(player.getDateOfBirth());
        oldPlayer.setSubPosition(player.getSubPosition());
        oldPlayer.setPosition(player.getPosition());
        oldPlayer.setFoot(player.getFoot());
        oldPlayer.setHeightInCm(player.getHeightInCm());
        oldPlayer.setMarketValueInEur(player.getMarketValueInEur());
        oldPlayer.setHighestMarketValueInEur(player.getHighestMarketValueInEur());
        oldPlayer.setContractExpirationDate(player.getContractExpirationDate());
        oldPlayer.setAgentName(player.getAgentName());
        oldPlayer.setImageUrl(player.getImageUrl());
        oldPlayer.setUrl(player.getUrl());
        oldPlayer.setCurrentClubDomesticCompetitionId(player.getCurrentClubDomesticCompetitionId());
        oldPlayer.setCurrentClubName(player.getCurrentClubName());
        playerRepository.save(player);
        return player;
    }

    @Override
    public Player deletePlayer(Integer playerId) throws PlayerNotFoundException {
        Player player = getPlayerById(playerId);
        if (player == null) {
            throw new PlayerNotFoundException("Player not found");
        }
        playerRepository.delete(player);
        return player;
    }
    @Override
    public List<Player> searchPlayersByName(String name, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return playerRepository.findByNameContainingIgnoreCaseOrderByName(name, page);
    }
    @Override
    public List<Player> searchPlayerByPosition(String position, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return playerRepository.findByPosition(position, page);
    }
    @Override
    public List<Player> searchPlayersByNamePosition(String name, String position, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        if(name.isEmpty() && position.isEmpty()){
            return this.getAllPlayersWithPagination(pageSize, pageNumber);
        }
        else if(!name.isEmpty() && position.isEmpty()){
            return this.searchPlayersByName(name, pageSize, pageNumber);
        }
        else if (name.isEmpty()){
            return this.searchPlayerByPosition(position, pageSize, pageNumber);
        }
        else {
            return playerRepository.findByPositionAndNameContainingIgnoreCaseOrderByName(position, name, page);
        }
    }

    @Override
    public List<Player> searchPlayersByPlayerIdsAndPos(List<Integer> playerIds, String position, Integer pageSize, Integer pageNumber){
        Pageable page = PageRequest.of(pageNumber, pageSize);
        if(playerIds.isEmpty() && position.isEmpty()){
            return this.getAllPlayersWithPagination(pageSize, pageNumber);
        }
        else if(playerIds.isEmpty()){
            return this.searchPlayerByPosition(position, pageSize, pageNumber);
        }
        else if(position.isEmpty()){
            return playerRepository.findByPlayerIdInOrderByName(playerIds, page);
        }
        return playerRepository.findByPlayerIdInAndPositionOrderByName(playerIds, position, page);
    }
}
