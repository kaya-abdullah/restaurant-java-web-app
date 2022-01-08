package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.Customer;
import com.abdullahkaya.rest.service.dto.CustomerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Customer} and its DTO {@link CustomerDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {
    @Named("fullName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullName", source = "fullName")
    CustomerDTO toDtoFullName(Customer customer);
}
