package com.carmen.security.service;

import com.carmen.security.dto.MeasurementsDto;
import com.carmen.security.model.Measurements;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MeasurementsService {
    Measurements createMeasurement(MeasurementsDto measurementsDto);
    List<Measurements> getAllMeasurements();
    Measurements updateMeasurements(MeasurementsDto measurementsDto);
    Measurements deleteMeasurements( Long id);

    Measurements getMeasurementById(Long id);
    Object listMeasurementsForDevice(Long id, String time1, String time2);
}
