package com.carmen.security.service.impl;

import com.carmen.security.dto.MeasurementsDto;
import com.carmen.security.handlers.exception.ResourceNotFoundException;
import com.carmen.security.model.Device;
import com.carmen.security.model.Measurements;
import com.carmen.security.repository.DeviceRepository;
import com.carmen.security.repository.MeasurementsRepository;
import com.carmen.security.service.MeasurementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Service
public class MeasurementsImpl implements MeasurementsService {
    private final MeasurementsRepository measurementsRepository;
    private final DeviceRepository deviceRepository;
    @Autowired
    public MeasurementsImpl(MeasurementsRepository measurementsRepository, DeviceRepository deviceRepository){
        this.measurementsRepository=measurementsRepository;
        this.deviceRepository=deviceRepository;
    }
    @Override
    public Measurements createMeasurement(MeasurementsDto measurementsDto) {
        Device device=deviceRepository.findById(measurementsDto.getDeviceId()).orElseThrow(()->new ResourceNotFoundException("Device","Id",measurementsDto.getDeviceId(), HttpStatus.NOT_FOUND));
        Measurements measurements=new Measurements(measurementsDto.getTime(),measurementsDto.getEnergy(),device);
        return measurementsRepository.save(measurements);
    }

    @Override
    public List<Measurements> getAllMeasurements() {
        return measurementsRepository.findAll();
    }

    @Override
    public Measurements updateMeasurements(MeasurementsDto measurementsDto) {
        Measurements updateMeasurements=measurementsRepository.findById(measurementsDto.getId()).orElseThrow(()->new ResourceNotFoundException("Measurement", "Id", measurementsDto.getId(),HttpStatus.NOT_FOUND));
        if(measurementsDto.getDeviceId()!=null){
            Device device=deviceRepository.findById(measurementsDto.getDeviceId()).orElseThrow(()->new ResourceNotFoundException("Device","Id",measurementsDto.getDeviceId(), HttpStatus.NOT_FOUND));
            updateMeasurements.setDevice(device);
        }
        if(measurementsDto.getEnergy()!=null){
            updateMeasurements.setEnergy(measurementsDto.getEnergy());
        }
        if(measurementsDto.getTime()!=null){
            updateMeasurements.setTime(measurementsDto.getTime());
        }
        return measurementsRepository.save(updateMeasurements);

    }

    @Override
    public Measurements deleteMeasurements(Long id) {
        Measurements measurements=measurementsRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Measurement", "Id", id,HttpStatus.NOT_FOUND));
        measurementsRepository.delete(measurements);
        return measurements;
    }


    public Set<Measurements> listMeasurementsForDevice(Long id, String time1, String time2) {
        deviceRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Device","Id",id, HttpStatus.NOT_FOUND));

        System.out.println(Long.parseLong( time1));
        System.out.println(Long.parseLong( time2));
        Timestamp t1=new Timestamp(Long.parseLong( time1));
        Timestamp t2=new Timestamp(Long.parseLong( time2));
        System.out.println(t1);
        System.out.println(t2);

        return measurementsRepository.getMeasurementsByTimeBetweenAndDevice_Id(t1,t2,id);

    }

    @Override
    public Measurements getMeasurementById(Long id) {
        return  measurementsRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Measurement", "Id", id,HttpStatus.NOT_FOUND));

    }
}