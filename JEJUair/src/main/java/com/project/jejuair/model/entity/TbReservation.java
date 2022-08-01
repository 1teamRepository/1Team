package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.Gender;
import com.project.jejuair.model.enumclass.reservation.ResRoute;
import com.project.jejuair.model.enumclass.reservation.ResStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_reservation",
        sequenceName = "seq_reservation",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_reservation")
    private Long resIdx;
    @Enumerated(EnumType.STRING)
    private ResStatus resStatus;
    @CreatedDate
    private LocalDateTime resRegDate;

    @Enumerated(EnumType.STRING)
    private ResRoute resRoute;

    @ManyToOne
    private TbMember tbMember;

    @ManyToOne
    private TbFlightSchedule tbFlightSchedule;

    @OneToMany
    private List<TbPassenger> tbPassengerList;

//
//    @OneToOne
//    private TbFlightSchedule tbFlightSchedule;
//
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbReservation")
//    private List<TbExtraService> tbExtraServiceList;


}
