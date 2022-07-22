package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbEventRepository extends JpaRepository<TbEvent, Long> {
}
