package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbAdminuser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbAdminuserRepository extends JpaRepository<TbAdminuser, Long> {
}
