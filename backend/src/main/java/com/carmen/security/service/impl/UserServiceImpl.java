package com.carmen.security.service.impl;

import com.carmen.security.dto.*;
import com.carmen.security.handlers.exception.ResourceNotFoundException;
import com.carmen.security.model.Device;
import com.carmen.security.model.Role;
import com.carmen.security.model.User;
import com.carmen.security.repository.DeviceRepository;
import com.carmen.security.repository.UserRepository;
import com.carmen.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, DeviceRepository deviceRepository, PasswordEncoder passwordEncoder) {
        this.userRepository=userRepository;
        this.deviceRepository=deviceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse createUser(UserDto userDto) {
        String encodedPassword=this.passwordEncoder.encode(userDto.getPassword());
        User newUser=  User .builder()
                            .role(Role.covertStringToRole(userDto.getRole()))
                            .name(userDto.getName())
                            .username(userDto.getUsername())
                            .password(encodedPassword).build();

        User user=userRepository.save(newUser);
        return UserResponse.builder()
                            .name(user.getName())
                            .role(user.getRole())
                            .id(user.getId())
                            .username(user.getUsername())
                            .build();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<UserResponse> list=new ArrayList<>();
        for(User user:userRepository.findAll()){
            list.add(UserResponse.builder()
                    .name(user.getName())
                    .id(user.getId())
                    .role(user.getRole())
                    .username(user.getUsername()).build());
        }
        return list;
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user=userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User","Id",id, HttpStatus.NOT_FOUND));
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole())
                .username(user.getUsername())
                .build();

    }
    @Override
    public UserResponse updateUserClient(UserDtoUpdateClient userDtoUpdate) {
        User updateUser=userRepository.findById(userDtoUpdate.getId()).orElseThrow(()->new ResourceNotFoundException("User","Id",userDtoUpdate.getId(), HttpStatus.NOT_FOUND));
        if(!userDtoUpdate.getName().equals("") && userDtoUpdate.getName()!=null){
            updateUser.setName(userDtoUpdate.getName());
        }
        if(!userDtoUpdate.getPassword().equals("") && userDtoUpdate.getPassword()!=null){
            String encodedPassword=this.passwordEncoder.encode(userDtoUpdate.getPassword());
            updateUser.setPassword(encodedPassword);
        }
        if(!userDtoUpdate.getUsername().equals("") && userDtoUpdate.getUsername()!=null){
            updateUser.setUsername(userDtoUpdate.getUsername());
        }
        User user=userRepository.save(updateUser);
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole())
                .build();

    }

    @Override
    public UserResponse updateUserAdmin(UserDtoUpdateAdmin userDtoUpdate) {
        User updateUser=userRepository.findById(userDtoUpdate.getId()).orElseThrow(()->new ResourceNotFoundException("User","Id",userDtoUpdate.getId(), HttpStatus.NOT_FOUND));
        if(!userDtoUpdate.getName().equals("") && userDtoUpdate.getName()!=null){
            updateUser.setName(userDtoUpdate.getName());
        }
        if(!userDtoUpdate.getUsername().equals("") && userDtoUpdate.getUsername()!=null){
            updateUser.setUsername(userDtoUpdate.getUsername());
        }
        if(!userDtoUpdate.getRole().equals("") && userDtoUpdate.getRole()!=null){
            updateUser.setRole(Role.covertStringToRole(userDtoUpdate.getRole()));
        }
        userRepository.save(updateUser);
        User user=userRepository.save(updateUser);
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserResponse deleteUser(Long id) {
        User deleteUser=userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User","Id",id, HttpStatus.NOT_FOUND));
        for (Device device :deleteUser.getDevices()){
            device.setUser(null);
            deviceRepository.save(device);
        }
        deleteUser.setDevices(null);
        userRepository.delete(deleteUser);

        return UserResponse.builder()
                .id(deleteUser.getId())
                .name(deleteUser.getName())
                .role(deleteUser.getRole())
                .build();
    }


    @Override
    public String findByUsername(String username) {
        String userName;
        try{
            userName=userRepository.findByUsername(username).get().getUsername();
        }catch (Exception e){
            throw new ResourceNotFoundException("User", "Username", "", HttpStatus.NOT_FOUND);
        }
        return userName;
    }

    @Override
    public Set<Device> listDevices(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "Id", id, HttpStatus.NOT_FOUND));
        return user.getDevices();

    }

    @Override
    public void  addDevice(Long idUser, Long idDevice) {
        User user = userRepository.findById(idUser).orElseThrow(() -> new ResourceNotFoundException("User", "Id", idUser, HttpStatus.NOT_FOUND));
        Device device=deviceRepository.findById(idDevice).orElseThrow(() -> new ResourceNotFoundException("Device", "Id", idDevice, HttpStatus.NOT_FOUND));
        device.setUser(user);
        deviceRepository.save(device);

    }

    @Override
    public void  removeDevice(Long idDevice) {
        User user = userRepository.findById(1L).orElseThrow(() -> new ResourceNotFoundException("User", "Id", 1L, HttpStatus.NOT_FOUND));
        Device device=deviceRepository.findById(idDevice).orElseThrow(() -> new ResourceNotFoundException("Device", "Id", idDevice, HttpStatus.NOT_FOUND));
        device.setUser(user);
        deviceRepository.save(device);

    }


}
