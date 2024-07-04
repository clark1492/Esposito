package com.ium.tweb.footballprojpostgres.exception;

public class PlayerValuationNotFoundException extends Exception {
    public PlayerValuationNotFoundException(String message) {
        super(message);
    }

    public PlayerValuationNotFoundException() {
    }

    public PlayerValuationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlayerValuationNotFoundException(Throwable cause) {
        super(cause);
    }
}
