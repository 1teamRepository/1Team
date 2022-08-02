package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbPoint;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbPointRequest;
import com.project.jejuair.model.network.response.TbPointResponse;
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
public class TbPointApiLogicService extends BaseService<TbPointRequest, TbPointResponse, TbPoint> {

    private TbPointResponse response(TbPoint tbPoint){
        TbPointResponse tbPointResponse = TbPointResponse.builder()
                .pntIdx(tbPoint.getPntIdx())
                .pntUserid(tbPoint.getPntUserid())
                .pntContent(tbPoint.getPntContent())
                .pntAmount(tbPoint.getPntAmount())
                .pntStatus(tbPoint.getPntStatus())
                .pntRegDate(tbPoint.getPntRegDate())
                .pntMemIdx(tbPoint.getPntMemIdx())
                .build();
        return tbPointResponse;
    }

    @Override
    public Header<TbPointResponse> create(Header<TbPointRequest> request) {
        TbPointRequest tbPointRequest = request.getData();
        TbPoint tbPoint = TbPoint.builder()
                .pntUserid(tbPointRequest.getPntUserid())
                .pntContent(tbPointRequest.getPntContent())
                .pntAmount(tbPointRequest.getPntAmount())
                .pntStatus(tbPointRequest.getPntStatus())
                .pntRegDate(LocalDateTime.now())
                .pntMemIdx(tbPointRequest.getPntMemIdx())
                .build();
        TbPoint newTbPoint = baseRepository.save(tbPoint);
        return Header.OK(response(newTbPoint));
    }

    @Override
    public Header<TbPointResponse> read(Long pntIdx) {
        return baseRepository.findById(pntIdx).map(tbPoint -> response(tbPoint)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbPointResponse> update(Header<TbPointRequest> request) {
        TbPointRequest tbPointRequest = request.getData();
        Optional<TbPoint> tbPoint = baseRepository.findById(tbPointRequest.getPntIdx());
        return tbPoint.map(
                        newTbPoint -> {
                            newTbPoint.setPntUserid(tbPointRequest.getPntUserid());
                            newTbPoint.setPntContent(tbPointRequest.getPntContent());
                            newTbPoint.setPntAmount(tbPointRequest.getPntAmount());
                            newTbPoint.setPntStatus(tbPointRequest.getPntStatus());
                            return newTbPoint;
                        }).map(newTbPoint -> baseRepository.save(newTbPoint)).map(newTbPoint -> response(newTbPoint))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long pntIdx) {
        Optional<TbPoint> tbPoint = baseRepository.findById(pntIdx);
        return tbPoint.map(newTbPoint -> {
            baseRepository.delete(newTbPoint);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbPointResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbPoint> tbPoint = baseRepository.findAll(pageable);
        List<TbPointResponse> tbPointResponseList = tbPoint.stream().map(
                newTbPoint -> response(newTbPoint)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbPoint.getTotalPages())
                .totalElements(tbPoint.getTotalElements())
                .currentPage(tbPoint.getNumber())
                .currentElements(tbPoint.getNumberOfElements())
                .build();
        return Header.OK(tbPointResponseList, pagination);
    }



}