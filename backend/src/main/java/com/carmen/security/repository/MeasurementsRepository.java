package com.carmen.security.repository;

import com.carmen.security.model.Measurements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Set;

@Repository
public interface MeasurementsRepository extends JpaRepository<Measurements,Long> {
    Set<Measurements> getMeasurementsByTimeBetweenAndDevice_Id(Timestamp time, Timestamp time2, Long device_id);
}
