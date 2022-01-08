package com.abdullahkaya.rest.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RestaurantTableMapperTest {

    private RestaurantTableMapper restaurantTableMapper;

    @BeforeEach
    public void setUp() {
        restaurantTableMapper = new RestaurantTableMapperImpl();
    }
}
