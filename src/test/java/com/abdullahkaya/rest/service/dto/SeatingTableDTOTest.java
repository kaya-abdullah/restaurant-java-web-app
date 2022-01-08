package com.abdullahkaya.rest.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SeatingTableDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeatingTableDTO.class);
        SeatingTableDTO seatingTableDTO1 = new SeatingTableDTO();
        seatingTableDTO1.setId(1L);
        SeatingTableDTO seatingTableDTO2 = new SeatingTableDTO();
        assertThat(seatingTableDTO1).isNotEqualTo(seatingTableDTO2);
        seatingTableDTO2.setId(seatingTableDTO1.getId());
        assertThat(seatingTableDTO1).isEqualTo(seatingTableDTO2);
        seatingTableDTO2.setId(2L);
        assertThat(seatingTableDTO1).isNotEqualTo(seatingTableDTO2);
        seatingTableDTO1.setId(null);
        assertThat(seatingTableDTO1).isNotEqualTo(seatingTableDTO2);
    }
}
