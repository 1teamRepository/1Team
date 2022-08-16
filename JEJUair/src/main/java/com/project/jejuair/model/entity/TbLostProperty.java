package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.lost.LostStatus;
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
        name="seq_lostproperty",
        sequenceName = "seq_lostproperty",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbLostProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_lostproperty")
    private Long lostIdx;               // 번호
    private String lostItem;            // 품목
    private String lostAcqAirName;      // 습득편명
    private String lostAcqDate;  // 습득날짜
    private String lostStoragePlace;    // 보관장소
    private String lostDisDate;  // 폐기날짜
    private String lostColor;           // 색상
    private String lostExplain;         // 상세설명
    private String lostSeatNum;         // 좌석번호
    @Enumerated(EnumType.STRING)
    private LostStatus lostStatus;      // 상태
    private String lostImg;             // 이미지
    @CreatedDate
    private LocalDateTime lostRegDate;  // 등록날짜

}
