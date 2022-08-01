package com.project.jejuair.controller.api;

import com.project.jejuair.controller.CrudController;
import com.project.jejuair.model.entity.TbCoupon;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.request.TbCouponRequest;
import com.project.jejuair.model.network.response.TbAdminuserResponse;
import com.project.jejuair.model.network.response.TbCouponResponse;
import com.project.jejuair.service.TbCouponApiLogicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupon")
@RequiredArgsConstructor
public class TbCouponApiController extends CrudController<TbCouponRequest, TbCouponResponse, TbCoupon> {

    private final TbCouponApiLogicService tbCouponApiLogicService;

    @Override
    @PostMapping("")
    public Header<TbCouponResponse> create(@RequestBody Header<TbCouponRequest> request) {
        return tbCouponApiLogicService.create(request);
    }

    @Override
    @GetMapping("{idx}")
    public Header<TbCouponResponse> read(@PathVariable (name = "idx") Long idx) {
        return tbCouponApiLogicService.read(idx);
    }

    @Override
    @PutMapping("")
    public Header<TbCouponResponse> update(@RequestBody Header<TbCouponRequest> request) {
        return tbCouponApiLogicService.update(request);
    }

    @Override
    @DeleteMapping("{idx}")
    public Header<TbCouponResponse> delete(@PathVariable Long idx) {
        return tbCouponApiLogicService.delete(idx);
    }

    @GetMapping("")
    public Header<List<TbCouponResponse>> findAll(@PageableDefault(sort = {"copIdx"}, direction = Sort.Direction.DESC) Pageable pageable){     //paging할수있는 객체 생성함
        return tbCouponApiLogicService.search(pageable);
    }

}
