package com.project.jejuair.model.enumclass.extraService;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExtServiceType {
    FOOD(0, "기내식", "기내식"),
    BAGGAGE(1, "수하물", "수하물");

    private Integer id;
    private String title;
    private String description;
}
