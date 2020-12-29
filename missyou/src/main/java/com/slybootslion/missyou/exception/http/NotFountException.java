package com.slybootslion.missyou.exception.http;

public class NotFountException extends HttpException {
    public NotFountException(int code) {
        this.code = code;
        this.httpStatusCode = 404;
    }
}
