package com.carmen.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name="device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    @Column(unique=true, length = 30)
    private String name;
    private String address;
    private Float maxEnergy;
    private Float energyPerHour;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    @JsonIgnore
    @OneToMany(mappedBy="device", fetch=FetchType.EAGER,
            cascade=CascadeType.ALL)
    private Set<Measurements> measurements;
    public Device(){}
    public Device(String name,String description,String address,Float maxEnergy, User user){
        this.name=name;
        this.description=description;
        this.address=address;
        this.maxEnergy=maxEnergy;
        this.user=user;
        this.energyPerHour=0f;
        this.measurements=new HashSet<>();
    }

}
