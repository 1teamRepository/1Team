package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.Gender;
import com.project.jejuair.model.enumclass.common.Consent;
import com.project.jejuair.model.enumclass.member.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_member",
        sequenceName = "seq_member",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbMember {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_member")
    private Long memIdx;
    private String memUserid;
    private String memUserpw;
    private String memKoLastname;
    private String memKoFirstname;
    private String memEngLastname;
    private String memEngFirstname;
    @Enumerated(EnumType.STRING)
    private Gender memGender;
    private String memSsn;
    private String memHp;
    private String memEmail;
    @Enumerated(EnumType.STRING)
    private Consent memMarketing;
    @Enumerated(EnumType.STRING)
    private MemberStatus memStatus;
    @CreatedDate
    private LocalDateTime memRegDate;
    private Integer memPoint;
    @Enumerated(EnumType.STRING)
    private Consent memSnsPush;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbMember")
    private List<TbReservation> tbReservationList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbMember")
    private List<TbPayment> tbPaymentList;

}
