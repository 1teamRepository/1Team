package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbPassenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TbPassengerRepository extends JpaRepository<TbPassenger, Long> {
    Optional<TbPassenger> findByPasIdx(Long pasIdx);
    List<TbPassenger> findByTbReservationResIdx(Long tbReservationResIdx);

    List<TbPassenger> findByTbAircraftAcftIdx(Long tbAircraftAcftIdx);
}
