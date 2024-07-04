package com.ium.tweb.footballprojpostgres.data.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "competition_code", nullable = false)
    private String competitionCode;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sub_type", nullable = false)
    private String subType;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "country_id", nullable = false)
    private Integer countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "domestic_league_code")
    private String domesticLeagueCode;

    @Column(name = "confederation", nullable = false)
    private String confederation;

    @Column(name = "url", nullable = false)
    private String url;

    // Getters and setters

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionCode() {
        return competitionCode;
    }

    public void setCompetitionCode(String competitionCode) {
        this.competitionCode = competitionCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // Constructors


    public Competition() {
    }

    public Competition(String competitionId, String competitionCode, String name, String subType, String type, Integer countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
        this.name = name;
        this.subType = subType;
        this.type = type;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }

    // toString() method

    @Override
    public String toString() {
        return "Competition{" +
                "competitionId='" + competitionId + '\'' +
                ", competitionCode='" + competitionCode + '\'' +
                ", name='" + name + '\'' +
                ", subType='" + subType + '\'' +
                ", type='" + type + '\'' +
                ", countryId=" + countryId +
                ", countryName='" + countryName + '\'' +
                ", domesticLeagueCode='" + domesticLeagueCode + '\'' +
                ", confederation='" + confederation + '\'' +
                ", url='" + url + '\'' +
                '}';
    }


}

