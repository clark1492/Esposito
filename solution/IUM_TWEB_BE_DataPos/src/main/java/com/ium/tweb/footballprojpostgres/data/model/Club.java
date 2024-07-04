package com.ium.tweb.footballprojpostgres.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY) // to use this enable on database auto generated keys
    @Column(name = "club_id")
    private Integer clubId;

    @Column(name = "club_code", nullable = false)
    private String clubCode;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "domestic_competition_id", nullable = false)
    private String domesticCompetitionId;

    @Column(name = "total_market_value")
    private Boolean totalMarketValue;

    @Column(name = "squad_size", nullable = false)
    private Integer squadSize;

    @Column(name = "average_age")
    private Double averageAge;

    @Column(name = "foreigners_number", nullable = false)
    private Integer foreignersNumber;

    @Column(name = "foreigners_percentage")
    private Double foreignersPercentage;

    @Column(name = "national_team_players", nullable = false)
    private Integer nationalTeamPlayers;

    @Column(name = "stadium_name", nullable = false)
    private String stadiumName;

    @Column(name = "stadium_seats", nullable = false)
    private Integer stadiumSeats;

    @Column(name = "net_transfer_record", nullable = false)
    private String netTransferRecord;

    @Column(name = "coach_name")
    private Boolean coachName;

    @Column(name = "last_season", nullable = false)
    private Integer lastSeason;

    @Column(name = "url", nullable = false)
    private String url;

    // Getters and setters

    public Integer getClubId() {
        return clubId;
    }

    public void setClubId(Integer clubId) {
        this.clubId = clubId;
    }

    public String getClubCode() {
        return clubCode;
    }

    public void setClubCode(String clubCode) {
        this.clubCode = clubCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public Boolean getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(Boolean totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public Integer getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(Integer squadSize) {
        this.squadSize = squadSize;
    }

    public Double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(Double averageAge) {
        this.averageAge = averageAge;
    }

    public Integer getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(Integer foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public Double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(Double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public Integer getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(Integer nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public Integer getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(Integer stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public Boolean getCoachName() {
        return coachName;
    }

    public void setCoachName(Boolean coachName) {
        this.coachName = coachName;
    }

    public Integer getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // Constructors

    public Club() {
    }

    // toString() method

    @Override
    public String toString() {
        return "Club{" +
                "clubId=" + clubId +
                ", clubCode='" + clubCode + '\'' +
                ", name='" + name + '\'' +
                ", domesticCompetitionId='" + domesticCompetitionId + '\'' +
                ", totalMarketValue=" + totalMarketValue +
                ", squadSize=" + squadSize +
                ", averageAge=" + averageAge +
                ", foreignersNumber=" + foreignersNumber +
                ", foreignersPercentage=" + foreignersPercentage +
                ", nationalTeamPlayers=" + nationalTeamPlayers +
                ", stadiumName='" + stadiumName + '\'' +
                ", stadiumSeats=" + stadiumSeats +
                ", netTransferRecord='" + netTransferRecord + '\'' +
                ", coachName=" + coachName +
                ", lastSeason=" + lastSeason +
                ", url='" + url + '\'' +
                '}';
    }

}

