package com.carmen.security.controller;

import com.carmen.security.dto.DeviceCreateDto;
import com.carmen.security.dto.DeviceUpdateDto;
import com.carmen.security.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RequestMapping(value = "/api/device")
@RestController
public class DeviceController  {
    private final DeviceService deviceService;
    @Autowired
    public DeviceController(DeviceService deviceService){
        this.deviceService=deviceService;
    }
    @PostMapping
    public ResponseEntity<?> createDevice(@Valid @RequestBody DeviceCreateDto deviceDto) {
        try{
            return new ResponseEntity<>(deviceService.createDevice(deviceDto), HttpStatus.CREATED);
        }
        catch(Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        try{
            return new ResponseEntity<>(deviceService.getAllDevices(),HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable Long id) {
        try{
            return new ResponseEntity<>(deviceService.getDeviceByid(id),HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateDevice(@Valid @RequestBody DeviceUpdateDto deviceDto) {
        try{
            return new ResponseEntity<>(deviceService.updateDevice(deviceDto),HttpStatus.OK);
        }
        catch(Exception ex){
            return new  ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable Long id) {
        try{
            return new ResponseEntity<>(deviceService.deleteDevice(id),HttpStatus.OK);
        }
        catch(Exception ex){
            return new  ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/measurements/{id}")
    public ResponseEntity<?> getMeasurementsById(@PathVariable Long id) {
        return new ResponseEntity<>(deviceService.getMeasurementsById(id),HttpStatus.OK);
    }
}
