package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbAircraft;
import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbAircraftRepository extends JpaRepository<TbAircraft, Long> {
    Optional<TbAircraft> findByAcftIdx(Long AcftIdx);
}
