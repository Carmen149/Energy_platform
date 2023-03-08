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
public class DeviceCreateDto {

    @UserNameConstraint(message = "Name must be unic. It should  contain at least 3 characters")
    private String name;
    @NotNull(message="Description is required")
    @NotEmpty(message = "Description is required")
    private String description;
    @NotEmpty(message = "Address is required")
    @NotNull(message="Address is required")
    private String address;
    @NotNull(message="Energy is required")
    @Min(value=0, message="Energy must be a positive number")
    private Float maxEnergy;
    @Min(value=2, message="User id must be a positive number greater than 1")
    private Long userId;
}