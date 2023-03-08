package com.carmen.security.handlers.exception;


import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CustomException{
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue, HttpStatus status){
        super(resourceName,fieldName,fieldValue,status,String.format("%s not found with %s : %s",resourceName,fieldName,fieldValue));


    }

}