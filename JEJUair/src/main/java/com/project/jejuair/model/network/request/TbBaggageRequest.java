package com.project.jejuair.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbBaggageRequest {
    private Long bagIdx;
    private String bagDomesticOverseas;
    private Long bagPrice;
    private String bagWeight;
}
