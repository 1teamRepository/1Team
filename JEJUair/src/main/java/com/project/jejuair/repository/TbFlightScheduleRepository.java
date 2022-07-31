package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbFlightSchedule;
import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbFlightScheduleRepository extends JpaRepository<TbFlightSchedule, Long> {
    Optional<TbFlightSchedule> findBySchIdx(Long schIdx);
}
