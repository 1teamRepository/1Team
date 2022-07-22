package com.project.jejuair.model.entity;

import com.project.jejuair.model.enumclass.adminuser.AdmStatus;
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
        name="seq_adminuser",
        sequenceName = "seq_adminuser",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbAdminuser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_adminuser")
    private Long admIdx;
    private String admAdminId;
    private String admAdminPw;
    private Integer admEmployee;
    private String admAdminHp;
    private String admDeparture;
    private String admKorName;
    private String admEngName;
    private String admEmail;
    @Enumerated(EnumType.STRING)
    private AdmStatus admStatus;
    @CreatedDate
    private LocalDateTime admRegDate;


//    경준아 이거 뭐야??
//    @Enumerated(EnumType.STRING)
//    private ExtServiceType extServiceType;
//    private String extServiceDetail;
//    @CreatedDate
//    private LocalDateTime extRegDate;
//    private Integer extPrice;
//    private Long choiceIdx;
}
