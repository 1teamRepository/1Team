package com.project.jejuair.service;


import com.project.jejuair.model.entity.TbPayment;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbPaymentRequest;
import com.project.jejuair.model.network.response.TbPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbPaymentApiLogicService extends BaseService<TbPaymentRequest, TbPaymentResponse, TbPayment> {

    private TbPaymentResponse response(TbPayment tbPayment){
        TbPaymentResponse tbPaymentResponse = TbPaymentResponse.builder()
                .payIdx(tbPayment.getPayIdx())
                .payUserid(tbPayment.getPayUserid())
                .payContent(tbPayment.getPayContent())
                .payAmount(tbPayment.getPayAmount())
                .payStatus(tbPayment.getPayStatus())
                .payMethod(tbPayment.getPayMethod())
                .build();
        return tbPaymentResponse;
    }

    @Override
    public Header<TbPaymentResponse> create(Header<TbPaymentRequest> request) {
        TbPaymentRequest tbPaymentRequest = request.getData();
        TbPayment tbPayment = TbPayment.builder()
                .payUserid(tbPaymentRequest.getPayUserid())
                .payContent(tbPaymentRequest.getPayContent())
                .payAmount(tbPaymentRequest.getPayAmount())
                .payStatus(tbPaymentRequest.getPayStatus())
                .payMethod(tbPaymentRequest.getPayMethod())
                .payDate(LocalDateTime.now())
                .build();
        TbPayment newTbPayment = baseRepository.save(tbPayment);
        return Header.OK(response(newTbPayment));
    }

    @Override
    public Header<TbPaymentResponse> read(Long payIdx) {
        return baseRepository.findById(payIdx).map(tbPayment -> response(tbPayment)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbPaymentResponse> update(Header<TbPaymentRequest> request) {
        TbPaymentRequest tbPaymentRequest = request.getData();
        Optional<TbPayment> tbPayment = baseRepository.findById(tbPaymentRequest.getPayIdx());
        return tbPayment.map(
                newTbPayment -> {
                    newTbPayment.setPayUserid(tbPaymentRequest.getPayUserid());
                    newTbPayment.setPayContent(tbPaymentRequest.getPayContent());
                    newTbPayment.setPayAmount(tbPaymentRequest.getPayAmount());
                    newTbPayment.setPayStatus(tbPaymentRequest.getPayStatus());
                    newTbPayment.setPayMethod(tbPaymentRequest.getPayMethod());
                    newTbPayment.setPayDate(tbPaymentRequest.getPayDate());
                    return newTbPayment;
                }).map(newTbPayment -> baseRepository.save(newTbPayment))
                .map(newTbPayment -> response(newTbPayment))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long payIdx) {
        Optional<TbPayment> tbPayment = baseRepository.findById(payIdx);
        return tbPayment.map(newTbPayment -> {
            baseRepository.delete(newTbPayment);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbPaymentResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbPayment> tbPayment = baseRepository.findAll(pageable);
        List<TbPaymentResponse> tbPaymentResponseList = tbPayment.stream().map(
                newTbPayment -> response(newTbPayment)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbPayment.getTotalPages())
                .totalElements(tbPayment.getTotalElements())
                .currentPage(tbPayment.getNumber())
                .currentElements(tbPayment.getNumberOfElements())
                .build();
        return Header.OK(tbPaymentResponseList, pagination);
    }


}
