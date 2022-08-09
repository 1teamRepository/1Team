package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbLostProperty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbLostPropertyRepository extends JpaRepository<TbLostProperty, Long> {

    Page<TbLostProperty> findByLostColorOrLostItem(String LostColor, String LostItem, Pageable pageable);

    Optional<TbLostProperty> findByLostColor(String LostColor);
    Optional<TbLostProperty> findByLostItem(String LostItem);

}
