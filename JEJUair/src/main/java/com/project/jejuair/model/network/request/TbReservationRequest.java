package com.project.jejuair.model.network.request;

import com.project.jejuair.model.enumclass.common.Consent;
import com.project.jejuair.model.enumclass.common.Gender;
import com.project.jejuair.model.enumclass.reservation.ResPosition;
import com.project.jejuair.model.enumclass.reservation.ResStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbReservationRequest {
    private Long resIdx;
    private String resEmail;
    private String resKoName;
    private String resHp;
    private String resEngName;
    private ResPosition resPosition;
    private Gender resGender;
    private Consent resCheckIn;
    private String resSsn;
    private ResStatus resStatus;
    private String resNationality;
    private String resCoupon;
    private String resSeatNum;
    private LocalDateTime resRegDate;
    private Long resMemIdx;
}
