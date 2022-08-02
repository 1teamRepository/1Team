package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.Point.PntStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbPointRequest {
    private Long pntIdx;
    private String pntUserid;
    private String pntContent;
    private Integer pntAmount;
    private PntStatus pntStatus;
    private LocalDateTime pntRegDate;
    private Long pntMemIdx;
}
