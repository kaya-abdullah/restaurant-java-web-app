package com.abdullahkaya.rest.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RestaurantTableDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantTableDTO.class);
        RestaurantTableDTO restaurantTableDTO1 = new RestaurantTableDTO();
        restaurantTableDTO1.setId(1L);
        RestaurantTableDTO restaurantTableDTO2 = new RestaurantTableDTO();
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
        restaurantTableDTO2.setId(restaurantTableDTO1.getId());
        assertThat(restaurantTableDTO1).isEqualTo(restaurantTableDTO2);
        restaurantTableDTO2.setId(2L);
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
        restaurantTableDTO1.setId(null);
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
    }
}
