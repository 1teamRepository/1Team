package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbDestination;
import com.project.jejuair.model.entity.TbMember;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbDestinationRequest;
import com.project.jejuair.model.network.response.TbDestinationResponse;
import com.project.jejuair.model.network.response.TbMemberResponse;
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
public class TbDestinationApiLogicService extends BaseService<TbDestinationRequest, TbDestinationResponse, TbDestination> {

    private TbDestinationResponse response(TbDestination tbDestination){
        TbDestinationResponse tbDestinationResponse = TbDestinationResponse.builder()
                .desContinent(tbDestination.getDesContinent())
                .desDestination(tbDestination.getDesDestination())
                .desAirportCode(tbDestination.getDesAirportCode())
                .desRegDate(tbDestination.getDesRegDate())
                .build();
        return tbDestinationResponse;
    }

    @Override
    public Header<TbDestinationResponse> create(Header<TbDestinationRequest> request) {
        TbDestinationRequest tbDestinationRequest = request.getData();
        TbDestination tbDestination = TbDestination.builder()
                .desContinent(tbDestinationRequest.getDesContinent())
                .desDestination(tbDestinationRequest.getDesDestination())
                .desAirportCode(tbDestinationRequest.getDesAirportCode())
                .desRegDate(LocalDateTime.now())
                .build();
        TbDestination newTbDestination = baseRepository.save(tbDestination);
        return Header.OK(response(newTbDestination));
    }

    @Override
    public Header<TbDestinationResponse> read(Long desIdx) {
        return baseRepository.findById(desIdx).map(tbDestination -> response(tbDestination)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbDestinationResponse> update(Header<TbDestinationRequest> request) {
        TbDestinationRequest tbDestinationRequest = request.getData();
        Optional<TbDestination> tbDestination = baseRepository.findById(tbDestinationRequest.getDesIdx());
        return tbDestination.map(
                newTbDestination -> {
                    newTbDestination.setDesContinent(tbDestinationRequest.getDesContinent());
                    newTbDestination.setDesDestination(tbDestinationRequest.getDesDestination());
                    newTbDestination.setDesAirportCode(tbDestinationRequest.getDesAirportCode());
                    return newTbDestination;
                }).map(newTbDestination -> baseRepository.save(newTbDestination))
                .map(newTbDestination -> response(newTbDestination)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long desIdx) {
        Optional<TbDestination> tbDestination = baseRepository.findById(desIdx);
        return tbDestination.map(newTbDestination -> {
            baseRepository.delete(newTbDestination);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbDestinationResponse>> search(Pageable pageable){
        Page<TbDestination> tbDestination = baseRepository.findAll(pageable);
        List<TbDestinationResponse> tbDestinationResponseList = tbDestination.stream().map(
                newTbDestination -> response(newTbDestination)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbDestination.getTotalPages())
                .totalElements(tbDestination.getTotalElements())
                .currentPage(tbDestination.getNumber())
                .currentElements(tbDestination.getNumberOfElements())
                .build();
        return Header.OK(tbDestinationResponseList, pagination);
    }


}
