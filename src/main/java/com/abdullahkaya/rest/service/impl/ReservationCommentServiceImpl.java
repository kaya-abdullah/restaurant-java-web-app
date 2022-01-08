package com.abdullahkaya.rest.service.impl;

import com.abdullahkaya.rest.domain.ReservationComment;
import com.abdullahkaya.rest.repository.ReservationCommentRepository;
import com.abdullahkaya.rest.service.ReservationCommentService;
import com.abdullahkaya.rest.service.dto.ReservationCommentDTO;
import com.abdullahkaya.rest.service.mapper.ReservationCommentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ReservationComment}.
 */
@Service
@Transactional
public class ReservationCommentServiceImpl implements ReservationCommentService {

    private final Logger log = LoggerFactory.getLogger(ReservationCommentServiceImpl.class);

    private final ReservationCommentRepository reservationCommentRepository;

    private final ReservationCommentMapper reservationCommentMapper;

    public ReservationCommentServiceImpl(
        ReservationCommentRepository reservationCommentRepository,
        ReservationCommentMapper reservationCommentMapper
    ) {
        this.reservationCommentRepository = reservationCommentRepository;
        this.reservationCommentMapper = reservationCommentMapper;
    }

    @Override
    public ReservationCommentDTO save(ReservationCommentDTO reservationCommentDTO) {
        log.debug("Request to save ReservationComment : {}", reservationCommentDTO);
        ReservationComment reservationComment = reservationCommentMapper.toEntity(reservationCommentDTO);
        reservationComment = reservationCommentRepository.save(reservationComment);
        return reservationCommentMapper.toDto(reservationComment);
    }

    @Override
    public Optional<ReservationCommentDTO> partialUpdate(ReservationCommentDTO reservationCommentDTO) {
        log.debug("Request to partially update ReservationComment : {}", reservationCommentDTO);

        return reservationCommentRepository
            .findById(reservationCommentDTO.getId())
            .map(existingReservationComment -> {
                reservationCommentMapper.partialUpdate(existingReservationComment, reservationCommentDTO);

                return existingReservationComment;
            })
            .map(reservationCommentRepository::save)
            .map(reservationCommentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReservationCommentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReservationComments");
        return reservationCommentRepository.findAll(pageable).map(reservationCommentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReservationCommentDTO> findOne(Long id) {
        log.debug("Request to get ReservationComment : {}", id);
        return reservationCommentRepository.findById(id).map(reservationCommentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReservationComment : {}", id);
        reservationCommentRepository.deleteById(id);
    }
}
