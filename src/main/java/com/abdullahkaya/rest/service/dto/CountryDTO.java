package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.Country} entity.
 */
@Schema(description = "This is country list\n\n@author abdullahkaya")
public class CountryDTO implements Serializable {

    private Long id;

    /**
     * Country Name
     */
    @NotNull
    @Size(max = 100)
    @Schema(description = "Country Name", required = true)
    private String name;

    /**
     * ISO-codes: US, GB, TR, CN...  https:
     */
    @NotNull
    @Size(max = 10)
    @Schema(description = "ISO-codes: US, GB, TR, CN...  https:", required = true)
    private String isoCode;

    /**
     * The international phone +1, +90... https:
     */
    @NotNull
    @Size(max = 10)
    @Schema(description = "The international phone +1, +90... https:", required = true)
    private String phonePrefix;

    /**
     * Country flag url.
     */
    @Size(max = 4000)
    @Schema(description = "Country flag url.")
    private String iconUrl;

    private RegionDTO region;

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

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getPhonePrefix() {
        return phonePrefix;
    }

    public void setPhonePrefix(String phonePrefix) {
        this.phonePrefix = phonePrefix;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public RegionDTO getRegion() {
        return region;
    }

    public void setRegion(RegionDTO region) {
        this.region = region;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CountryDTO)) {
            return false;
        }

        CountryDTO countryDTO = (CountryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, countryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CountryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isoCode='" + getIsoCode() + "'" +
            ", phonePrefix='" + getPhonePrefix() + "'" +
            ", iconUrl='" + getIconUrl() + "'" +
            ", region=" + getRegion() +
            "}";
    }
}
