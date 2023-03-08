package com.carmen.security.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name="measurements")
public class Measurements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm")
    private Timestamp time;
    private Float energy;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "device_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Device device;
    public Measurements(){}
    public Measurements(Timestamp time,Float energy,Device device){
        this.time=time;
        this.energy=energy;
        this.device=device;
    }
}
