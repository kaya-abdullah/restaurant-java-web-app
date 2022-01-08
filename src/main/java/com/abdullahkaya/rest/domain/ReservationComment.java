package com.abdullahkaya.rest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Reservation Comment.\n\n@author abdullahkaya
 */
@Entity
@Table(name = "reservation_comment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReservationComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * comment entry date
     */
    @Column(name = "comment_date")
    private Instant commentDate;

    /**
     * Comment Detail
     */
    @Size(max = 4000)
    @Column(name = "operator_note", length = 4000)
    private String operatorNote;

    @ManyToOne
    @JsonIgnoreProperties(value = { "operator", "restaurant", "customer" }, allowSetters = true)
    private Reservation reservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ReservationComment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCommentDate() {
        return this.commentDate;
    }

    public ReservationComment commentDate(Instant commentDate) {
        this.setCommentDate(commentDate);
        return this;
    }

    public void setCommentDate(Instant commentDate) {
        this.commentDate = commentDate;
    }

    public String getOperatorNote() {
        return this.operatorNote;
    }

    public ReservationComment operatorNote(String operatorNote) {
        this.setOperatorNote(operatorNote);
        return this;
    }

    public void setOperatorNote(String operatorNote) {
        this.operatorNote = operatorNote;
    }

    public Reservation getReservation() {
        return this.reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public ReservationComment reservation(Reservation reservation) {
        this.setReservation(reservation);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReservationComment)) {
            return false;
        }
        return id != null && id.equals(((ReservationComment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReservationComment{" +
            "id=" + getId() +
            ", commentDate='" + getCommentDate() + "'" +
            ", operatorNote='" + getOperatorNote() + "'" +
            "}";
    }
}
