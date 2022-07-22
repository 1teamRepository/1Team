package com.project.jejuair.model.enumclass.adminuser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AdmStatus {
    OFFICE(0, "재직", "재직"),
    LEAVE(1, "휴직", "휴직"),
    RETIREMENT(2, "은퇴", "은퇴");

    private Integer id;
    private String title;
    private String description;
}
