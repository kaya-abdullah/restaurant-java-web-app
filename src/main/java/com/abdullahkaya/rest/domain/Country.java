package com.abdullahkaya.rest.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * This is country list\n\n@author abdullahkaya
 */
@Entity
@Table(name = "country")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * Country Name
     */
    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    /**
     * ISO-codes: US, GB, TR, CN...  https:
     */
    @NotNull
    @Size(max = 10)
    @Column(name = "iso_code", length = 10, nullable = false)
    private String isoCode;

    /**
     * The international phone +1, +90... https:
     */
    @NotNull
    @Size(max = 10)
    @Column(name = "phone_prefix", length = 10, nullable = false)
    private String phonePrefix;

    /**
     * Country flag url.
     */
    @Size(max = 4000)
    @Column(name = "icon_url", length = 4000)
    private String iconUrl;

    @ManyToOne
    private Region region;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Country id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Country name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsoCode() {
        return this.isoCode;
    }

    public Country isoCode(String isoCode) {
        this.setIsoCode(isoCode);
        return this;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getPhonePrefix() {
        return this.phonePrefix;
    }

    public Country phonePrefix(String phonePrefix) {
        this.setPhonePrefix(phonePrefix);
        return this;
    }

    public void setPhonePrefix(String phonePrefix) {
        this.phonePrefix = phonePrefix;
    }

    public String getIconUrl() {
        return this.iconUrl;
    }

    public Country iconUrl(String iconUrl) {
        this.setIconUrl(iconUrl);
        return this;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public Region getRegion() {
        return this.region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Country region(Region region) {
        this.setRegion(region);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Country)) {
            return false;
        }
        return id != null && id.equals(((Country) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isoCode='" + getIsoCode() + "'" +
            ", phonePrefix='" + getPhonePrefix() + "'" +
            ", iconUrl='" + getIconUrl() + "'" +
            "}";
    }
}
