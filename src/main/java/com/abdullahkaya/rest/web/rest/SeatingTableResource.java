package com.abdullahkaya.rest.web.rest;

import com.abdullahkaya.rest.repository.SeatingTableRepository;
import com.abdullahkaya.rest.service.SeatingTableService;
import com.abdullahkaya.rest.service.dto.SeatingTableDTO;
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
 * REST controller for managing {@link com.abdullahkaya.rest.domain.SeatingTable}.
 */
@RestController
@RequestMapping("/api")
public class SeatingTableResource {

    private final Logger log = LoggerFactory.getLogger(SeatingTableResource.class);

    private static final String ENTITY_NAME = "seatingTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeatingTableService seatingTableService;

    private final SeatingTableRepository seatingTableRepository;

    public SeatingTableResource(SeatingTableService seatingTableService, SeatingTableRepository seatingTableRepository) {
        this.seatingTableService = seatingTableService;
        this.seatingTableRepository = seatingTableRepository;
    }

    /**
     * {@code POST  /seating-tables} : Create a new seatingTable.
     *
     * @param seatingTableDTO the seatingTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seatingTableDTO, or with status {@code 400 (Bad Request)} if the seatingTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seating-tables")
    public ResponseEntity<SeatingTableDTO> createSeatingTable(@Valid @RequestBody SeatingTableDTO seatingTableDTO)
        throws URISyntaxException {
        log.debug("REST request to save SeatingTable : {}", seatingTableDTO);
        if (seatingTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new seatingTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SeatingTableDTO result = seatingTableService.save(seatingTableDTO);
        return ResponseEntity
            .created(new URI("/api/seating-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seating-tables/:id} : Updates an existing seatingTable.
     *
     * @param id the id of the seatingTableDTO to save.
     * @param seatingTableDTO the seatingTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seatingTableDTO,
     * or with status {@code 400 (Bad Request)} if the seatingTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seatingTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seating-tables/{id}")
    public ResponseEntity<SeatingTableDTO> updateSeatingTable(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SeatingTableDTO seatingTableDTO
    ) throws URISyntaxException {
        log.debug("REST request to update SeatingTable : {}, {}", id, seatingTableDTO);
        if (seatingTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seatingTableDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!seatingTableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SeatingTableDTO result = seatingTableService.save(seatingTableDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seatingTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /seating-tables/:id} : Partial updates given fields of an existing seatingTable, field will ignore if it is null
     *
     * @param id the id of the seatingTableDTO to save.
     * @param seatingTableDTO the seatingTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seatingTableDTO,
     * or with status {@code 400 (Bad Request)} if the seatingTableDTO is not valid,
     * or with status {@code 404 (Not Found)} if the seatingTableDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the seatingTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/seating-tables/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SeatingTableDTO> partialUpdateSeatingTable(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SeatingTableDTO seatingTableDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update SeatingTable partially : {}, {}", id, seatingTableDTO);
        if (seatingTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seatingTableDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!seatingTableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SeatingTableDTO> result = seatingTableService.partialUpdate(seatingTableDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seatingTableDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /seating-tables} : get all the seatingTables.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seatingTables in body.
     */
    @GetMapping("/seating-tables")
    public ResponseEntity<List<SeatingTableDTO>> getAllSeatingTables(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of SeatingTables");
        Page<SeatingTableDTO> page = seatingTableService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /seating-tables/:id} : get the "id" seatingTable.
     *
     * @param id the id of the seatingTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seatingTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seating-tables/{id}")
    public ResponseEntity<SeatingTableDTO> getSeatingTable(@PathVariable Long id) {
        log.debug("REST request to get SeatingTable : {}", id);
        Optional<SeatingTableDTO> seatingTableDTO = seatingTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(seatingTableDTO);
    }

    /**
     * {@code DELETE  /seating-tables/:id} : delete the "id" seatingTable.
     *
     * @param id the id of the seatingTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seating-tables/{id}")
    public ResponseEntity<Void> deleteSeatingTable(@PathVariable Long id) {
        log.debug("REST request to delete SeatingTable : {}", id);
        seatingTableService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
