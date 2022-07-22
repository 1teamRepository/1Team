package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbDestination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbDestinationRepository extends JpaRepository<TbDestination, Long> {
}
