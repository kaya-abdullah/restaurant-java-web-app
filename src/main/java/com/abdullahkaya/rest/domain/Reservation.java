package com.abdullahkaya.rest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Reservation Detail.\n\n@author abdullahkaya
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * Date and Time of Reservation
     */
    @Column(name = "reservation_date")
    private Instant reservationDate;

    /**
     * How many people come
     */
    @Column(name = "person_count")
    private Integer personCount;

    /**
     * Reservation seating details
     */
    @Column(name = "seating_information")
    private String seatingInformation;

    @ManyToOne
    @JsonIgnoreProperties(value = { "jobs", "manager", "department" }, allowSetters = true)
    private Employee operator;

    @ManyToOne
    @JsonIgnoreProperties(value = { "company" }, allowSetters = true)
    private Restaurant restaurant;

    @ManyToOne
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Reservation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getReservationDate() {
        return this.reservationDate;
    }

    public Reservation reservationDate(Instant reservationDate) {
        this.setReservationDate(reservationDate);
        return this;
    }

    public void setReservationDate(Instant reservationDate) {
        this.reservationDate = reservationDate;
    }

    public Integer getPersonCount() {
        return this.personCount;
    }

    public Reservation personCount(Integer personCount) {
        this.setPersonCount(personCount);
        return this;
    }

    public void setPersonCount(Integer personCount) {
        this.personCount = personCount;
    }

    public String getSeatingInformation() {
        return this.seatingInformation;
    }

    public Reservation seatingInformation(String seatingInformation) {
        this.setSeatingInformation(seatingInformation);
        return this;
    }

    public void setSeatingInformation(String seatingInformation) {
        this.seatingInformation = seatingInformation;
    }

    public Employee getOperator() {
        return this.operator;
    }

    public void setOperator(Employee employee) {
        this.operator = employee;
    }

    public Reservation operator(Employee employee) {
        this.setOperator(employee);
        return this;
    }

    public Restaurant getRestaurant() {
        return this.restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Reservation restaurant(Restaurant restaurant) {
        this.setRestaurant(restaurant);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Reservation customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return id != null && id.equals(((Reservation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", reservationDate='" + getReservationDate() + "'" +
            ", personCount=" + getPersonCount() +
            ", seatingInformation='" + getSeatingInformation() + "'" +
            "}";
    }
}
