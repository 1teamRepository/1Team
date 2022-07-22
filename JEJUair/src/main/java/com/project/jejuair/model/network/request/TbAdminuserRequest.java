package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.adminuser.AdmStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbAdminuserRequest {
    private Long admIdx;
    private String admAdminId;
    private String admAdminPw;
    private Integer admEmployee;
    private String admAdminHp;
    private String admDeparture;
    private String admKorName;
    private String admEngName;
    private String admEmail;
    private AdmStatus admStatus;
    private LocalDateTime admRegDate;
}
