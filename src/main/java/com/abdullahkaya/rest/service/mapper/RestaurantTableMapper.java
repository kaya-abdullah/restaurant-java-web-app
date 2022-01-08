package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.RestaurantTable;
import com.abdullahkaya.rest.service.dto.RestaurantTableDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RestaurantTable} and its DTO {@link RestaurantTableDTO}.
 */
@Mapper(componentModel = "spring", uses = { RestaurantMapper.class, SeatingTableMapper.class })
public interface RestaurantTableMapper extends EntityMapper<RestaurantTableDTO, RestaurantTable> {
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "name")
    @Mapping(target = "tables", source = "tables", qualifiedByName = "tableTypeSet")
    RestaurantTableDTO toDto(RestaurantTable s);

    @Mapping(target = "removeTables", ignore = true)
    RestaurantTable toEntity(RestaurantTableDTO restaurantTableDTO);
}
