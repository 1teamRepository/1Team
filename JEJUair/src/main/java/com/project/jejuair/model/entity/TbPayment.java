package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.payment.PayStatus;
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
    private Long payAmount;         // 결제 금액
    private String payUserid;
    @Enumerated(EnumType.STRING)
    private PayStatus payStatus;       // 상태
    @CreatedDate
    private LocalDateTime payRegDate;  // 결제 일시

    @OneToOne
     private TbReservation tbReservation;

//
//    @OneToOne TbExtraService tbExtraService;
}
