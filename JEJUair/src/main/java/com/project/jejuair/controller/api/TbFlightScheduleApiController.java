package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbFlightSchedule;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbFlightScheduleRequest;
import com.project.jejuair.model.network.response.TbFlightScheduleResponse;
import com.project.jejuair.service.TbFlightScheduleApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class TbFlightScheduleApiController extends CrudController<TbFlightScheduleRequest, TbFlightScheduleResponse, TbFlightSchedule> {

    private final TbFlightScheduleApiLogicService tbFlightScheduleApiLogicService;


    @Override
    @PostMapping("")
    public Header<TbFlightScheduleResponse> create(@RequestBody Header<TbFlightScheduleRequest> request) {
        return tbFlightScheduleApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbFlightScheduleResponse> read(@PathVariable(name = "idx") Long idx) {
        return tbFlightScheduleApiLogicService.read(idx);
    }

    @Override
    @PutMapping
    public Header<TbFlightScheduleResponse> update(@RequestBody Header<TbFlightScheduleRequest> request) {
        return tbFlightScheduleApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbFlightScheduleResponse> delete(@PathVariable Long idx) {
        return tbFlightScheduleApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbFlightScheduleResponse>> findAll(@PageableDefault(sort = {"schIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbFlightScheduleApiLogicService.search(pageable);
    }
}
