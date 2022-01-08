package com.abdullahkaya.rest.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SeatingTableMapperTest {

    private SeatingTableMapper seatingTableMapper;

    @BeforeEach
    public void setUp() {
        seatingTableMapper = new SeatingTableMapperImpl();
    }
}
