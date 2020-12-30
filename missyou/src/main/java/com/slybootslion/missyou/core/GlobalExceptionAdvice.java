package com.slybootslion.missyou.core;

import com.slybootslion.missyou.core.configuration.ExceptionCodeConfiguration;
import com.slybootslion.missyou.exception.http.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionAdvice {

    @Autowired
    private ExceptionCodeConfiguration codeConfiguration;

    // 处理未知异常
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public UnifyResponse handleException(HttpServletRequest req, Exception e) {
        String[] uriAndMethod = this.getReqUriAndMethod(req);
        System.out.println(e);
        UnifyResponse message = new UnifyResponse(9999, "服务器异常", uriAndMethod[1] + " " + uriAndMethod[0]);
        return message;
    }

    // 处理已知异常
    @ExceptionHandler(value = HttpException.class)
    public ResponseEntity<UnifyResponse> handleHttpException(HttpServletRequest req, HttpException e) {
        String[] uriAndMethod = this.getReqUriAndMethod(req);
        int code = e.getCode();
        UnifyResponse message = new UnifyResponse(code, codeConfiguration.getMessage(code), uriAndMethod[1] + " " + uriAndMethod[0]);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpStatus httpStatus = HttpStatus.resolve(e.getHttpStatusCode());
        ResponseEntity<UnifyResponse> r = new ResponseEntity(message, headers, httpStatus);
        return r;
    }

    private String[] getReqUriAndMethod(HttpServletRequest req) {
        String uri = req.getRequestURI();
        String method = req.getMethod();
        return new String[]{uri, method};
    }
}
