package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbReservationRepository extends JpaRepository<TbReservation, Long> {

}
