package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbCouponRepository extends JpaRepository<TbCoupon, Long> {

}