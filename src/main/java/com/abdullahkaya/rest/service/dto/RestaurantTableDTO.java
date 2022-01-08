package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.RestaurantTable} entity.
 */
@Schema(description = "This is table of Restaurant\n\n@author abdullahkaya")
public class RestaurantTableDTO implements Serializable {

    private Long id;

    private Integer tableCount;

    private RestaurantDTO restaurant;

    private Set<SeatingTableDTO> tables = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTableCount() {
        return tableCount;
    }

    public void setTableCount(Integer tableCount) {
        this.tableCount = tableCount;
    }

    public RestaurantDTO getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantDTO restaurant) {
        this.restaurant = restaurant;
    }

    public Set<SeatingTableDTO> getTables() {
        return tables;
    }

    public void setTables(Set<SeatingTableDTO> tables) {
        this.tables = tables;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RestaurantTableDTO)) {
            return false;
        }

        RestaurantTableDTO restaurantTableDTO = (RestaurantTableDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, restaurantTableDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RestaurantTableDTO{" +
            "id=" + getId() +
            ", tableCount=" + getTableCount() +
            ", restaurant=" + getRestaurant() +
            ", tables=" + getTables() +
            "}";
    }
}
