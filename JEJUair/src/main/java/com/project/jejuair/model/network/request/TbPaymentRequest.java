package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.payment.PayStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbPaymentRequest {
    private Long payIdx;            // 고유번호
    private Long payAmount;         // 결제 금액
    private PayStatus payStatus;       // 상태
    private LocalDateTime payRegDate;  // 결제 일시
    private String payUserid;

    private Long tbReservationResIdx;
}
