package com.abdullahkaya.rest.service;

import com.abdullahkaya.rest.service.dto.SeatingTableDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.abdullahkaya.rest.domain.SeatingTable}.
 */
public interface SeatingTableService {
    /**
     * Save a seatingTable.
     *
     * @param seatingTableDTO the entity to save.
     * @return the persisted entity.
     */
    SeatingTableDTO save(SeatingTableDTO seatingTableDTO);

    /**
     * Partially updates a seatingTable.
     *
     * @param seatingTableDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SeatingTableDTO> partialUpdate(SeatingTableDTO seatingTableDTO);

    /**
     * Get all the seatingTables.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SeatingTableDTO> findAll(Pageable pageable);

    /**
     * Get the "id" seatingTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SeatingTableDTO> findOne(Long id);

    /**
     * Delete the "id" seatingTable.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
