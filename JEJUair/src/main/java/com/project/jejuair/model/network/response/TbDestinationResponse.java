package com.project.jejuair.model.network.response;

import com.project.jejuair.model.enumclass.destination.DesContinent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbDestinationResponse {
    private Long desIdx;                // 번호
    private DesContinent desContinent;  // 대륙구분
    private String desDestination;      // 취항지명
    private String desAirportCode;      // 공항코드
    private LocalDateTime desRegDate;   // 등록일자
}
