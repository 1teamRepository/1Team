package com.project.jejuair.model.network.response;

import com.project.jejuair.model.enumclass.common.DomesticOverseas;
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
    private DomesticOverseas schDomesticOverseas;
    private String schAircraftName;
    private String schDeparture;
    private String schArrival;
    private String schDepartureDate;
    private String schArrivalDate;
    private String schDepartureTime;
    private String schArrivalTime;
    private Long schBizLitePrice;
    private Integer schBizLiteDiscount;
    private Long schFlyPrice;
    private Integer schFlyDiscount;
    private SchFood schFood;
    private LocalDateTime schRegDate;

    private Long tbAircraftAcftIdx;
    private String acftAircraftName;
    private Integer acftBizLiteSeats;
    private Integer acftNomalSeats;
}
