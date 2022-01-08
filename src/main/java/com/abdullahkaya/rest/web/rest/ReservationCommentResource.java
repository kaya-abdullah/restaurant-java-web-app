package com.abdullahkaya.rest.web.rest;

import com.abdullahkaya.rest.repository.ReservationCommentRepository;
import com.abdullahkaya.rest.service.ReservationCommentService;
import com.abdullahkaya.rest.service.dto.ReservationCommentDTO;
import com.abdullahkaya.rest.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.abdullahkaya.rest.domain.ReservationComment}.
 */
@RestController
@RequestMapping("/api")
public class ReservationCommentResource {

    private final Logger log = LoggerFactory.getLogger(ReservationCommentResource.class);

    private static final String ENTITY_NAME = "reservationComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReservationCommentService reservationCommentService;

    private final ReservationCommentRepository reservationCommentRepository;

    public ReservationCommentResource(
        ReservationCommentService reservationCommentService,
        ReservationCommentRepository reservationCommentRepository
    ) {
        this.reservationCommentService = reservationCommentService;
        this.reservationCommentRepository = reservationCommentRepository;
    }

    /**
     * {@code POST  /reservation-comments} : Create a new reservationComment.
     *
     * @param reservationCommentDTO the reservationCommentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reservationCommentDTO, or with status {@code 400 (Bad Request)} if the reservationComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reservation-comments")
    public ResponseEntity<ReservationCommentDTO> createReservationComment(@Valid @RequestBody ReservationCommentDTO reservationCommentDTO)
        throws URISyntaxException {
        log.debug("REST request to save ReservationComment : {}", reservationCommentDTO);
        if (reservationCommentDTO.getId() != null) {
            throw new BadRequestAlertException("A new reservationComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReservationCommentDTO result = reservationCommentService.save(reservationCommentDTO);
        return ResponseEntity
            .created(new URI("/api/reservation-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reservation-comments/:id} : Updates an existing reservationComment.
     *
     * @param id the id of the reservationCommentDTO to save.
     * @param reservationCommentDTO the reservationCommentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reservationCommentDTO,
     * or with status {@code 400 (Bad Request)} if the reservationCommentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reservationCommentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reservation-comments/{id}")
    public ResponseEntity<ReservationCommentDTO> updateReservationComment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ReservationCommentDTO reservationCommentDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ReservationComment : {}, {}", id, reservationCommentDTO);
        if (reservationCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reservationCommentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reservationCommentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReservationCommentDTO result = reservationCommentService.save(reservationCommentDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reservationCommentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reservation-comments/:id} : Partial updates given fields of an existing reservationComment, field will ignore if it is null
     *
     * @param id the id of the reservationCommentDTO to save.
     * @param reservationCommentDTO the reservationCommentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reservationCommentDTO,
     * or with status {@code 400 (Bad Request)} if the reservationCommentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the reservationCommentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the reservationCommentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reservation-comments/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReservationCommentDTO> partialUpdateReservationComment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ReservationCommentDTO reservationCommentDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ReservationComment partially : {}, {}", id, reservationCommentDTO);
        if (reservationCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reservationCommentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reservationCommentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReservationCommentDTO> result = reservationCommentService.partialUpdate(reservationCommentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reservationCommentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /reservation-comments} : get all the reservationComments.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reservationComments in body.
     */
    @GetMapping("/reservation-comments")
    public ResponseEntity<List<ReservationCommentDTO>> getAllReservationComments(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of ReservationComments");
        Page<ReservationCommentDTO> page = reservationCommentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reservation-comments/:id} : get the "id" reservationComment.
     *
     * @param id the id of the reservationCommentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reservationCommentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reservation-comments/{id}")
    public ResponseEntity<ReservationCommentDTO> getReservationComment(@PathVariable Long id) {
        log.debug("REST request to get ReservationComment : {}", id);
        Optional<ReservationCommentDTO> reservationCommentDTO = reservationCommentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reservationCommentDTO);
    }

    /**
     * {@code DELETE  /reservation-comments/:id} : delete the "id" reservationComment.
     *
     * @param id the id of the reservationCommentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reservation-comments/{id}")
    public ResponseEntity<Void> deleteReservationComment(@PathVariable Long id) {
        log.debug("REST request to delete ReservationComment : {}", id);
        reservationCommentService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
