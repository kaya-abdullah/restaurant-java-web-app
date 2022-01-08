package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.Reservation;
import com.abdullahkaya.rest.service.dto.ReservationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reservation} and its DTO {@link ReservationDTO}.
 */
@Mapper(componentModel = "spring", uses = { EmployeeMapper.class, RestaurantMapper.class, CustomerMapper.class })
public interface ReservationMapper extends EntityMapper<ReservationDTO, Reservation> {
    @Mapping(target = "operator", source = "operator", qualifiedByName = "email")
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "name")
    @Mapping(target = "customer", source = "customer", qualifiedByName = "fullName")
    ReservationDTO toDto(Reservation s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ReservationDTO toDtoId(Reservation reservation);
}
