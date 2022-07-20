package com.project.jejuair.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_baggage",
        sequenceName = "seq_baggage",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_baggage")
    private Long payIdx;            // 고유번호
    private String payUserid;       // 회원 아이디
    private String payContent;      // 결제 내역
    private Long payAmount;         // 결제 금액
    private String payStatus;       // 상태
    private String payMethod;         // 결제 수단
    @CreatedDate
    private LocalDateTime payDate;  // 결제 일시

    @ManyToOne
    private TbMember tbMember;

    @OneToOne
    private TbReservation tbReservation;

    @OneToOne TbExtraService tbExtraService;
}
