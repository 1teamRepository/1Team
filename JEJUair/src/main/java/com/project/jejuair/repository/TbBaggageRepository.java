package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbBaggage;
import com.project.jejuair.model.entity.TbReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbBaggageRepository extends JpaRepository<TbBaggage, Long> {
    Optional<TbBaggage> findByBagIdx(Long bagIdx);
}
