package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbBaggage;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbBaggageRequest;
import com.project.jejuair.model.network.response.TbBaggageResponse;
import com.project.jejuair.service.TbBaggageApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baggage")
@RequiredArgsConstructor
public class TbBaggageApiController extends CrudController<TbBaggageRequest, TbBaggageResponse, TbBaggage> {

    private final TbBaggageApiLogicService tbBaggageApiLogicService;


    @Override
    @GetMapping("{idx}")
    public Header<TbBaggageResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbBaggageApiLogicService.read(idx);
    }


    @Override
    @DeleteMapping("{idx}")
    public Header<TbBaggageResponse> delete(@PathVariable Long idx) {
        return tbBaggageApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbBaggageResponse>> findAll(@PageableDefault(sort = {"bagIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbBaggageApiLogicService.search(pageable);
    }
}
