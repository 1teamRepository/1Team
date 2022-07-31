package com.project.jejuair.model.network.request;

import com.project.jejuair.model.entity.TbReservation;
import com.project.jejuair.model.enumclass.common.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbPassengerRequest {
    private Long pasIdx;
    private LocalDateTime pasRegDate;
    private String pasFirstname;
    private String pasLastname;
    private String pasBirthDate;
    private Gender pasGender;

    private Long tbReservationResIdx;

}
