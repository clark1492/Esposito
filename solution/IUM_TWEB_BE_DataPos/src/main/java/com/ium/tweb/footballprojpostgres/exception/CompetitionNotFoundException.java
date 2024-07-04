package com.ium.tweb.footballprojpostgres.exception;

public class CompetitionNotFoundException extends Exception {
    public CompetitionNotFoundException(String message) {
        super(message);
    }

    public CompetitionNotFoundException() {
    }

    public CompetitionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CompetitionNotFoundException(Throwable cause) {
        super(cause);
    }
}
