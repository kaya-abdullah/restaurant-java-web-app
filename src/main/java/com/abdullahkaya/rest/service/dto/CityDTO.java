package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.City} entity.
 */
@Schema(description = "This is city list\n\n@author abdullahkaya")
public class CityDTO implements Serializable {

    private Long id;

    /**
     * City Name
     */
    @NotNull
    @Size(max = 100)
    @Schema(description = "City Name", required = true)
    private String name;

    /**
     * Some cities contains phone-prefix
     */
    @NotNull
    @Size(max = 10)
    @Schema(description = "Some cities contains phone-prefix", required = true)
    private String phonePrefix;

    private CountryDTO country;

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

    public String getPhonePrefix() {
        return phonePrefix;
    }

    public void setPhonePrefix(String phonePrefix) {
        this.phonePrefix = phonePrefix;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CityDTO)) {
            return false;
        }

        CityDTO cityDTO = (CityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phonePrefix='" + getPhonePrefix() + "'" +
            ", country=" + getCountry() +
            "}";
    }
}
