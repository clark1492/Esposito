package com.ium.tweb.footballprojpostgres.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "game_lineups")
public class GameLineUp {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "game_lineups_id")
  private String gameLineUpId;

  @Column(name = "game_id", nullable = false)
  private Integer gameId;

  @Column(name = "club_id", nullable = false)
  private Integer clubId;

  @Column(name = "type", nullable = false)
  private String type;

  @Column(name = "number")
  private Integer number;

  @Column(name = "player_id", nullable = false)
  private Integer playerId;

  @Column(name = "player_name", nullable = false)
  private String playerName;

  @Column(name = "team_captain", nullable = false)
  private Boolean teamCaptain;

  @Column(name = "position", nullable = false)
  private String position;

  // Getters and setters

  public String getGameLineupsId() {
    return gameLineUpId;
  }

  public void setGameLineupsId(String gameLineUpId) {
    this.gameLineUpId = gameLineUpId;
  }

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

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Integer getNumber() {
    return number;
  }

  public void setNumber(Integer number) {
    this.number = number;
  }

  public Integer getPlayerId() {
    return playerId;
  }

  public void setPlayerId(Integer playerId) {
    this.playerId = playerId;
  }

  public String getPlayerName() {
    return playerName;
  }

  public void setPlayerName(String playerName) {
    this.playerName = playerName;
  }

  public Boolean getTeamCaptain() {
    return teamCaptain;
  }

  public void setTeamCaptain(Boolean teamCaptain) {
    this.teamCaptain = teamCaptain;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  // Constructors

  public GameLineUp() {
  }

  // toString() method

  @Override
  public String toString() {
    return "GameLineUp{" +
            "gameLineUpId='" + gameLineUpId + '\'' +
            ", gameId=" + gameId +
            ", clubId=" + clubId +
            ", type='" + type + '\'' +
            ", number=" + number +
            ", playerId=" + playerId +
            ", playerName='" + playerName + '\'' +
            ", teamCaptain=" + teamCaptain +
            ", position='" + position + '\'' +
            '}';
  }
}
