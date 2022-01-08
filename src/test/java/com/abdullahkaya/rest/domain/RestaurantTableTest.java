package com.abdullahkaya.rest.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RestaurantTableTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantTable.class);
        RestaurantTable restaurantTable1 = new RestaurantTable();
        restaurantTable1.setId(1L);
        RestaurantTable restaurantTable2 = new RestaurantTable();
        restaurantTable2.setId(restaurantTable1.getId());
        assertThat(restaurantTable1).isEqualTo(restaurantTable2);
        restaurantTable2.setId(2L);
        assertThat(restaurantTable1).isNotEqualTo(restaurantTable2);
        restaurantTable1.setId(null);
        assertThat(restaurantTable1).isNotEqualTo(restaurantTable2);
    }
}
