package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbFlightSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbFlightScheduleRepository extends JpaRepository<TbFlightSchedule, Long> {
}
