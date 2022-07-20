package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbReservation;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbReservationRequest;
import com.project.jejuair.model.network.response.TbReservationResponse;
import com.project.jejuair.service.TbReservationApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class TbReservationApiController extends CrudController<TbReservationRequest, TbReservationResponse, TbReservation> {


    private final TbReservationApiLogicService tbReservationApiLogicService;

    @Override
    @PostMapping("")
    public Header create(@RequestBody Header<TbReservationRequest> request) {
        return tbReservationApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbReservationResponse> read(@PathVariable(name = "idx") Long idx) {
        return tbReservationApiLogicService.read(idx);
    }

    @Override
    @PutMapping
    public Header<TbReservationResponse> update(@RequestBody Header<TbReservationRequest> request) {
        return tbReservationApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbReservationResponse> delete(@PathVariable Long idx) {
        return tbReservationApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbReservationResponse>> findAll(@PageableDefault(sort = {"resIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbReservationApiLogicService.search(pageable);
    }
}
