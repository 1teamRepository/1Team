package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbAircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbAircraftRepository extends JpaRepository<TbAircraft, Long> {
}
