package com.abdullahkaya.rest.service.impl;

import com.abdullahkaya.rest.domain.SeatingTable;
import com.abdullahkaya.rest.repository.SeatingTableRepository;
import com.abdullahkaya.rest.service.SeatingTableService;
import com.abdullahkaya.rest.service.dto.SeatingTableDTO;
import com.abdullahkaya.rest.service.mapper.SeatingTableMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SeatingTable}.
 */
@Service
@Transactional
public class SeatingTableServiceImpl implements SeatingTableService {

    private final Logger log = LoggerFactory.getLogger(SeatingTableServiceImpl.class);

    private final SeatingTableRepository seatingTableRepository;

    private final SeatingTableMapper seatingTableMapper;

    public SeatingTableServiceImpl(SeatingTableRepository seatingTableRepository, SeatingTableMapper seatingTableMapper) {
        this.seatingTableRepository = seatingTableRepository;
        this.seatingTableMapper = seatingTableMapper;
    }

    @Override
    public SeatingTableDTO save(SeatingTableDTO seatingTableDTO) {
        log.debug("Request to save SeatingTable : {}", seatingTableDTO);
        SeatingTable seatingTable = seatingTableMapper.toEntity(seatingTableDTO);
        seatingTable = seatingTableRepository.save(seatingTable);
        return seatingTableMapper.toDto(seatingTable);
    }

    @Override
    public Optional<SeatingTableDTO> partialUpdate(SeatingTableDTO seatingTableDTO) {
        log.debug("Request to partially update SeatingTable : {}", seatingTableDTO);

        return seatingTableRepository
            .findById(seatingTableDTO.getId())
            .map(existingSeatingTable -> {
                seatingTableMapper.partialUpdate(existingSeatingTable, seatingTableDTO);

                return existingSeatingTable;
            })
            .map(seatingTableRepository::save)
            .map(seatingTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SeatingTableDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SeatingTables");
        return seatingTableRepository.findAll(pageable).map(seatingTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SeatingTableDTO> findOne(Long id) {
        log.debug("Request to get SeatingTable : {}", id);
        return seatingTableRepository.findById(id).map(seatingTableMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SeatingTable : {}", id);
        seatingTableRepository.deleteById(id);
    }
}
