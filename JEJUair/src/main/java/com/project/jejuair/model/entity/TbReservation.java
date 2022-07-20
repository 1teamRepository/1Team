package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.Consent;
import com.project.jejuair.model.enumclass.common.Gender;
import com.project.jejuair.model.enumclass.reservation.ResPosition;
import com.project.jejuair.model.enumclass.reservation.ResStatus;
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
        name="seq_reservation",
        sequenceName = "seq_reservation",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_reservation")
    private Long resIdx;
    private String resEmail;
    private String resKoName;
    private String resHp;
    private String resEngName;
    @Enumerated(EnumType.STRING)
    private ResPosition resPosition;
    @Enumerated(EnumType.STRING)
    private Gender resGender;
    @Enumerated(EnumType.STRING)
    private Consent resCheckIn;
    private String resSsn;
    @Enumerated(EnumType.STRING)
    private ResStatus resStatus;
    private String resNationality;
    private String resCoupon;
    private String resSeatNum;
    @CreatedDate
    private LocalDateTime resRegDate;
    private Long resMemIdx;

    @ManyToOne
//    @JoinColumn(name = "memIdx", referencename ="memIdx")
    private TbMember tbMember;

    @OneToOne
    private TbPayment tbPayment;

    @OneToOne
    private TbFlightSchedule tbFlightSchedule;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbReservation")
    private List<TbExtraService> tbExtraServiceList;


}
