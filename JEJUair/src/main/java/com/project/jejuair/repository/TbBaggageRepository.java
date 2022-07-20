package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbBaggage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbBaggageRepository extends JpaRepository<TbBaggage, Long> {
}
