package com.carmen.security.service;

import com.carmen.security.dto.DeviceCreateDto;
import com.carmen.security.dto.DeviceUpdateDto;
import com.carmen.security.model.Device;
import com.carmen.security.model.Measurements;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface DeviceService {
    Device createDevice(DeviceCreateDto deviceDto);
    List<Device> getAllDevices();
    Device getDeviceByid(Long id);
    Device updateDevice(DeviceUpdateDto deviceDto);
    Device deleteDevice(Long id);
    Set<Measurements> getMeasurementsById(Long id);




}
