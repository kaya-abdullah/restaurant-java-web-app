package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.ReservationComment;
import com.abdullahkaya.rest.service.dto.ReservationCommentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ReservationComment} and its DTO {@link ReservationCommentDTO}.
 */
@Mapper(componentModel = "spring", uses = { ReservationMapper.class })
public interface ReservationCommentMapper extends EntityMapper<ReservationCommentDTO, ReservationComment> {
    @Mapping(target = "reservation", source = "reservation", qualifiedByName = "id")
    ReservationCommentDTO toDto(ReservationComment s);
}
