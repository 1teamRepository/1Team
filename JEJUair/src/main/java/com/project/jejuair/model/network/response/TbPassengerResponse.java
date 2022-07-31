package com.project.jejuair.model.network.response;

import com.project.jejuair.model.enumclass.common.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbPassengerResponse {
    private Long pasIdx;
    private LocalDateTime pasRegDate;
    private String pasFirstname;
    private String pasLastname;
    private String pasBirthDate;
    private Gender pasGender;

    private Long tbReservationResIdx;
}
