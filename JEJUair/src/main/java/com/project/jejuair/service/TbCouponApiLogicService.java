package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbCoupon;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbCouponRequest;
import com.project.jejuair.model.network.response.TbCouponResponse;
import com.project.jejuair.model.network.response.TbPaymentResponse;
import com.project.jejuair.repository.TbAdminuserRepository;
import com.project.jejuair.repository.TbCouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbCouponApiLogicService extends BaseService<TbCouponRequest, TbCouponResponse, TbCoupon> {

    @Autowired
    private final TbCouponRepository tbCouponRepository;

    private TbCouponResponse response(TbCoupon tbCoupon){
        TbCouponResponse  tbCouponResponse = TbCouponResponse.builder()
                .copIdx(tbCoupon.getCopIdx())
                .copName(tbCoupon.getCopName())
                .copCode(tbCoupon.getCopCode())
                .copSale(tbCoupon.getCopSale())
                .copType(tbCoupon.getCopType())
                .copStartDate(tbCoupon.getCopStartDate())
                .copEndDate(tbCoupon.getCopEndDate())
                .copRegDate(tbCoupon.getCopRegDate())
                .build();
        return tbCouponResponse;
    }

    @Override
    public Header<TbCouponResponse> create(Header<TbCouponRequest> request) {
        TbCouponRequest tbCouponRequest = request.getData();
        TbCoupon tbCoupon = TbCoupon.builder()
                .copIdx(tbCouponRequest.getCopIdx())
                .copName(tbCouponRequest.getCopName())
                .copCode(tbCouponRequest.getCopCode())
                .copSale(tbCouponRequest.getCopSale())
                .copType(tbCouponRequest.getCopType())
                .copStartDate(tbCouponRequest.getCopStartDate())
                .copEndDate(tbCouponRequest.getCopEndDate())
                .copRegDate(LocalDateTime.now())
                .build();
        TbCoupon newTbCoupon = baseRepository.save(tbCoupon);
        return Header.OK(response(newTbCoupon));
    }

    @Override
    public Header<TbCouponResponse> read(Long copIdx) {
        return baseRepository.findById(copIdx).map(tbCoupon -> response(tbCoupon)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbCouponResponse> update(Header<TbCouponRequest> request) {
        TbCouponRequest tbCouponRequest = request.getData();
        Optional<TbCoupon> tbCoupon = baseRepository.findById(tbCouponRequest.getCopIdx());
        return tbCoupon.map(
                        tbCoupon1 -> {
                            tbCoupon1.setCopIdx(tbCouponRequest.getCopIdx());
                            tbCoupon1.setCopName(tbCouponRequest.getCopName());
                            tbCoupon1.setCopCode(tbCouponRequest.getCopCode());
                            tbCoupon1.setCopSale(tbCouponRequest.getCopSale());
                            tbCoupon1.setCopType(tbCouponRequest.getCopType());
                            tbCoupon1.setCopStartDate(tbCouponRequest.getCopStartDate());
                            tbCoupon1.setCopEndDate(tbCouponRequest.getCopEndDate());
                            return tbCoupon1;
                        }).map(tbCoupon1 -> baseRepository.save(tbCoupon1))
                .map(tbCoupon1 -> response(tbCoupon1))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long copIdx) {
        Optional<TbCoupon> tbCoupon = baseRepository.findById(copIdx);
        return tbCoupon.map(tbCoupon1 -> {
            baseRepository.delete(tbCoupon1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터없음"));
    }

    public Header<List<TbCouponResponse>> search(Pageable pageable){

        Page<TbCoupon> tbCoupons = baseRepository.findAll(pageable);

        List<TbCouponResponse> tbCouponResponseList = tbCoupons.stream().map(
                tbCoupon -> response(tbCoupon)).collect(Collectors.toList());
        System.out.println(tbCouponResponseList);
        Pagination pagination = Pagination.builder()
                .totalPages(tbCoupons.getTotalPages())
                .totalElements(tbCoupons.getTotalElements())
                .currentPage(tbCoupons.getNumber())
                .currentElements(tbCoupons.getNumberOfElements())
                .build();
        return Header.OK(tbCouponResponseList, pagination);

    }
}
