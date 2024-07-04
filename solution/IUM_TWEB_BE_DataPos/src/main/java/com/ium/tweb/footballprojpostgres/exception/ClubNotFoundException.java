package com.ium.tweb.footballprojpostgres.exception;

public class ClubNotFoundException extends Exception {
    public ClubNotFoundException(String message) {
        super(message);
    }

    public ClubNotFoundException() {
    }

    public ClubNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ClubNotFoundException(Throwable cause) {
        super(cause);
    }
}
