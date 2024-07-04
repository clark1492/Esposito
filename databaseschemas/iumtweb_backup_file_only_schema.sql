--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: club_games; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.club_games (
    game_id integer NOT NULL,
    club_id integer NOT NULL,
    own_goals integer NOT NULL,
    own_position integer,
    own_manager_name character varying,
    opponent_id integer NOT NULL,
    opponent_goals integer NOT NULL,
    opponent_position integer,
    opponent_manager_name character varying,
    hosting character varying NOT NULL,
    is_win boolean NOT NULL
);


ALTER TABLE public.club_games OWNER TO pguser;

--
-- Name: clubs; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.clubs (
    club_id integer NOT NULL,
    club_code character varying NOT NULL,
    name character varying NOT NULL,
    domestic_competition_id character varying NOT NULL,
    total_market_value boolean,
    squad_size integer NOT NULL,
    average_age numeric,
    foreigners_number integer NOT NULL,
    foreigners_percentage numeric,
    national_team_players integer NOT NULL,
    stadium_name character varying NOT NULL,
    stadium_seats integer NOT NULL,
    net_transfer_record character varying NOT NULL,
    coach_name boolean,
    last_season integer NOT NULL,
    url character varying NOT NULL
);


ALTER TABLE public.clubs OWNER TO pguser;

--
-- Name: competitions; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.competitions (
    competition_id character varying NOT NULL,
    competition_code character varying NOT NULL,
    name character varying NOT NULL,
    sub_type character varying NOT NULL,
    type character varying NOT NULL,
    country_id integer NOT NULL,
    country_name character varying,
    domestic_league_code character varying,
    confederation character varying NOT NULL,
    url character varying NOT NULL
);


ALTER TABLE public.competitions OWNER TO pguser;

--
-- Name: game_lineups; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.game_lineups (
    game_lineups_id character varying NOT NULL,
    game_id integer NOT NULL,
    club_id integer NOT NULL,
    type character varying NOT NULL,
    number integer,
    player_id integer NOT NULL,
    player_name character varying NOT NULL,
    team_captain boolean NOT NULL,
    "position" character varying NOT NULL
);


ALTER TABLE public.game_lineups OWNER TO pguser;

--
-- Name: player_valuations; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.player_valuations (
    player_id integer NOT NULL,
    last_season integer NOT NULL,
    datetime timestamp without time zone,
    date date NOT NULL,
    dateweek date NOT NULL,
    market_value_in_eur integer NOT NULL,
    n integer NOT NULL,
    current_club_id integer NOT NULL,
    player_club_domestic_competition_id character varying NOT NULL
);


ALTER TABLE public.player_valuations OWNER TO pguser;

--
-- Name: players; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE public.players (
    player_id integer NOT NULL,
    first_name character varying,
    last_name character varying NOT NULL,
    name character varying NOT NULL,
    last_season integer NOT NULL,
    current_club_id integer NOT NULL,
    player_code character varying NOT NULL,
    country_of_birth character varying,
    city_of_birth character varying,
    country_of_citizenship character varying,
    date_of_birth date,
    sub_position character varying,
    "position" character varying NOT NULL,
    foot character varying,
    height_in_cm integer,
    market_value_in_eur integer,
    highest_market_value_in_eur integer,
    contract_expiration_date timestamp without time zone,
    agent_name character varying,
    image_url character varying NOT NULL,
    url character varying NOT NULL,
    current_club_domestic_competition_id character varying NOT NULL,
    current_club_name character varying NOT NULL
);


ALTER TABLE public.players OWNER TO pguser;

--
-- Name: club_games club_games_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.club_games
    ADD CONSTRAINT club_games_pkey PRIMARY KEY (game_id, club_id);


--
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (club_id);


--
-- Name: competitions competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (competition_id);


--
-- Name: game_lineups game_lineups_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.game_lineups
    ADD CONSTRAINT game_lineups_pkey PRIMARY KEY (game_lineups_id);


--
-- Name: player_valuations player_valuations_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.player_valuations
    ADD CONSTRAINT player_valuations_pkey PRIMARY KEY (player_id, date);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (player_id);


--
-- PostgreSQL database dump complete
--

