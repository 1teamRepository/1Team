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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_passenger",
        sequenceName = "seq_passenger",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbPassenger {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_passenger")
    private Long pasIdx;

    @CreatedDate
    private LocalDateTime pasRegDate;

    private String pasFirstname;
    private String pasLastname;
    private String pasBirthDate;
    @Enumerated(EnumType.STRING)
    private Gender pasGender;
    private String pasSeat;

    @ManyToOne
    private TbReservation tbReservation;

    @ManyToOne
    private TbAirlineFood tbAirlineFood;

    @ManyToOne
    private TbBaggage tbBaggage;

}
