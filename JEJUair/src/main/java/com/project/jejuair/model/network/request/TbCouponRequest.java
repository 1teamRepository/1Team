package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.Coupon.CopType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbCouponRequest {
    private Long copIdx;                // 번호
    private String copName;             // 쿠폰명
    private String copCode;             // 쿠폰 코드
    private Long copSale;             // 할인 금액/률
    private CopType copType;            // 타입
    private String copStartDate; // 시작일자
    private String copEndDate;   // 종료일자
    private LocalDateTime copRegDate;   // 등록일자
}
