package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.DomesticOverseas;
import com.project.jejuair.model.enumclass.schedule.SchFood;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_flightschedule",
        sequenceName = "seq_flightschedule",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbFlightSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_flightschedule")
    private Long schIdx;
    @Enumerated(EnumType.STRING)
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
    @Enumerated(EnumType.STRING)
    private SchFood schFood;
    private LocalDateTime schRegDate;

    @OneToMany
    private List<TbReservation> tbReservationList;



//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbFlightSchedule")
//    private List<TbReservation> tbReservationList;
//
}
