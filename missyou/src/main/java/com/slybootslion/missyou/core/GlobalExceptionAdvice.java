package com.slybootslion.missyou.core;

import com.slybootslion.missyou.core.configuration.ExceptionCodeConfiguration;
import com.slybootslion.missyou.exception.http.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionAdvice {

    @Autowired
    private ExceptionCodeConfiguration codeConfiguration;

    // 处理未知异常
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public UnifyResponse handleException(HttpServletRequest req, Exception e) {
        String methodAndUri = MethodAndeUri(req);
        System.out.println(e);
        UnifyResponse message = new UnifyResponse(9999, "服务器异常", methodAndUri);
        return message;
    }

    // 处理已知异常
    @ExceptionHandler(value = HttpException.class)
    public ResponseEntity<UnifyResponse> handleHttpException(HttpServletRequest req, HttpException e) {
        String methodAndUri = MethodAndeUri(req);
        int code = e.getCode();
        UnifyResponse message = new UnifyResponse(code, codeConfiguration.getMessage(code), methodAndUri);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpStatus httpStatus = HttpStatus.resolve(e.getHttpStatusCode());
        ResponseEntity<UnifyResponse> r = new ResponseEntity(message, headers, httpStatus);
        return r;
    }

    // 参数校验异常处理
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public UnifyResponse handleBeanValidation(HttpServletRequest req, MethodArgumentNotValidException e) {
        String methodAndUri = MethodAndeUri(req);
        List<ObjectError> errors = e.getBindingResult().getAllErrors();
        String message = this.formatAllErrorMessage(errors);
        return new UnifyResponse(10001, message, methodAndUri);
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public UnifyResponse handleConstraintException(HttpServletRequest req, ConstraintViolationException e) {
        String methodAndUri = MethodAndeUri(req);
        String message = e.getMessage();
        return new UnifyResponse(10001, message, methodAndUri);
    }

    private String MethodAndeUri(HttpServletRequest req) {
        String uri = req.getRequestURI();
        String method = req.getMethod();
        return method + " " + uri;
    }

    private String formatAllErrorMessage(List<ObjectError> errors) {
        StringBuffer errorMsg = new StringBuffer();
        errors.forEach(error -> errorMsg.append(error.getDefaultMessage()).append(';')
        );
        return errorMsg.toString();
    }
}
