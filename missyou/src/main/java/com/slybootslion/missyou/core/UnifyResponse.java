package com.slybootslion.missyou.core;

public class UnifyResponse {
    private int code;
    private String message;
    private String method;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getMethod() {
        return method;
    }

    public UnifyResponse(int code, String message, String method) {
        this.code = code;
        this.message = message;
        this.method = method;
    }
}
