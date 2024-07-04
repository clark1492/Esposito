package com.ium.tweb.footballprojpostgres.service.impl;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.exception.ClubNotFoundException;
import com.ium.tweb.footballprojpostgres.repository.ClubRepository;
import com.ium.tweb.footballprojpostgres.service.ClubService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl implements ClubService {
    private static final Logger logger = LoggerFactory.getLogger(ClubServiceImpl.class);
    private final ClubRepository clubRepository;

    public ClubServiceImpl(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    @Override
    public List<Club> getAllClubs() {
        List<Club> clubs = clubRepository.findAll();
        return clubs;
    }

    @Override
    public Club getClubById(Integer clubId)  throws ClubNotFoundException{
        Club club = clubRepository.findByClubId(clubId);
        if (club == null) {
            String error = String.format("Club with id %d not found", clubId);
            logger.error(error);
            throw new ClubNotFoundException(error);
        }
        return club;
    }

    @Override
    public List<Club> getClubsByDomesticCompetitionId(String domesticCompetitionId) {
        List<Club> clubs = clubRepository.findByDomesticCompetitionId(domesticCompetitionId);
        return clubs;
    }

    @Override
    public List<Club> getAllClubsWithPagination(Integer pageSize, Integer pageNumber) {
        return clubRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
    }

    @Override
    public Club createClub(Club club) {
        return clubRepository.save(club);
    }

    @Override
    public Club deleteClub(Integer clubId) throws ClubNotFoundException {
        Club club = clubRepository.findByClubId(clubId);
        if(club == null) {
            throw new ClubNotFoundException("Club not found");
        }
        clubRepository.delete(club);
        return club;
    }


    @Override
    public Club updateClub(Integer clubId, Club club) throws ClubNotFoundException {
        Club clubToUpdate = clubRepository.findByClubId(clubId);
        if (clubToUpdate == null) {
            throw new ClubNotFoundException("Club not found");
        }
        clubToUpdate.setClubCode(club.getClubCode());
        clubToUpdate.setName(club.getName());
        clubToUpdate.setDomesticCompetitionId(club.getDomesticCompetitionId());
        clubToUpdate.setTotalMarketValue(club.getTotalMarketValue());
        clubToUpdate.setSquadSize(club.getSquadSize());
        clubToUpdate.setAverageAge(club.getAverageAge());
        clubToUpdate.setForeignersNumber(club.getForeignersNumber());
        clubToUpdate.setForeignersPercentage(club.getForeignersPercentage());
        clubToUpdate.setNationalTeamPlayers(club.getNationalTeamPlayers());
        clubToUpdate.setStadiumName(club.getStadiumName());
        clubToUpdate.setStadiumSeats(club.getStadiumSeats());
        clubToUpdate.setNetTransferRecord(club.getNetTransferRecord());
        clubToUpdate.setCoachName(club.getCoachName());
        clubToUpdate.setLastSeason(club.getLastSeason());
        clubToUpdate.setUrl(club.getUrl());
        return clubRepository.save(clubToUpdate);
    }

    @Override
    public List<Club> searchClubsByName(String name, Integer pageSize, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, pageSize);
        return clubRepository.findByNameContainingIgnoreCaseOrderByName(name,page);
    }
    @Override
    public List<Club> searchClubsByClubIds(List<Integer> clubIds) {
        return clubRepository.findByClubIdIn(clubIds);
    }
}
