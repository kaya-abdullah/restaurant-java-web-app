package com.abdullahkaya.rest.service;

import com.abdullahkaya.rest.service.dto.RestaurantTableDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.abdullahkaya.rest.domain.RestaurantTable}.
 */
public interface RestaurantTableService {
    /**
     * Save a restaurantTable.
     *
     * @param restaurantTableDTO the entity to save.
     * @return the persisted entity.
     */
    RestaurantTableDTO save(RestaurantTableDTO restaurantTableDTO);

    /**
     * Partially updates a restaurantTable.
     *
     * @param restaurantTableDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RestaurantTableDTO> partialUpdate(RestaurantTableDTO restaurantTableDTO);

    /**
     * Get all the restaurantTables.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RestaurantTableDTO> findAll(Pageable pageable);

    /**
     * Get all the restaurantTables with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RestaurantTableDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" restaurantTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RestaurantTableDTO> findOne(Long id);

    /**
     * Delete the "id" restaurantTable.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
