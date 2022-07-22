package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.Coupon.CopType;
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
        name="seq_coupon",
        sequenceName = "seq_coupon",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbCoupon {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_coupon")
    private Long copIdx;                // 번호
    private String copName;             // 쿠폰명
    private String copCode;             // 쿠폰 코드
    private String copSale;             // 할인 금액/률
    @Enumerated(EnumType.STRING)
    private CopType copType;            // 타입
    private LocalDateTime copStartDate; // 시작일자
    private LocalDateTime copEndDate;   // 종료일자
    @CreatedDate
    private LocalDateTime copRegDate;   // 등록일자
}
