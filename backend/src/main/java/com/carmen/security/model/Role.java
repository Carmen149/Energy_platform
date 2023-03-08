package com.carmen.security.model;

public enum Role {
    ADMIN,
    USER;
    public static Role covertStringToRole(String role){
        String newRole=role.toUpperCase();
        if(newRole.equals("ADMIN")){
            return Role.ADMIN;
        }
        else if(newRole.equals("USER")){
            return Role.USER;
        }
        return null;
    }
}
