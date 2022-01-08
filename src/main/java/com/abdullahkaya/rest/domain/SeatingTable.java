package com.abdullahkaya.rest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * This is Seating Table Information\n\n@author abdullahkaya
 */
@Entity
@Table(name = "seating_table")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SeatingTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * Type of Table
     */
    @Size(max = 200)
    @Column(name = "table_type", length = 200)
    private String tableType;

    /**
     * It contains number of Seat Table
     */
    @Column(name = "seat_count")
    private Integer seatCount;

    @ManyToMany(mappedBy = "tables")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "restaurant", "tables" }, allowSetters = true)
    private Set<RestaurantTable> restaurantTables = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SeatingTable id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableType() {
        return this.tableType;
    }

    public SeatingTable tableType(String tableType) {
        this.setTableType(tableType);
        return this;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    public Integer getSeatCount() {
        return this.seatCount;
    }

    public SeatingTable seatCount(Integer seatCount) {
        this.setSeatCount(seatCount);
        return this;
    }

    public void setSeatCount(Integer seatCount) {
        this.seatCount = seatCount;
    }

    public Set<RestaurantTable> getRestaurantTables() {
        return this.restaurantTables;
    }

    public void setRestaurantTables(Set<RestaurantTable> restaurantTables) {
        if (this.restaurantTables != null) {
            this.restaurantTables.forEach(i -> i.removeTables(this));
        }
        if (restaurantTables != null) {
            restaurantTables.forEach(i -> i.addTables(this));
        }
        this.restaurantTables = restaurantTables;
    }

    public SeatingTable restaurantTables(Set<RestaurantTable> restaurantTables) {
        this.setRestaurantTables(restaurantTables);
        return this;
    }

    public SeatingTable addRestaurantTable(RestaurantTable restaurantTable) {
        this.restaurantTables.add(restaurantTable);
        restaurantTable.getTables().add(this);
        return this;
    }

    public SeatingTable removeRestaurantTable(RestaurantTable restaurantTable) {
        this.restaurantTables.remove(restaurantTable);
        restaurantTable.getTables().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SeatingTable)) {
            return false;
        }
        return id != null && id.equals(((SeatingTable) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SeatingTable{" +
            "id=" + getId() +
            ", tableType='" + getTableType() + "'" +
            ", seatCount=" + getSeatCount() +
            "}";
    }
}
