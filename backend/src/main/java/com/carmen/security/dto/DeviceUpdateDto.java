package com.carmen.security.dto;

import com.carmen.security.validators.UserNameConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceUpdateDto {
    @NotNull(message="Id is required")
    private Long id;
    @UserNameConstraint(message = "Name must be unique. It should  contain at least 3 characters")
    private String name;
    @NotNull(message="Description is required")
    @NotEmpty(message = "Description is required")
    private String description;
    @NotNull(message="Address is required")
    @NotEmpty(message = "Address is required")
    private String address;
    @NotNull(message="Energy is required")
    @Min(value=0, message="Energy must be a positive number")
    private Float maxEnergy;
    private Long userId;
}
