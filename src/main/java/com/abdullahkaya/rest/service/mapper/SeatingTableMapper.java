package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.SeatingTable;
import com.abdullahkaya.rest.service.dto.SeatingTableDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SeatingTable} and its DTO {@link SeatingTableDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SeatingTableMapper extends EntityMapper<SeatingTableDTO, SeatingTable> {
    @Named("tableTypeSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "tableType", source = "tableType")
    Set<SeatingTableDTO> toDtoTableTypeSet(Set<SeatingTable> seatingTable);
}
