package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbBaggage;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbBaggageRequest;
import com.project.jejuair.model.network.response.TbBaggageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TbBaggageApiLogicService extends BaseService<TbBaggageRequest, TbBaggageResponse, TbBaggage> {

    private TbBaggageResponse response(TbBaggage tbBaggage){
        TbBaggageResponse tbBaggageResponse = TbBaggageResponse.builder()
                .bagIdx(tbBaggage.getBagIdx())
                .bagDomesticOverseas(tbBaggage.getBagDomesticOverseas())
                .bagPrice(tbBaggage.getBagPrice())
                .bagWeight(tbBaggage.getBagWeight())
                .build();
        return tbBaggageResponse;
    }

    @Override
    public Header<TbBaggageResponse> create(Header<TbBaggageRequest> request) {
        TbBaggageRequest tbBaggageRequest = request.getData();
        TbBaggage tbBaggage = TbBaggage.builder()
                .bagDomesticOverseas(tbBaggageRequest.getBagDomesticOverseas())
                .bagPrice(tbBaggageRequest.getBagPrice())
                .bagWeight(tbBaggageRequest.getBagWeight())
                .build();
        TbBaggage newTbBaggage = baseRepository.save(tbBaggage);
        return Header.OK(response(newTbBaggage));
    }

    @Override
    public Header<TbBaggageResponse> read(Long bagIdx) {
        return baseRepository.findById(bagIdx).map(tbBaggage -> response(tbBaggage))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbBaggageResponse> update(Header<TbBaggageRequest> request) {
        TbBaggageRequest tbBaggageRequest = request.getData();
        Optional<TbBaggage> tbBaggage = baseRepository.findById(tbBaggageRequest.getBagIdx());

        return tbBaggage.map(
                newTbBaggage -> {
                    newTbBaggage.setBagDomesticOverseas(tbBaggageRequest.getBagDomesticOverseas());
                    newTbBaggage.setBagPrice(tbBaggageRequest.getBagPrice());
                    newTbBaggage.setBagWeight(tbBaggageRequest.getBagWeight());
                    return newTbBaggage;
                }).map(newTbBaggage -> baseRepository.save(newTbBaggage))
                .map(newTbBaggage -> response(newTbBaggage))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long bagIdx) {
        Optional<TbBaggage> tbBaggage = baseRepository.findById(bagIdx);        
        return tbBaggage.map(newTbBaggage -> {
            baseRepository.delete(newTbBaggage);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbBaggageResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbBaggage> tbBaggage = baseRepository.findAll(pageable);
        List<TbBaggageResponse> tbBaggageResponseList = tbBaggage.stream().map(
                newTbBaggage -> response(newTbBaggage)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbBaggage.getTotalPages())
                .totalElements(tbBaggage.getTotalElements())
                .currentPage(tbBaggage.getNumber())
                .currentElements(tbBaggage.getNumberOfElements())
                .build();
        return Header.OK(tbBaggageResponseList, pagination);
    }
}
