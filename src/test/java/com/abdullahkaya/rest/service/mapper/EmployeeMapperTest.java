package com.abdullahkaya.rest.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EmployeeMapperTest {

    private EmployeeMapper employeeMapper;

    @BeforeEach
    public void setUp() {
        employeeMapper = new EmployeeMapperImpl();
    }
}