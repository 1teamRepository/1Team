package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbPointRepository extends JpaRepository<TbPoint, Long> {
}
