package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.extraService.ExtServiceType;
import com.project.jejuair.model.enumclass.lost.LostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbLostPropertyRequest {
    private Long lostIdx;               // 번호
    private String lostItem;            // 품목
    private String lostAcqAirName;      // 습득편명
    private LocalDateTime lostAcqDate;  // 습득날짜
    private String lostStoragePlace;    // 보관장소
    private LocalDateTime lostDisDate;  // 폐기날짜
    private String lostColor;           // 색상
    private String lostExplain;         // 상세설명
    private String lostSeatNum;         // 좌석번호
    private LostStatus lostStatus;      // 상태
    private String lostImg;             // 이미지
    private LocalDateTime lostRegDate;  // 등록날짜
    private ExtServiceType extServiceType;
    private String extServiceDetail;
    private LocalDateTime extRegDate;
    private Integer extPrice;
    private Long choiceIdx;
}
