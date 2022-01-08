package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.Location;
import com.abdullahkaya.rest.service.dto.LocationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring", uses = { RestaurantMapper.class, CityMapper.class, CountryMapper.class, CompanyMapper.class })
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "name")
    @Mapping(target = "city", source = "city", qualifiedByName = "name")
    @Mapping(target = "country", source = "country", qualifiedByName = "name")
    @Mapping(target = "company", source = "company", qualifiedByName = "name")
    LocationDTO toDto(Location s);
}
