package com.abdullahkaya.rest.service;

import com.abdullahkaya.rest.service.dto.ReservationCommentDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.abdullahkaya.rest.domain.ReservationComment}.
 */
public interface ReservationCommentService {
    /**
     * Save a reservationComment.
     *
     * @param reservationCommentDTO the entity to save.
     * @return the persisted entity.
     */
    ReservationCommentDTO save(ReservationCommentDTO reservationCommentDTO);

    /**
     * Partially updates a reservationComment.
     *
     * @param reservationCommentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReservationCommentDTO> partialUpdate(ReservationCommentDTO reservationCommentDTO);

    /**
     * Get all the reservationComments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReservationCommentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" reservationComment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReservationCommentDTO> findOne(Long id);

    /**
     * Delete the "id" reservationComment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
