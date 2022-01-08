package com.abdullahkaya.rest.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.abdullahkaya.rest.IntegrationTest;
import com.abdullahkaya.rest.domain.ReservationComment;
import com.abdullahkaya.rest.repository.ReservationCommentRepository;
import com.abdullahkaya.rest.service.dto.ReservationCommentDTO;
import com.abdullahkaya.rest.service.mapper.ReservationCommentMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link ReservationCommentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReservationCommentResourceIT {

    private static final Instant DEFAULT_COMMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OPERATOR_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_OPERATOR_NOTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/reservation-comments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReservationCommentRepository reservationCommentRepository;

    @Autowired
    private ReservationCommentMapper reservationCommentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReservationCommentMockMvc;

    private ReservationComment reservationComment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReservationComment createEntity(EntityManager em) {
        ReservationComment reservationComment = new ReservationComment()
            .commentDate(DEFAULT_COMMENT_DATE)
            .operatorNote(DEFAULT_OPERATOR_NOTE);
        return reservationComment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReservationComment createUpdatedEntity(EntityManager em) {
        ReservationComment reservationComment = new ReservationComment()
            .commentDate(UPDATED_COMMENT_DATE)
            .operatorNote(UPDATED_OPERATOR_NOTE);
        return reservationComment;
    }

    @BeforeEach
    public void initTest() {
        reservationComment = createEntity(em);
    }

    @Test
    @Transactional
    void createReservationComment() throws Exception {
        int databaseSizeBeforeCreate = reservationCommentRepository.findAll().size();
        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);
        restReservationCommentMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isCreated());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeCreate + 1);
        ReservationComment testReservationComment = reservationCommentList.get(reservationCommentList.size() - 1);
        assertThat(testReservationComment.getCommentDate()).isEqualTo(DEFAULT_COMMENT_DATE);
        assertThat(testReservationComment.getOperatorNote()).isEqualTo(DEFAULT_OPERATOR_NOTE);
    }

    @Test
    @Transactional
    void createReservationCommentWithExistingId() throws Exception {
        // Create the ReservationComment with an existing ID
        reservationComment.setId(1L);
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        int databaseSizeBeforeCreate = reservationCommentRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReservationCommentMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReservationComments() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        // Get all the reservationCommentList
        restReservationCommentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservationComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].commentDate").value(hasItem(DEFAULT_COMMENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].operatorNote").value(hasItem(DEFAULT_OPERATOR_NOTE)));
    }

    @Test
    @Transactional
    void getReservationComment() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        // Get the reservationComment
        restReservationCommentMockMvc
            .perform(get(ENTITY_API_URL_ID, reservationComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reservationComment.getId().intValue()))
            .andExpect(jsonPath("$.commentDate").value(DEFAULT_COMMENT_DATE.toString()))
            .andExpect(jsonPath("$.operatorNote").value(DEFAULT_OPERATOR_NOTE));
    }

    @Test
    @Transactional
    void getNonExistingReservationComment() throws Exception {
        // Get the reservationComment
        restReservationCommentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReservationComment() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();

        // Update the reservationComment
        ReservationComment updatedReservationComment = reservationCommentRepository.findById(reservationComment.getId()).get();
        // Disconnect from session so that the updates on updatedReservationComment are not directly saved in db
        em.detach(updatedReservationComment);
        updatedReservationComment.commentDate(UPDATED_COMMENT_DATE).operatorNote(UPDATED_OPERATOR_NOTE);
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(updatedReservationComment);

        restReservationCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reservationCommentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isOk());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
        ReservationComment testReservationComment = reservationCommentList.get(reservationCommentList.size() - 1);
        assertThat(testReservationComment.getCommentDate()).isEqualTo(UPDATED_COMMENT_DATE);
        assertThat(testReservationComment.getOperatorNote()).isEqualTo(UPDATED_OPERATOR_NOTE);
    }

    @Test
    @Transactional
    void putNonExistingReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reservationCommentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReservationCommentWithPatch() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();

        // Update the reservationComment using partial update
        ReservationComment partialUpdatedReservationComment = new ReservationComment();
        partialUpdatedReservationComment.setId(reservationComment.getId());

        partialUpdatedReservationComment.commentDate(UPDATED_COMMENT_DATE).operatorNote(UPDATED_OPERATOR_NOTE);

        restReservationCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReservationComment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReservationComment))
            )
            .andExpect(status().isOk());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
        ReservationComment testReservationComment = reservationCommentList.get(reservationCommentList.size() - 1);
        assertThat(testReservationComment.getCommentDate()).isEqualTo(UPDATED_COMMENT_DATE);
        assertThat(testReservationComment.getOperatorNote()).isEqualTo(UPDATED_OPERATOR_NOTE);
    }

    @Test
    @Transactional
    void fullUpdateReservationCommentWithPatch() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();

        // Update the reservationComment using partial update
        ReservationComment partialUpdatedReservationComment = new ReservationComment();
        partialUpdatedReservationComment.setId(reservationComment.getId());

        partialUpdatedReservationComment.commentDate(UPDATED_COMMENT_DATE).operatorNote(UPDATED_OPERATOR_NOTE);

        restReservationCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReservationComment.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReservationComment))
            )
            .andExpect(status().isOk());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
        ReservationComment testReservationComment = reservationCommentList.get(reservationCommentList.size() - 1);
        assertThat(testReservationComment.getCommentDate()).isEqualTo(UPDATED_COMMENT_DATE);
        assertThat(testReservationComment.getOperatorNote()).isEqualTo(UPDATED_OPERATOR_NOTE);
    }

    @Test
    @Transactional
    void patchNonExistingReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reservationCommentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReservationComment() throws Exception {
        int databaseSizeBeforeUpdate = reservationCommentRepository.findAll().size();
        reservationComment.setId(count.incrementAndGet());

        // Create the ReservationComment
        ReservationCommentDTO reservationCommentDTO = reservationCommentMapper.toDto(reservationComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReservationCommentMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reservationCommentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReservationComment in the database
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReservationComment() throws Exception {
        // Initialize the database
        reservationCommentRepository.saveAndFlush(reservationComment);

        int databaseSizeBeforeDelete = reservationCommentRepository.findAll().size();

        // Delete the reservationComment
        restReservationCommentMockMvc
            .perform(delete(ENTITY_API_URL_ID, reservationComment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReservationComment> reservationCommentList = reservationCommentRepository.findAll();
        assertThat(reservationCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
