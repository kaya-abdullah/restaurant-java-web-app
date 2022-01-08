package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.Location} entity.
 */
@Schema(description = "This is location list\n\n@author abdullahkaya")
public class LocationDTO implements Serializable {

    private Long id;

    /**
     * Location specific street address
     */
    @NotNull
    @Size(max = 100)
    @Schema(description = "Location specific street address", required = true)
    private String streetAddress;

    /**
     * Location postal address
     */
    @NotNull
    @Size(max = 100)
    @Schema(description = "Location postal address", required = true)
    private String postalCode;

    /**
     * State Province
     */
    @Size(max = 100)
    @Schema(description = "State Province")
    private String stateProvince;

    private RestaurantDTO restaurant;

    private CityDTO city;

    private CountryDTO country;

    private CompanyDTO company;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public RestaurantDTO getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantDTO restaurant) {
        this.restaurant = restaurant;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    public CompanyDTO getCompany() {
        return company;
    }

    public void setCompany(CompanyDTO company) {
        this.company = company;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocationDTO)) {
            return false;
        }

        LocationDTO locationDTO = (LocationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, locationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocationDTO{" +
            "id=" + getId() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            ", restaurant=" + getRestaurant() +
            ", city=" + getCity() +
            ", country=" + getCountry() +
            ", company=" + getCompany() +
            "}";
    }
}
