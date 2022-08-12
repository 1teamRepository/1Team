package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbAnswer;
import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TbAnswerRepository extends JpaRepository<TbAnswer, Long> {

}
