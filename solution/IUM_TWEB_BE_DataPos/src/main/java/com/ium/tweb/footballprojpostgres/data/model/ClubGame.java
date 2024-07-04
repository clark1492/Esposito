package com.ium.tweb.footballprojpostgres.data.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "club_games")
public class ClubGame {

    @EmbeddedId
    private ClubGameId id;

    @Column(name = "own_goals", nullable = false)
    private Integer ownGoals;

    @Column(name = "own_position")
    private Integer ownPosition;

    @Column(name = "own_manager_name")
    private String ownManagerName;

    @Column(name = "opponent_id", nullable = false)
    private Integer opponentId;

    @Column(name = "opponent_goals", nullable = false)
    private Integer opponentGoals;

    @Column(name = "opponent_position")
    private Integer opponentPosition;

    @Column(name = "opponent_manager_name")
    private String opponentManagerName;

    @Column(name = "hosting", nullable = false)
    private String hosting;

    @Column(name = "is_win", nullable = false)
    private boolean win;

    // Getters and setters

    public ClubGameId getId() {
        return id;
    }

    public void setId(ClubGameId id) {
        this.id = id;
    }

    public Integer getOwnGoals() {
        return ownGoals;
    }

    public void setOwnGoals(Integer ownGoals) {
        this.ownGoals = ownGoals;
    }

    public Integer getOwnPosition() {
        return ownPosition;
    }

    public void setOwnPosition(Integer ownPosition) {
        this.ownPosition = ownPosition;
    }

    public String getOwnManagerName() {
        return ownManagerName;
    }

    public void setOwnManagerName(String ownManagerName) {
        this.ownManagerName = ownManagerName;
    }

    public Integer getOpponentId() {
        return opponentId;
    }

    public void setOpponentId(Integer opponentId) {
        this.opponentId = opponentId;
    }

    public Integer getOpponentGoals() {
        return opponentGoals;
    }

    public void setOpponentGoals(Integer opponentGoals) {
        this.opponentGoals = opponentGoals;
    }

    public Integer getOpponentPosition() {
        return opponentPosition;
    }

    public void setOpponentPosition(Integer opponentPosition) {
        this.opponentPosition = opponentPosition;
    }

    public String getOpponentManagerName() {
        return opponentManagerName;
    }

    public void setOpponentManagerName(String opponentManagerName) {
        this.opponentManagerName = opponentManagerName;
    }

    public String getHosting() {
        return hosting;
    }

    public void setHosting(String hosting) {
        this.hosting = hosting;
    }

    public boolean isWin() {
        return win;
    }

    public void setWin(boolean win) {
        this.win = win;
    }

    public boolean getWin() {
        return win;
    }

    // Constructors

    public ClubGame() {
    }

    // toString() method


    @Override
    public String toString() {
        return "ClubGame{" +
                "id=" + id +
                ", ownGoals=" + ownGoals +
                ", ownPosition=" + ownPosition +
                ", ownManagerName='" + ownManagerName + '\'' +
                ", opponentId=" + opponentId +
                ", opponentGoals=" + opponentGoals +
                ", opponentPosition=" + opponentPosition +
                ", opponentManagerName='" + opponentManagerName + '\'' +
                ", hosting='" + hosting + '\'' +
                ", win=" + win +
                '}';
    }

    // EmbeddedId class to represent composite primary key
    @Embeddable
    public static class ClubGameId implements Serializable {
        @Column(name = "game_id")
        private Integer gameId;

        @Column(name = "club_id")
        private Integer clubId;

        // Getters, setters, constructors, and equals/hashCode methods for the composite key

        public Integer getGameId() {
            return gameId;
        }

        public void setGameId(Integer gameId) {
            this.gameId = gameId;
        }

        public Integer getClubId() {
            return clubId;
        }

        public void setClubId(Integer clubId) {
            this.clubId = clubId;
        }

        public ClubGameId() {
        }
    }
}
