package com.abdullahkaya.rest.service.mapper;

import com.abdullahkaya.rest.domain.Job;
import com.abdullahkaya.rest.service.dto.JobDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Job} and its DTO {@link JobDTO}.
 */
@Mapper(componentModel = "spring", uses = { EmployeeMapper.class })
public interface JobMapper extends EntityMapper<JobDTO, Job> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "id")
    JobDTO toDto(Job s);
}
