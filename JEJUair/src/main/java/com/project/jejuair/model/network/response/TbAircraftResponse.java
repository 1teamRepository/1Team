package com.project.jejuair.model.network.response;

import com.project.jejuair.model.enumclass.common.DomesticOverseas;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbAircraftResponse {
    private Long acftIdx;                   // 번호
    private String acftAircraftType;        // 항공기 타입
    private String acftAircraftName;        // 항공기명
    private DomesticOverseas acftDomesticOverseas;    // 국내/국외
    private Integer acftBizLiteSeats;       // 비즈좌석수
    private Integer acftNomalSeats;         // 일반좌석수
    private Integer acftTotalSeats;         // 총좌석수
    private LocalDateTime acftRegDate;      // 등록일자
}
