package com.carmen.security.handlers;


import com.carmen.security.handlers.exception.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value={ResourceNotFoundException.class})
    protected ResponseEntity<Object> handleApiExceptionResponse(ResourceNotFoundException ex) {
        return new ResponseEntity<>(new ResourceNotFoundException(ex.getResourceName(), ex.getFieldName(),ex.getFieldValue(),ex.getStatus()), HttpStatus.NOT_FOUND);
    }



    private ResponseEntity<Object> response(Exception ex, WebRequest request, String message) {
        return handleExceptionInternal(ex, message, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }


}
