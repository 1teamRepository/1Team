package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.common.Check;
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
        name="seq_answer",
        sequenceName = "seq_answer",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_answer")
    private Long ansIdx;                // 번호
    private String ansInquiryContent;   // 문의 내용
    private String ansUserid;           // 작성자
    @Enumerated(EnumType.STRING)
    private Check ansAnswerCheck;      // 답변여부
    private String ansAnswerContent;    // 답변 내용
    @CreatedDate
    private LocalDateTime ansInquiryRegDate;   // 문의일
    private LocalDateTime ansAnswerRegDate; // 답변일
    private Long ansMemIdx;           // memIdx

    @ManyToOne
    private TbMember member;

}
