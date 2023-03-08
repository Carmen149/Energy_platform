package com.carmen.security.controller;

import com.carmen.security.dto.AuthDto;
import com.carmen.security.dto.UserDto;
import com.carmen.security.dto.UserDtoUpdateAdmin;
import com.carmen.security.dto.UserDtoUpdateClient;
import com.carmen.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RequestMapping(value = "/api/user")
@RestController
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService)
    {
        this.userService=userService;
    }
    @PostMapping

    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.createUser(userDto), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/client")
    public ResponseEntity<?> updateUserClient(@Valid @RequestBody UserDtoUpdateClient userDtoUpdate) {
        return new ResponseEntity<>(userService.updateUserClient(userDtoUpdate), HttpStatus.OK);
    }

    @PutMapping("/admin")
    public ResponseEntity<?> updateUserAdmin(@Valid @RequestBody UserDtoUpdateAdmin userDtoUpdate) {
        return new ResponseEntity<>(userService.updateUserAdmin(userDtoUpdate), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> getDevices(@PathVariable Long id) {
        return new ResponseEntity<>(userService.listDevices(id), HttpStatus.OK);
    }


    @GetMapping("/username/{username}")
    public ResponseEntity<?> findByUsername(String username) {
        return new ResponseEntity<>(userService.findByUsername(username),HttpStatus.OK);
    }
    @GetMapping("add/{idUser}/{idDevice}")
    public ResponseEntity<?>addDevice(@PathVariable Long idUser,@PathVariable Long idDevice){
        userService.addDevice(idUser,idDevice);
        return new ResponseEntity<>( "Device added",HttpStatus.OK);
    }
    @GetMapping("remove/{idDevice}")
    public ResponseEntity<?>removeDevice(@PathVariable Long idDevice){
        userService.removeDevice(idDevice);
        return new ResponseEntity<>(  "Device removed",HttpStatus.OK);
    }
}
