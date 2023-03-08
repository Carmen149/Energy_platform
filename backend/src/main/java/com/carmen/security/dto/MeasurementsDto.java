package com.carmen.security.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MeasurementsDto {
    private Long id;
    @NotNull(message = "Time is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm")
    private Timestamp time;
    @NotNull
    @NotNull(message="Energy is required")
    @Min(value=0, message="Energy must be a positive number")
    private Float energy;
    @NotNull(message="Device Id is required")
    @Min(value=1,message="Device id must be a positive number greater than 0")
    private Long deviceId;
}
