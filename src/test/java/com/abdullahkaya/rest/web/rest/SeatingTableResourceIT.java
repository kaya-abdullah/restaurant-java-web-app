package com.abdullahkaya.rest.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.abdullahkaya.rest.IntegrationTest;
import com.abdullahkaya.rest.domain.SeatingTable;
import com.abdullahkaya.rest.repository.SeatingTableRepository;
import com.abdullahkaya.rest.service.dto.SeatingTableDTO;
import com.abdullahkaya.rest.service.mapper.SeatingTableMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SeatingTableResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SeatingTableResourceIT {

    private static final String DEFAULT_TABLE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEAT_COUNT = 1;
    private static final Integer UPDATED_SEAT_COUNT = 2;

    private static final String ENTITY_API_URL = "/api/seating-tables";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SeatingTableRepository seatingTableRepository;

    @Autowired
    private SeatingTableMapper seatingTableMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSeatingTableMockMvc;

    private SeatingTable seatingTable;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SeatingTable createEntity(EntityManager em) {
        SeatingTable seatingTable = new SeatingTable().tableType(DEFAULT_TABLE_TYPE).seatCount(DEFAULT_SEAT_COUNT);
        return seatingTable;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SeatingTable createUpdatedEntity(EntityManager em) {
        SeatingTable seatingTable = new SeatingTable().tableType(UPDATED_TABLE_TYPE).seatCount(UPDATED_SEAT_COUNT);
        return seatingTable;
    }

    @BeforeEach
    public void initTest() {
        seatingTable = createEntity(em);
    }

    @Test
    @Transactional
    void createSeatingTable() throws Exception {
        int databaseSizeBeforeCreate = seatingTableRepository.findAll().size();
        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);
        restSeatingTableMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isCreated());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeCreate + 1);
        SeatingTable testSeatingTable = seatingTableList.get(seatingTableList.size() - 1);
        assertThat(testSeatingTable.getTableType()).isEqualTo(DEFAULT_TABLE_TYPE);
        assertThat(testSeatingTable.getSeatCount()).isEqualTo(DEFAULT_SEAT_COUNT);
    }

    @Test
    @Transactional
    void createSeatingTableWithExistingId() throws Exception {
        // Create the SeatingTable with an existing ID
        seatingTable.setId(1L);
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        int databaseSizeBeforeCreate = seatingTableRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeatingTableMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSeatingTables() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        // Get all the seatingTableList
        restSeatingTableMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seatingTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableType").value(hasItem(DEFAULT_TABLE_TYPE)))
            .andExpect(jsonPath("$.[*].seatCount").value(hasItem(DEFAULT_SEAT_COUNT)));
    }

    @Test
    @Transactional
    void getSeatingTable() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        // Get the seatingTable
        restSeatingTableMockMvc
            .perform(get(ENTITY_API_URL_ID, seatingTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(seatingTable.getId().intValue()))
            .andExpect(jsonPath("$.tableType").value(DEFAULT_TABLE_TYPE))
            .andExpect(jsonPath("$.seatCount").value(DEFAULT_SEAT_COUNT));
    }

    @Test
    @Transactional
    void getNonExistingSeatingTable() throws Exception {
        // Get the seatingTable
        restSeatingTableMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSeatingTable() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();

        // Update the seatingTable
        SeatingTable updatedSeatingTable = seatingTableRepository.findById(seatingTable.getId()).get();
        // Disconnect from session so that the updates on updatedSeatingTable are not directly saved in db
        em.detach(updatedSeatingTable);
        updatedSeatingTable.tableType(UPDATED_TABLE_TYPE).seatCount(UPDATED_SEAT_COUNT);
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(updatedSeatingTable);

        restSeatingTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, seatingTableDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isOk());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
        SeatingTable testSeatingTable = seatingTableList.get(seatingTableList.size() - 1);
        assertThat(testSeatingTable.getTableType()).isEqualTo(UPDATED_TABLE_TYPE);
        assertThat(testSeatingTable.getSeatCount()).isEqualTo(UPDATED_SEAT_COUNT);
    }

    @Test
    @Transactional
    void putNonExistingSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, seatingTableDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSeatingTableWithPatch() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();

        // Update the seatingTable using partial update
        SeatingTable partialUpdatedSeatingTable = new SeatingTable();
        partialUpdatedSeatingTable.setId(seatingTable.getId());

        restSeatingTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSeatingTable.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSeatingTable))
            )
            .andExpect(status().isOk());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
        SeatingTable testSeatingTable = seatingTableList.get(seatingTableList.size() - 1);
        assertThat(testSeatingTable.getTableType()).isEqualTo(DEFAULT_TABLE_TYPE);
        assertThat(testSeatingTable.getSeatCount()).isEqualTo(DEFAULT_SEAT_COUNT);
    }

    @Test
    @Transactional
    void fullUpdateSeatingTableWithPatch() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();

        // Update the seatingTable using partial update
        SeatingTable partialUpdatedSeatingTable = new SeatingTable();
        partialUpdatedSeatingTable.setId(seatingTable.getId());

        partialUpdatedSeatingTable.tableType(UPDATED_TABLE_TYPE).seatCount(UPDATED_SEAT_COUNT);

        restSeatingTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSeatingTable.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSeatingTable))
            )
            .andExpect(status().isOk());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
        SeatingTable testSeatingTable = seatingTableList.get(seatingTableList.size() - 1);
        assertThat(testSeatingTable.getTableType()).isEqualTo(UPDATED_TABLE_TYPE);
        assertThat(testSeatingTable.getSeatCount()).isEqualTo(UPDATED_SEAT_COUNT);
    }

    @Test
    @Transactional
    void patchNonExistingSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, seatingTableDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSeatingTable() throws Exception {
        int databaseSizeBeforeUpdate = seatingTableRepository.findAll().size();
        seatingTable.setId(count.incrementAndGet());

        // Create the SeatingTable
        SeatingTableDTO seatingTableDTO = seatingTableMapper.toDto(seatingTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSeatingTableMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(seatingTableDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SeatingTable in the database
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSeatingTable() throws Exception {
        // Initialize the database
        seatingTableRepository.saveAndFlush(seatingTable);

        int databaseSizeBeforeDelete = seatingTableRepository.findAll().size();

        // Delete the seatingTable
        restSeatingTableMockMvc
            .perform(delete(ENTITY_API_URL_ID, seatingTable.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SeatingTable> seatingTableList = seatingTableRepository.findAll();
        assertThat(seatingTableList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
