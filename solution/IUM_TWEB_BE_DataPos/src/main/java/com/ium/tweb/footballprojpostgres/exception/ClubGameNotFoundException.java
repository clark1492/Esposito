package com.ium.tweb.footballprojpostgres.exception;

public class ClubGameNotFoundException extends Exception {
    public ClubGameNotFoundException(String message) {
        super(message);
    }

    public ClubGameNotFoundException() {
    }

    public ClubGameNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ClubGameNotFoundException(Throwable cause) {
        super(cause);
    }
}
