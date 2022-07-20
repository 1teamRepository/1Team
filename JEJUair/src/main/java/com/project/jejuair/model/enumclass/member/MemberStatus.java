package com.project.jejuair.model.enumclass.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {

    REGISTERED(0, "가입", "사용자 가입상태"),
    UNREGISTERED(1, "탈퇴", "사용자 탈퇴상태");

    private Integer id;
    private String title;
    private String description;
}
