package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbExtraService;
import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbMemberRepository extends JpaRepository<TbMember, Long> {

}
