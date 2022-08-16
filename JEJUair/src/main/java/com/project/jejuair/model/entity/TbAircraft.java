package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.DomesticOverseas;
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
        name="seq_aircraft",
        sequenceName = "seq_aircraft",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbAircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_aircraft")
    private Long acftIdx;                   // 번호
    private String acftAircraftType;        // 항공기 타입
    private String acftAircraftName;        // 항공기명
    @Enumerated(EnumType.STRING)
    private DomesticOverseas acftDomesticOverseas;    // 국내/국외
    private Integer acftBizLiteSeats;       // 비즈좌석수
    private Integer acftNomalSeats;         // 일반좌석수
    private Integer acftTotalSeats;         // 총좌석수
    @CreatedDate
    private LocalDateTime acftRegDate;      // 등록일자

}
