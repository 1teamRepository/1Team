package com.project.jejuair.model.network.response;

import com.project.jejuair.model.enumclass.schedule.SchDomesticOverseas;
import com.project.jejuair.model.enumclass.schedule.SchFood;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbFlightScheduleResponse {
    private Long schIdx;
    private String schAircraftType;
    private SchDomesticOverseas schDomesticOverseas;
    private String schAircraftName;
    private String schDeparture;
    private String schArrival;
    private LocalDateTime schDepartureDate;
    private LocalDateTime schArrivalDate;
    private LocalTime schDepartureTime;
    private LocalTime schArrivalTime;
    private Long schBizLitePrice;
    private Integer schBizLiteDiscount;
    private Long schFlexPrice;
    private Integer schFlexDiscount;
    private Long schFlyBagPrice;
    private Integer schFlyBagDiscount;
    private Long schFlyPrice;
    private Integer schFlyDiscount;
    private SchFood schFood;
    private String schPet;
    private LocalDateTime schRegDate;
}
