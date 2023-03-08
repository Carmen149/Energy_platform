package com.carmen.security.controller;

import com.carmen.security.dto.MeasurementsDto;
import com.carmen.security.service.MeasurementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RequestMapping(value = "/api/measurements")
@RestController

public class MeasurementsController{
    private final MeasurementsService measurementsService;
    @Autowired
    public MeasurementsController(MeasurementsService measurementsService){
        this.measurementsService=measurementsService;
    }
    @PostMapping
    public ResponseEntity<?> createMeasurement(@Valid @RequestBody MeasurementsDto measurementsDto) {
        try{
            return new ResponseEntity<>(measurementsService.createMeasurement(measurementsDto), HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllMeasurements() {
        try{
            return new ResponseEntity<>(measurementsService.getAllMeasurements(), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMeasurement(@Valid @RequestBody MeasurementsDto measurementsDto) {
        try{
            return new ResponseEntity<>(measurementsService.updateMeasurements(measurementsDto), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMeasurementById(@PathVariable Long id) {
        try{
            return new ResponseEntity<>(measurementsService.getMeasurementById(id), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeasurement(@PathVariable Long id) {
        try{
            return new ResponseEntity<>(measurementsService.deleteMeasurements(id), HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/time/{id}/{time1}/{time2}")
    public ResponseEntity<?> listMeasurementsForDevice(@PathVariable Long id,@PathVariable String time1, @PathVariable String time2) {
        return new ResponseEntity<>( measurementsService.listMeasurementsForDevice(id,time1,time2),HttpStatus.OK);
    }
}
