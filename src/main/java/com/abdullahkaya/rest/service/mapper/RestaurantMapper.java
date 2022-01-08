package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.Restaurant;
import com.abdullahkaya.rest.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurant} and its DTO {@link RestaurantDTO}.
 */
@Mapper(componentModel = "spring", uses = { CompanyMapper.class })
public interface RestaurantMapper extends EntityMapper<RestaurantDTO, Restaurant> {
    @Mapping(target = "company", source = "company", qualifiedByName = "id")
    RestaurantDTO toDto(Restaurant s);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RestaurantDTO toDtoName(Restaurant restaurant);
}
