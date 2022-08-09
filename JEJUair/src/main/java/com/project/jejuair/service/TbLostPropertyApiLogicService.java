package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbLostProperty;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbLostPropertyRequest;
import com.project.jejuair.model.network.response.TbLostPropertyResponse;
import com.project.jejuair.repository.TbLostPropertyRepository;
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
public class TbLostPropertyApiLogicService extends BaseService<TbLostPropertyRequest, TbLostPropertyResponse, TbLostProperty> {


    @Autowired
    private final TbLostPropertyRepository tbLostPropertyRepository;

    private TbLostPropertyResponse response(TbLostProperty tbLostProperty) {
        TbLostPropertyResponse tbLostPropertyResponse = TbLostPropertyResponse.builder()
                .lostIdx(tbLostProperty.getLostIdx())
                .lostItem(tbLostProperty.getLostItem())
                .lostAcqAirName(tbLostProperty.getLostAcqAirName())
                .lostAcqDate(tbLostProperty.getLostAcqDate())
                .lostStoragePlace(tbLostProperty.getLostStoragePlace())
                .lostDisDate(tbLostProperty.getLostDisDate())
                .lostColor(tbLostProperty.getLostColor())
                .lostExplain(tbLostProperty.getLostExplain())
                .lostSeatNum(tbLostProperty.getLostSeatNum())
                .lostStatus(tbLostProperty.getLostStatus())
                .lostImg(tbLostProperty.getLostImg())
                .lostRegDate(tbLostProperty.getLostRegDate())
                .build();
        return tbLostPropertyResponse;
    }

    @Override
    public Header<TbLostPropertyResponse> create(Header<TbLostPropertyRequest> request) {
        TbLostPropertyRequest tbLostPropertyRequest = request.getData();
        TbLostProperty tbLostProperty = TbLostProperty.builder()
                .lostItem(tbLostPropertyRequest.getLostItem())
                .lostAcqAirName(tbLostPropertyRequest.getLostAcqAirName())
                .lostAcqDate(tbLostPropertyRequest.getLostAcqDate())
                .lostStoragePlace(tbLostPropertyRequest.getLostStoragePlace())
                .lostDisDate(tbLostPropertyRequest.getLostDisDate())
                .lostColor(tbLostPropertyRequest.getLostColor())
                .lostExplain(tbLostPropertyRequest.getLostExplain())
                .lostSeatNum(tbLostPropertyRequest.getLostSeatNum())
                .lostStatus(tbLostPropertyRequest.getLostStatus())
                .lostImg(tbLostPropertyRequest.getLostImg())
                .lostRegDate(LocalDateTime.now())
                .build();
        TbLostProperty newTbLostProperty = baseRepository.save(tbLostProperty);
        return Header.OK(response(newTbLostProperty));
    }

    @Override
    public Header<TbLostPropertyResponse> read(Long lostIdx) {
        return baseRepository.findById(lostIdx).map(tbLostProperty -> response(tbLostProperty))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbLostPropertyResponse> update(Header<TbLostPropertyRequest> request) {
        TbLostPropertyRequest tbLostPropertyRequest = request.getData();
        Optional<TbLostProperty> tbLostProperty = baseRepository.findById(tbLostPropertyRequest.getLostIdx());

        return tbLostProperty.map(
                        newTbLostProperty -> {
                            newTbLostProperty.setLostItem(tbLostPropertyRequest.getLostItem());
                            newTbLostProperty.setLostAcqAirName(tbLostPropertyRequest.getLostAcqAirName());
                            newTbLostProperty.setLostAcqDate(tbLostPropertyRequest.getLostAcqDate());
                            newTbLostProperty.setLostStoragePlace(tbLostPropertyRequest.getLostStoragePlace());
                            newTbLostProperty.setLostDisDate(tbLostPropertyRequest.getLostDisDate());
                            newTbLostProperty.setLostColor(tbLostPropertyRequest.getLostColor());
                            newTbLostProperty.setLostExplain(tbLostPropertyRequest.getLostExplain());
                            newTbLostProperty.setLostSeatNum(tbLostPropertyRequest.getLostSeatNum());
                            newTbLostProperty.setLostStatus(tbLostPropertyRequest.getLostStatus());
                            newTbLostProperty.setLostImg(tbLostPropertyRequest.getLostImg());
                            return newTbLostProperty;
                        }).map(newTbLostProperty -> baseRepository.save(newTbLostProperty))
                .map(newTbLostProperty -> response(newTbLostProperty))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long lostIdx) {
        Optional<TbLostProperty> tbLostProperty = baseRepository.findById(lostIdx);
        return tbLostProperty.map(newTbLostProperty -> {
            baseRepository.delete(newTbLostProperty);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbLostPropertyResponse>> search(Pageable pageable) {
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbLostProperty> tbLostProperty = baseRepository.findAll(pageable);
        List<TbLostPropertyResponse> tbLostPropertyResponseList = tbLostProperty.stream().map(
                newTbLostProperty -> response(newTbLostProperty)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbLostProperty.getTotalPages())
                .totalElements(tbLostProperty.getTotalElements())
                .currentPage(tbLostProperty.getNumber())
                .currentElements(tbLostProperty.getNumberOfElements())
                .build();
        return Header.OK(tbLostPropertyResponseList, pagination);
    }

    public Header<List<TbLostPropertyResponse>> searchByAll(Pageable pageable, Header<TbLostPropertyRequest> request) {
        TbLostPropertyRequest tbLostPropertyRequest = request.getData();
        Page<TbLostProperty> tbLostProperty = tbLostPropertyRepository
                .findByLostColorOrLostItem(tbLostPropertyRequest.getLostColor(), tbLostPropertyRequest.getLostItem(), pageable);
        List<TbLostPropertyResponse> tbLostPropertyResponseList = tbLostProperty.stream().map(
                newTbLostProperty -> response(newTbLostProperty)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbLostProperty.getTotalPages())
                .totalElements(tbLostProperty.getTotalElements())
                .currentPage(tbLostProperty.getNumber())
                .currentElements(tbLostProperty.getNumberOfElements())
                .build();
        return Header.OK(tbLostPropertyResponseList, pagination);


    }
}
