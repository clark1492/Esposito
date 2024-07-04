package com.ium.tweb.footballprojpostgres.data.output;

import com.ium.tweb.footballprojpostgres.data.model.Club;
import com.ium.tweb.footballprojpostgres.data.model.Player;
import com.ium.tweb.footballprojpostgres.data.model.PlayerValuation;

public class PlayerValuationDTO {
    private PlayerValuation playerValuation;
    private Player player;
    private Club club;

    // Constructor, getters and setters
    public PlayerValuationDTO(PlayerValuation playerValuation, Player player, Club club) {
        this.playerValuation = playerValuation;
        this.player = player;
        this.club = club;
    }

    public PlayerValuation getPlayerValuation() {
        return playerValuation;
    }

    public void setPlayerValuation(PlayerValuation playerValuation) {
        this.playerValuation = playerValuation;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }
}
