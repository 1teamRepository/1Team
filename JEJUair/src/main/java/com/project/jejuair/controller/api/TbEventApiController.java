package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbEvent;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbEventRequest;
import com.project.jejuair.model.network.response.TbEventResponse;
import com.project.jejuair.service.TbEventApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor

public class TbEventApiController extends CrudController<TbEventRequest, TbEventResponse, TbEvent> {

    private final TbEventApiLogicService tbEventApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbEventResponse> create(@RequestBody Header<TbEventRequest> request) {
        return tbEventApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbEventResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbEventApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbEventResponse> update(@RequestBody Header<TbEventRequest> request) {
        return tbEventApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbEventResponse> delete(@PathVariable Long idx) {
        return tbEventApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbEventResponse>> findAll(@PageableDefault(sort = {""}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbEventApiLogicService.search(pageable);
    }
}
