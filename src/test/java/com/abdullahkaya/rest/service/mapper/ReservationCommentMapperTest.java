package com.abdullahkaya.rest.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReservationCommentMapperTest {

    private ReservationCommentMapper reservationCommentMapper;

    @BeforeEach
    public void setUp() {
        reservationCommentMapper = new ReservationCommentMapperImpl();
    }
}
