package com.project.jejuair.model.enumclass.schedule;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SchPet {
    YES(0, "가능", "애견동반 가능"),
    No(1, "불가능", "애견동반 불가능");

    private Integer id;
    private String title;
    private String description;
}
