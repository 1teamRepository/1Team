package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbExtraService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbExtraServiceRepository extends JpaRepository<TbExtraService, Long> {

    Optional<TbExtraService> findByExtIdx(Long extIdx);
}
