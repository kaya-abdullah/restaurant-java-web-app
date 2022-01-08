package com.abdullahkaya.rest.repository;

import com.abdullahkaya.rest.domain.RestaurantTable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RestaurantTable entity.
 */
@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    @Query(
        value = "select distinct restaurantTable from RestaurantTable restaurantTable left join fetch restaurantTable.tables",
        countQuery = "select count(distinct restaurantTable) from RestaurantTable restaurantTable"
    )
    Page<RestaurantTable> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct restaurantTable from RestaurantTable restaurantTable left join fetch restaurantTable.tables")
    List<RestaurantTable> findAllWithEagerRelationships();

    @Query(
        "select restaurantTable from RestaurantTable restaurantTable left join fetch restaurantTable.tables where restaurantTable.id =:id"
    )
    Optional<RestaurantTable> findOneWithEagerRelationships(@Param("id") Long id);
}
