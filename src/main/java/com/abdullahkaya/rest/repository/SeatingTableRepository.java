package com.abdullahkaya.rest.repository;

import com.abdullahkaya.rest.domain.SeatingTable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SeatingTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeatingTableRepository extends JpaRepository<SeatingTable, Long> {}
