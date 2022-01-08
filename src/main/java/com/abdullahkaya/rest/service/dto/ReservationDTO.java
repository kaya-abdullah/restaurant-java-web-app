package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.Reservation} entity.
 */
@Schema(description = "Reservation Detail.\n\n@author abdullahkaya")
public class ReservationDTO implements Serializable {

    private Long id;

    /**
     * Date and Time of Reservation
     */
    @Schema(description = "Date and Time of Reservation")
    private Instant reservationDate;

    /**
     * How many people come
     */
    @Schema(description = "How many people come")
    private Integer personCount;

    /**
     * Reservation seating details
     */
    @Schema(description = "Reservation seating details")
    private String seatingInformation;

    private EmployeeDTO operator;

    private RestaurantDTO restaurant;

    private CustomerDTO customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(Instant reservationDate) {
        this.reservationDate = reservationDate;
    }

    public Integer getPersonCount() {
        return personCount;
    }

    public void setPersonCount(Integer personCount) {
        this.personCount = personCount;
    }

    public String getSeatingInformation() {
        return seatingInformation;
    }

    public void setSeatingInformation(String seatingInformation) {
        this.seatingInformation = seatingInformation;
    }

    public EmployeeDTO getOperator() {
        return operator;
    }

    public void setOperator(EmployeeDTO operator) {
        this.operator = operator;
    }

    public RestaurantDTO getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(RestaurantDTO restaurant) {
        this.restaurant = restaurant;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReservationDTO)) {
            return false;
        }

        ReservationDTO reservationDTO = (ReservationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, reservationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReservationDTO{" +
            "id=" + getId() +
            ", reservationDate='" + getReservationDate() + "'" +
            ", personCount=" + getPersonCount() +
            ", seatingInformation='" + getSeatingInformation() + "'" +
            ", operator=" + getOperator() +
            ", restaurant=" + getRestaurant() +
            ", customer=" + getCustomer() +
            "}";
    }
}
