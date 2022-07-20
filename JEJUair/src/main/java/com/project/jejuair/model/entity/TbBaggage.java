package com.project.jejuair.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_baggage",
        sequenceName = "seq_baggage",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbBaggage {
    // create, update 만들필요 없어요
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_baggage")
    private Long bagIdx;
    private String bagDomesticOverseas;
    private Long bagPrice;
    private String bagWeight;

    @OneToOne
    private TbExtraService tbExtraService;
}
