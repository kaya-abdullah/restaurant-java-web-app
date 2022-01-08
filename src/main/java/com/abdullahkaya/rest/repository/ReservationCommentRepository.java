package com.abdullahkaya.rest.repository;

import com.abdullahkaya.rest.domain.ReservationComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ReservationComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReservationCommentRepository extends JpaRepository<ReservationComment, Long> {}
