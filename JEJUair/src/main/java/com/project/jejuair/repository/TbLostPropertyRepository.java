package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbLostProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbLostPropertyRepository extends JpaRepository<TbLostProperty, Long> {
}
