package com.abdullahkaya.rest.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReservationCommentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReservationCommentDTO.class);
        ReservationCommentDTO reservationCommentDTO1 = new ReservationCommentDTO();
        reservationCommentDTO1.setId(1L);
        ReservationCommentDTO reservationCommentDTO2 = new ReservationCommentDTO();
        assertThat(reservationCommentDTO1).isNotEqualTo(reservationCommentDTO2);
        reservationCommentDTO2.setId(reservationCommentDTO1.getId());
        assertThat(reservationCommentDTO1).isEqualTo(reservationCommentDTO2);
        reservationCommentDTO2.setId(2L);
        assertThat(reservationCommentDTO1).isNotEqualTo(reservationCommentDTO2);
        reservationCommentDTO1.setId(null);
        assertThat(reservationCommentDTO1).isNotEqualTo(reservationCommentDTO2);
    }
}
