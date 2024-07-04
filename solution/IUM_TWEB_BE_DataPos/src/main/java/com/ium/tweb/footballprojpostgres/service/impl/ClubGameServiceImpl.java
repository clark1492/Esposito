package com.ium.tweb.footballprojpostgres.service.impl;

import com.ium.tweb.footballprojpostgres.data.model.ClubGame;
import com.ium.tweb.footballprojpostgres.exception.ClubGameNotFoundException;
import com.ium.tweb.footballprojpostgres.repository.ClubGameRepository;
import com.ium.tweb.footballprojpostgres.service.ClubGameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClubGameServiceImpl implements ClubGameService {

    private static final Logger logger = LoggerFactory.getLogger(ClubGameServiceImpl.class);

    private final ClubGameRepository clubGameRepository;

    public ClubGameServiceImpl(ClubGameRepository clubGameRepository) {
        this.clubGameRepository = clubGameRepository;
    }

    public List<ClubGame> getAllClubGames() {
        List<ClubGame> clubGames = clubGameRepository.findAll();
        return clubGames;
    }

    @Override
    public List<ClubGame> getClubGamesByGameId(Integer gameId) {
        return clubGameRepository.findByIdGameId(gameId);
    }

    @Override
    public ClubGame getClubGamesByGameIdAndClubId(Integer gameId, Integer clubId) throws ClubGameNotFoundException {
       ClubGame clubGame = clubGameRepository.findByIdGameIdAndIdClubId(gameId, clubId);
        if (clubGame == null) {
            String error = String.format("ClubGame with gameId %d and clubId %d not found", gameId, clubId);
            logger.error(error);
            throw new ClubGameNotFoundException(error);
        }
        else {
            return clubGame;
        }

    }

    @Override
    public ClubGame deleteClubGamesByGameIdAndClubId(Integer gameId, Integer clubId) throws ClubGameNotFoundException {
        ClubGame clubGame = getClubGamesByGameIdAndClubId(gameId, clubId);
        clubGameRepository.delete(clubGame);
        return clubGame;
    }

    @Override
    public ClubGame updateClubGamesByGameIdAndClubId(Integer gameId, Integer clubId, ClubGame clubGame) throws ClubGameNotFoundException {
        ClubGame oldClubGame = getClubGamesByGameIdAndClubId(gameId, clubId);
        oldClubGame.setId(clubGame.getId());
        oldClubGame.setHosting(clubGame.getHosting());
        oldClubGame.setOpponentGoals(clubGame.getOpponentGoals());
        oldClubGame.setOpponentManagerName(clubGame.getOpponentManagerName());
        oldClubGame.setOwnGoals(clubGame.getOwnGoals());
        oldClubGame.setOpponentPosition(clubGame.getOpponentPosition());
        oldClubGame.setOwnManagerName(clubGame.getOwnManagerName());
        oldClubGame.setOwnPosition(clubGame.getOwnPosition());
        oldClubGame.setWin(clubGame.getWin());
        oldClubGame.setOpponentId(clubGame.getOpponentId());

        clubGameRepository.save(clubGame);
        return clubGame;
    }


    @Override
    public List<ClubGame> getClubGamesByClubId(Integer clubId) {
        return clubGameRepository.findByIdClubId(clubId);
    }

    @Override
    public List<ClubGame> getClubGamesByOpponentId(Integer opponentId) {
        return clubGameRepository.findByOpponentId(opponentId);
    }

    @Override
    public List<ClubGame> getClubGamesByHosting(String hosting) {
        return clubGameRepository.findByHosting(hosting);
    }

    @Override
    public List<ClubGame> getAllClubGamesWithPagination(Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return clubGameRepository.findAll(page).getContent();
    }

    @Override
    public ClubGame createClubGame(ClubGame clubGame) {
        return clubGameRepository.save(clubGame);
    }

}

