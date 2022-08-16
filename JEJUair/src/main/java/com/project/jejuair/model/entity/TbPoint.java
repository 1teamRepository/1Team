package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.Point.PntStatus;
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
        name="seq_point",
        sequenceName = "seq_point",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_point")
    private Long pntIdx;                // 번호
    private String pntUserid;           // 아이디
    private String pntContent;          // 내용
    private Integer pntAmount;           // 금액
    @Enumerated(EnumType.STRING)
    private PntStatus pntStatus;           // 상태
    @CreatedDate
    private LocalDateTime pntRegDate;   // 등록일
    private Long pntMemIdx;           // MemIdx

//    @ManyToOne
//    private TbMember tbMember;
}
