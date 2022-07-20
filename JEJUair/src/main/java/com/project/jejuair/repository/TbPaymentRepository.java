package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbPaymentRepository extends JpaRepository<TbPayment, Long> {
}
