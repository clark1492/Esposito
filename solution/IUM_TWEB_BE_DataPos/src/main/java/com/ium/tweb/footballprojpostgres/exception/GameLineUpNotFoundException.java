package com.ium.tweb.footballprojpostgres.exception;

public class GameLineUpNotFoundException extends Exception{

  public GameLineUpNotFoundException(String message) {
    super(message);
  }

  public GameLineUpNotFoundException() {
  }

  public GameLineUpNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public GameLineUpNotFoundException(Throwable cause) {
    super(cause);
  }
}
