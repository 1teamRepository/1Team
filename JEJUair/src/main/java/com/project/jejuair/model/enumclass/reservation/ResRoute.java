package com.project.jejuair.model.enumclass.reservation;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResRoute {
    ONEWAY(0, "편도", "편도"),
    ROUNDGO(1, "왕복(가는편)", "왕복(가는편)"),
    ROUNDBACK(2,"왕복(오는편)","왕복(오는편)");

    private Integer id;
    private String title;
    private String description;
}
