package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbPassenger;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbPassengerRequest;
import com.project.jejuair.model.network.response.TbPassengerResponse;
import com.project.jejuair.model.network.response.TbReservationResponse;
import com.project.jejuair.service.TbPassengerApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/passenger")
@RequiredArgsConstructor
public class TbPassengerApiController extends CrudController<TbPassengerRequest, TbPassengerResponse, TbPassenger> {
    private final TbPassengerApiLogicService tbPassengerApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbPassengerResponse> create(@RequestBody Header<TbPassengerRequest> request) {
        return tbPassengerApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbPassengerResponse> read(@PathVariable(name = "idx") Long idx) {

        return tbPassengerApiLogicService.read(idx);
    }

    @Override
    @PutMapping
    public Header<TbPassengerResponse> update(@RequestBody Header<TbPassengerRequest> request) {
        return tbPassengerApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbPassengerResponse> delete(@PathVariable Long idx) {
        return tbPassengerApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbPassengerResponse>> findAll(@PageableDefault(sort = {"pasIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbPassengerApiLogicService.search(pageable);
    }

    @GetMapping("/{idx}/passengerInfo")
    public Header<List<TbPassengerResponse>> reservation(@PathVariable Long idx){
        return tbPassengerApiLogicService.reservation(idx);
    }

}
