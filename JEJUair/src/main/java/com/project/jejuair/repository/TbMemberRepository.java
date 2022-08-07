package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbExtraService;
import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbMemberRepository extends JpaRepository<TbMember, Long> {
    Optional<TbMember> findByMemIdx(Long memIdx);

    Optional<TbMember> findByMemUserid(String memUserid);

    Optional<TbMember> findByMemUseridAndMemUserpw(String memUserid, String memUserpw);

}
