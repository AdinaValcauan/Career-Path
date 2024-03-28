package com.careerPath.CareerPath.Exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
            super(message);
        }
}
