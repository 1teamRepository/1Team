package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.common.Consent;
import com.project.jejuair.model.enumclass.common.Gender;
import com.project.jejuair.model.enumclass.member.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbMemberRequest {
    private Long memIdx;
    private String memUserid;
    private String memUserpw;
    private String memKoLastname;
    private String memKoFirstname;
    private String memEngLastname;
    private String memEngFirstname;
    private Gender memGender;
    private String memSsn;
    private String memHp;
    private String memEmail;
    private Consent memMarketing;
    private MemberStatus memStatus;
    private LocalDateTime memRegDate;
    private Integer memPoint;
    private Consent memSnsPush;

}
