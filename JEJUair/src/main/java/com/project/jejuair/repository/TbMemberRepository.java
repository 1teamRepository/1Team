package com.project.jejuair.repository;

import com.project.jejuair.model.entity.TbMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbMemberRepository extends JpaRepository<TbMember, Long> {
    Optional<TbMember> findByMemIdx(Long memIdx);

    Optional<TbMember> findByMemUserid(String memUserid);

    Optional<TbMember> findByMemUseridAndMemUserpw(String memUserid, String memUserpw);


    Page<TbMember> findByMemUserid(String memUserid, Pageable pageable);

    Optional<TbMember> findByMemEmail(String memEmail);

}
