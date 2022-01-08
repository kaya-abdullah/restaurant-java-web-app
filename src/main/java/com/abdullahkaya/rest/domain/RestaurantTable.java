package com.abdullahkaya.rest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * This is table of Restaurant\n\n@author abdullahkaya
 */
@Entity
@Table(name = "restaurant_table")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RestaurantTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "table_count")
    private Integer tableCount;

    @ManyToOne
    @JsonIgnoreProperties(value = { "company" }, allowSetters = true)
    private Restaurant restaurant;

    @ManyToMany
    @JoinTable(
        name = "rel_restaurant_table__tables",
        joinColumns = @JoinColumn(name = "restaurant_table_id"),
        inverseJoinColumns = @JoinColumn(name = "tables_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "restaurantTables" }, allowSetters = true)
    private Set<SeatingTable> tables = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RestaurantTable id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTableCount() {
        return this.tableCount;
    }

    public RestaurantTable tableCount(Integer tableCount) {
        this.setTableCount(tableCount);
        return this;
    }

    public void setTableCount(Integer tableCount) {
        this.tableCount = tableCount;
    }

    public Restaurant getRestaurant() {
        return this.restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public RestaurantTable restaurant(Restaurant restaurant) {
        this.setRestaurant(restaurant);
        return this;
    }

    public Set<SeatingTable> getTables() {
        return this.tables;
    }

    public void setTables(Set<SeatingTable> seatingTables) {
        this.tables = seatingTables;
    }

    public RestaurantTable tables(Set<SeatingTable> seatingTables) {
        this.setTables(seatingTables);
        return this;
    }

    public RestaurantTable addTables(SeatingTable seatingTable) {
        this.tables.add(seatingTable);
        seatingTable.getRestaurantTables().add(this);
        return this;
    }

    public RestaurantTable removeTables(SeatingTable seatingTable) {
        this.tables.remove(seatingTable);
        seatingTable.getRestaurantTables().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RestaurantTable)) {
            return false;
        }
        return id != null && id.equals(((RestaurantTable) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RestaurantTable{" +
            "id=" + getId() +
            ", tableCount=" + getTableCount() +
            "}";
    }
}
