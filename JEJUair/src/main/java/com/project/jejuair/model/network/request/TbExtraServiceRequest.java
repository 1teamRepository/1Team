package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.extraService.ExtServiceType;
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
public class TbExtraServiceRequest {
    private Long extIdx;
    private ExtServiceType extServiceType;
    private String extServiceDetail;
    private LocalDateTime extRegDate;
    private Integer extPrice;
}
