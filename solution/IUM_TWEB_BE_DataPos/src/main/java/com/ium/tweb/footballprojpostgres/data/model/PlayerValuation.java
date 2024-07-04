package com.ium.tweb.footballprojpostgres.data.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "player_valuations")
public class PlayerValuation {

    @EmbeddedId
    private PlayerValuationId id;

    @Column(name = "last_season", nullable = false)
    private Integer lastSeason;

    @Column(name = "datetime")
    private LocalDateTime datetime;

    @Column(name = "dateweek", nullable = false)
    private LocalDate dateWeek;

    @Column(name = "market_value_in_eur", nullable = false)
    private Integer marketValueInEur;

    @Column(name = "n", nullable = false)
    private Integer n;

    @Column(name = "current_club_id", nullable = false)
    private Integer currentClubId;

    @Column(name = "player_club_domestic_competition_id", nullable = false)
    private String playerClubDomesticCompetitionId;

    // Getters and setters

    public PlayerValuationId getId() {
        return id;
    }

    public void setId(PlayerValuationId id) {
        this.id = id;
    }

    public Integer getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public LocalDate getDateWeek() {
        return dateWeek;
    }

    public void setDateWeek(LocalDate dateWeek) {
        this.dateWeek = dateWeek;
    }

    public Integer getMarketValueInEur() {
        return marketValueInEur;
    }

    public void setMarketValueInEur(Integer marketValueInEur) {
        this.marketValueInEur = marketValueInEur;
    }

    public Integer getN() {
        return n;
    }

    public void setN(Integer n) {
        this.n = n;
    }

    public Integer getCurrentClubId() {
        return currentClubId;
    }

    public void setCurrentClubId(Integer currentClubId) {
        this.currentClubId = currentClubId;
    }

    public String getPlayerClubDomesticCompetitionId() {
        return playerClubDomesticCompetitionId;
    }

    public void setPlayerClubDomesticCompetitionId(String playerClubDomesticCompetitionId) {
        this.playerClubDomesticCompetitionId = playerClubDomesticCompetitionId;
    }


    // Constructors

    public PlayerValuation() {
    }

    // toString() method

    @Override
    public String toString() {
        return "PlayerValuation{" +
                "id=" + id +
                ", lastSeason=" + lastSeason +
                ", datetime=" + datetime +
                ", dateWeek=" + dateWeek +
                ", marketValueInEur=" + marketValueInEur +
                ", n=" + n +
                ", currentClubId=" + currentClubId +
                ", playerClubDomesticCompetitionId='" + playerClubDomesticCompetitionId + '\'' +
                '}';
    }

    // EmbeddedId class to represent composite primary key
    @Embeddable
    public static class PlayerValuationId implements Serializable {
        @Column(name = "player_id")
        private Integer playerId;

        @Column(name = "date")
        private LocalDate date;

        // Getters, setters, constructors, and equals/hashCode methods for the composite key

        public Integer getPlayerId() {
            return playerId;
        }

        public void setPlayerId(Integer playerId) {
            this.playerId = playerId;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        // Constructor
        public PlayerValuationId() {
        }
    }
}

