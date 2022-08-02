package com.project.jejuair.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbEventResponse {
    private Long evtIdx;                   // 번호
    private String evtTitle;               // 제목
    private String evtContent;             // 내용
    private String evtImg;                 // 이미지 누나?
    private String evtStartDate;   // 시작일
    private String evtEndDate;     // 종료일
    private LocalDateTime evtRegDate;     // 등록일
}
