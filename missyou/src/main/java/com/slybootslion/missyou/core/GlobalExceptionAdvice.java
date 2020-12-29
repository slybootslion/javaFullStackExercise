package com.slybootslion.missyou.core;

import com.slybootslion.missyou.exception.http.HttpException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionAdvice {

    // 处理未知异常
    @ExceptionHandler(value = Exception.class)
    public UnifyResponse handleException(HttpServletRequest req, Exception e) {
        UnifyResponse message = new UnifyResponse(9999, "服务器异常", "url");
        return message;
    }

    // 处理已知异常
    @ExceptionHandler(value = HttpException.class)
    public void handleHttpException(HttpServletRequest req, HttpException e) {

    }
}
