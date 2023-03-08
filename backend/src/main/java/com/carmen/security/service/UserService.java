package com.carmen.security.service;

import com.carmen.security.dto.*;
import com.carmen.security.model.Device;
import com.carmen.security.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface UserService {
    UserResponse createUser(UserDto userDto);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUserClient(UserDtoUpdateClient userDtoUpdate);
    UserResponse updateUserAdmin(UserDtoUpdateAdmin userDtoUpdateAdmin);
    UserResponse deleteUser(Long id);

    String findByUsername(String username);
    Set<Device> listDevices(Long id);
    void addDevice(Long idUser,Long idDevice);
    void removeDevice(Long idDevice);


}
