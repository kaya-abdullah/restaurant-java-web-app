package com.abdullahkaya.rest.service.impl;

import com.abdullahkaya.rest.domain.RestaurantTable;
import com.abdullahkaya.rest.repository.RestaurantTableRepository;
import com.abdullahkaya.rest.service.RestaurantTableService;
import com.abdullahkaya.rest.service.dto.RestaurantTableDTO;
import com.abdullahkaya.rest.service.mapper.RestaurantTableMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RestaurantTable}.
 */
@Service
@Transactional
public class RestaurantTableServiceImpl implements RestaurantTableService {

    private final Logger log = LoggerFactory.getLogger(RestaurantTableServiceImpl.class);

    private final RestaurantTableRepository restaurantTableRepository;

    private final RestaurantTableMapper restaurantTableMapper;

    public RestaurantTableServiceImpl(RestaurantTableRepository restaurantTableRepository, RestaurantTableMapper restaurantTableMapper) {
        this.restaurantTableRepository = restaurantTableRepository;
        this.restaurantTableMapper = restaurantTableMapper;
    }

    @Override
    public RestaurantTableDTO save(RestaurantTableDTO restaurantTableDTO) {
        log.debug("Request to save RestaurantTable : {}", restaurantTableDTO);
        RestaurantTable restaurantTable = restaurantTableMapper.toEntity(restaurantTableDTO);
        restaurantTable = restaurantTableRepository.save(restaurantTable);
        return restaurantTableMapper.toDto(restaurantTable);
    }

    @Override
    public Optional<RestaurantTableDTO> partialUpdate(RestaurantTableDTO restaurantTableDTO) {
        log.debug("Request to partially update RestaurantTable : {}", restaurantTableDTO);

        return restaurantTableRepository
            .findById(restaurantTableDTO.getId())
            .map(existingRestaurantTable -> {
                restaurantTableMapper.partialUpdate(existingRestaurantTable, restaurantTableDTO);

                return existingRestaurantTable;
            })
            .map(restaurantTableRepository::save)
            .map(restaurantTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RestaurantTableDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RestaurantTables");
        return restaurantTableRepository.findAll(pageable).map(restaurantTableMapper::toDto);
    }

    public Page<RestaurantTableDTO> findAllWithEagerRelationships(Pageable pageable) {
        return restaurantTableRepository.findAllWithEagerRelationships(pageable).map(restaurantTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RestaurantTableDTO> findOne(Long id) {
        log.debug("Request to get RestaurantTable : {}", id);
        return restaurantTableRepository.findOneWithEagerRelationships(id).map(restaurantTableMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RestaurantTable : {}", id);
        restaurantTableRepository.deleteById(id);
    }
}
