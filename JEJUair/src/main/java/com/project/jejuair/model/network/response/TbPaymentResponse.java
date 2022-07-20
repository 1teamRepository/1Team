package com.project.jejuair.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbPaymentResponse {
    private Long payIdx;            // 고유번호
    private String payUserid;       // 회원 아이디
    private String payContent;      // 결제 내역
    private Long payAmount;         // 결제 금액
    private String payStatus;       // 상태
    private String payMethod;       // 결제 수단
    private LocalDateTime payDate;
}
