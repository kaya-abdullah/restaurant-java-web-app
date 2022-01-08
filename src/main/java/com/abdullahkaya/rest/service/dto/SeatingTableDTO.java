package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.SeatingTable} entity.
 */
@Schema(description = "This is Seating Table Information\n\n@author abdullahkaya")
public class SeatingTableDTO implements Serializable {

    private Long id;

    /**
     * Type of Table
     */
    @Size(max = 200)
    @Schema(description = "Type of Table")
    private String tableType;

    /**
     * It contains number of Seat Table
     */
    @Schema(description = "It contains number of Seat Table")
    private Integer seatCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableType() {
        return tableType;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    public Integer getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(Integer seatCount) {
        this.seatCount = seatCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SeatingTableDTO)) {
            return false;
        }

        SeatingTableDTO seatingTableDTO = (SeatingTableDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, seatingTableDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SeatingTableDTO{" +
            "id=" + getId() +
            ", tableType='" + getTableType() + "'" +
            ", seatCount=" + getSeatCount() +
            "}";
    }
}
