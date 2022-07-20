package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbAirlineFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbAirlineFoodRepository extends JpaRepository<TbAirlineFood, Long> {

    Optional<TbAirlineFood> findByFoodIdx(Long FoodIdx);
}
