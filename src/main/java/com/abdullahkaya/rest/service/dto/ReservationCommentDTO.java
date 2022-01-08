package com.abdullahkaya.rest.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.abdullahkaya.rest.domain.ReservationComment} entity.
 */
@Schema(description = "Reservation Comment.\n\n@author abdullahkaya")
public class ReservationCommentDTO implements Serializable {

    private Long id;

    /**
     * comment entry date
     */
    @Schema(description = "comment entry date")
    private Instant commentDate;

    /**
     * Comment Detail
     */
    @Size(max = 4000)
    @Schema(description = "Comment Detail")
    private String operatorNote;

    private ReservationDTO reservation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Instant commentDate) {
        this.commentDate = commentDate;
    }

    public String getOperatorNote() {
        return operatorNote;
    }

    public void setOperatorNote(String operatorNote) {
        this.operatorNote = operatorNote;
    }

    public ReservationDTO getReservation() {
        return reservation;
    }

    public void setReservation(ReservationDTO reservation) {
        this.reservation = reservation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReservationCommentDTO)) {
            return false;
        }

        ReservationCommentDTO reservationCommentDTO = (ReservationCommentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, reservationCommentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReservationCommentDTO{" +
            "id=" + getId() +
            ", commentDate='" + getCommentDate() + "'" +
            ", operatorNote='" + getOperatorNote() + "'" +
            ", reservation=" + getReservation() +
            "}";
    }
}
