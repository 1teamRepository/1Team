package com.project.jejuair.controller.api;


import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbPayment;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbPaymentRequest;
import com.project.jejuair.model.network.response.TbPaymentResponse;
import com.project.jejuair.service.TbPaymentApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class TbPaymentApiController extends CrudController<TbPaymentRequest, TbPaymentResponse, TbPayment> {

    private final TbPaymentApiLogicService tbPaymentApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbPaymentResponse> create(@RequestBody Header<TbPaymentRequest> request) {
        return tbPaymentApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbPaymentResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbPaymentApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbPaymentResponse> update(@RequestBody Header<TbPaymentRequest> request) {
        return tbPaymentApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbPaymentResponse> delete(@PathVariable Long idx) {
        return tbPaymentApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbPaymentResponse>> findAll(@PageableDefault(sort = {"bagIdx"}, direction = Sort.Direction.DESC) Pageable pageable){
        return tbPaymentApiLogicService.search(pageable);
    }
}
