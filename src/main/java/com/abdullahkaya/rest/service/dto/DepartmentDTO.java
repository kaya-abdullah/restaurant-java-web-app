package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.Department} entity.
 */
@Schema(
    description = "This is branch of the Department\nbranch some information like phone numbers\netc : operator, kitchen, accounting.\n@author abdullahkaya"
)
public class DepartmentDTO implements Serializable {

    private Long id;

    /**
     * Department name of the Restaurant
     */
    @NotNull
    @Size(max = 100)
    @Schema(description = "Department name of the Restaurant", required = true)
    private String name;

    /**
     * Department phone number of the Restaurant
     */
    @Size(max = 20)
    @Schema(description = "Department phone number of the Restaurant")
    private String phoneNumber;

    private RestaurantDTO restaurant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public RestaurantDTO getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantDTO restaurant) {
        this.restaurant = restaurant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DepartmentDTO)) {
            return false;
        }

        DepartmentDTO departmentDTO = (DepartmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, departmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DepartmentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", restaurant=" + getRestaurant() +
            "}";
    }
}
