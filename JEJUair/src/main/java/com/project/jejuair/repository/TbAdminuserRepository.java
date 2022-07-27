package com.project.jejuair.repository;


import com.project.jejuair.model.entity.TbAdminuser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TbAdminuserRepository extends JpaRepository<TbAdminuser, Long> {


    // select * from tb_adminuser where adm_admin_id=? and adm_admin_pw=?
    Optional<TbAdminuser> findByAdmAdminIdAndAdmAdminPw(String admAdminId, String admAdminPw);

    // select * from tb_admin where admin_index=?
    Optional<TbAdminuser> findByAdmIdx(Long admIdx);

    Optional<TbAdminuser> findByAdmAdminId(String admAdminId);
}
