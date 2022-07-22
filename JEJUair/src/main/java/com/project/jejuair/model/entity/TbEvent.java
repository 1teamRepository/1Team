package com.project.jejuair.model.entity;

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
        name="seq_event",
        sequenceName = "seq_event",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_event")

    private Long evtIdx;                   // 번호
    private String evtTitle;               // 제목
    private String evtContent;             // 내용
    private String evtImg;                 // 이미지 누나?
    private LocalDateTime evtStartDate;   // 시작일
    private LocalDateTime evtEndDate;     // 종료일
    @CreatedDate
    private LocalDateTime evtRegDate;     // 등록일
}
