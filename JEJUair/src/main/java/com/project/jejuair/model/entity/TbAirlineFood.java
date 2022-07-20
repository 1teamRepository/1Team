package com.project.jejuair.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="seq_airlinefood",
        sequenceName = "seq_airlinefood",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbAirlineFood {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_airlinefood")
    private Long foodIdx;
    private Integer foodKrwPrice;
    private String foodKorName;
    private Integer foodUsdPrice;
    private String foodEngName;
    private Integer foodJpyPrice;
    private Integer foodDiscount;
    private String foodPicture;
    private String foodStartingPoint;
    private String foodSpecific;
    private String foodTitle;
    private String foodContent;
    @CreatedDate
    private LocalDateTime foodRegDate;

    @OneToOne
    private TbExtraService tbExtraService;
}
