package com.abdullahkaya.rest.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.abdullahkaya.rest.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SeatingTableTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeatingTable.class);
        SeatingTable seatingTable1 = new SeatingTable();
        seatingTable1.setId(1L);
        SeatingTable seatingTable2 = new SeatingTable();
        seatingTable2.setId(seatingTable1.getId());
        assertThat(seatingTable1).isEqualTo(seatingTable2);
        seatingTable2.setId(2L);
        assertThat(seatingTable1).isNotEqualTo(seatingTable2);
        seatingTable1.setId(null);
        assertThat(seatingTable1).isNotEqualTo(seatingTable2);
    }
}
