package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.destination.DesContinent;
import com.project.jejuair.model.enumclass.extraService.ExtServiceType;
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
        name="seq_destination",
        sequenceName = "seq_destination",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbDestination {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_destination")
    private Long desIdx;                // 번호
    @Enumerated(EnumType.STRING)
    private DesContinent desContinent;  // 대륙구분
    private String desDestination;      // 취항지명
    private String desAirportCode;      // 공항코드
    @CreatedDate
    private LocalDateTime desRegDate;   // 등록일자

}
