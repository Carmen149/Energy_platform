package com.carmen.security.service.impl;

import com.carmen.security.dto.DeviceCreateDto;
import com.carmen.security.dto.DeviceUpdateDto;
import com.carmen.security.handlers.exception.ResourceNotFoundException;
import com.carmen.security.model.Device;
import com.carmen.security.model.Measurements;
import com.carmen.security.model.User;
import com.carmen.security.repository.DeviceRepository;
import com.carmen.security.repository.UserRepository;
import com.carmen.security.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class DeviceServiceImpl implements DeviceService {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    @Autowired
    public DeviceServiceImpl(DeviceRepository deviceRepository, UserRepository userRepository){
        this.deviceRepository=deviceRepository;
        this.userRepository=userRepository;
    }
    @Override
    public Device createDevice(DeviceCreateDto deviceDto) {
        User user;
        if(deviceDto.getUserId()!=null){
            user=userRepository.findById(deviceDto.getUserId()).orElseThrow(()->new ResourceNotFoundException("User","Id",deviceDto.getUserId(), HttpStatus.NOT_FOUND));
        }
        else{
            user=null;
        }
        Device device= new Device(deviceDto.getName(),deviceDto.getDescription(),deviceDto.getAddress(),deviceDto.getMaxEnergy(),user);
        return deviceRepository.save(device);
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device getDeviceByid(Long id) {
        return deviceRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Device","Id",id, HttpStatus.NOT_FOUND));
    }

    @Override
    public Device updateDevice(DeviceUpdateDto deviceDto) {

        Device device=deviceRepository.findById(deviceDto.getId()).orElseThrow(()->new ResourceNotFoundException("Device","Id",deviceDto.getId(), HttpStatus.NOT_FOUND));
        User user;
        if(deviceDto.getUserId()!=null){
            if(deviceDto.getUserId()==0){
                user= userRepository.findById(1L).orElseThrow(()->new ResourceNotFoundException("User","Id",deviceDto.getUserId(), HttpStatus.NOT_FOUND));

            }else{
                user= userRepository.findById(deviceDto.getUserId()).orElseThrow(()->new ResourceNotFoundException("User","Id",deviceDto.getUserId(), HttpStatus.NOT_FOUND));

            }
        }
        else{
            user= userRepository.findById(1L).orElseThrow(()->new ResourceNotFoundException("User","Id",deviceDto.getUserId(), HttpStatus.NOT_FOUND));

        }
        device.setUser(user);
        if(deviceDto.getAddress()!=null && !deviceDto.getAddress().equals("")){
            device.setAddress(deviceDto.getAddress());
        }
        if(deviceDto.getDescription()!=null && !deviceDto.getDescription().equals("")){
            device.setDescription(deviceDto.getDescription());
        }
        if(deviceDto.getMaxEnergy()!=null){
            device.setMaxEnergy(deviceDto.getMaxEnergy());
        }
        if(deviceDto.getName()!=null && !deviceDto.getName().equals("")){
            device.setName(deviceDto.getName());
        }
        return deviceRepository.save(device);
    }

    @Override
    public Device deleteDevice(Long id) {
        Device device=deviceRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Device","Id",id, HttpStatus.NOT_FOUND));
        deviceRepository.delete(device);
        return device;
    }

    @Override
    public Set<Measurements> getMeasurementsById(Long id) {
        Device device=deviceRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Device","Id",id, HttpStatus.NOT_FOUND));
        return device.getMeasurements();
    }



}
