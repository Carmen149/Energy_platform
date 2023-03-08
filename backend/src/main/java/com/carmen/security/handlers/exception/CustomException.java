package com.carmen.security.handlers.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import org.springframework.http.HttpStatus;

@Builder
@JsonIgnoreProperties(value={"stackTrace","suppressed","cause","localizedMessage"}) //scoatem field-urile mostenite care nu ne intereseaza
public class CustomException  extends RuntimeException{
    private String resourceName;
    private String fieldName;
    private Object fieldValue;
    private HttpStatus status;

    private String message;
    public CustomException(String resourceName,String fieldName,Object fieldValue,HttpStatus status,String message){
        super(message);
        this.fieldName=fieldName;
        this.fieldValue=fieldValue;
        this.resourceName=resourceName;
        this.status=status;
        this.message=message;
    }

    public String getResourceName() {
        return resourceName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }

    public String getFieldName() {
        return fieldName;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
