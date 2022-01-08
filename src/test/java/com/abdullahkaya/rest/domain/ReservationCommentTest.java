package com.abdullahkaya.rest.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReservationCommentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReservationComment.class);
        ReservationComment reservationComment1 = new ReservationComment();
        reservationComment1.setId(1L);
        ReservationComment reservationComment2 = new ReservationComment();
        reservationComment2.setId(reservationComment1.getId());
        assertThat(reservationComment1).isEqualTo(reservationComment2);
        reservationComment2.setId(2L);
        assertThat(reservationComment1).isNotEqualTo(reservationComment2);
        reservationComment1.setId(null);
        assertThat(reservationComment1).isNotEqualTo(reservationComment2);
    }
}
