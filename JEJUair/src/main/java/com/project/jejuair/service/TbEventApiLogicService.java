package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbEvent;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbEventRequest;
import com.project.jejuair.model.network.response.TbEventResponse;
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
public class TbEventApiLogicService extends BaseService<TbEventRequest, TbEventResponse, TbEvent> {

    private TbEventResponse response(TbEvent tbEvent){
        TbEventResponse tbEventResponse = TbEventResponse.builder()
                .evtIdx(tbEvent.getEvtIdx())
                .evtTitle(tbEvent.getEvtTitle())
                .evtContent(tbEvent.getEvtContent())
                .evtImg(tbEvent.getEvtImg())
                .evtStartDate(tbEvent.getEvtStartDate())
                .evtEndDate(tbEvent.getEvtEndDate())
                .evtRegDate(tbEvent.getEvtRegDate())
                .build();
        return tbEventResponse;
    }

    @Override
    public Header<TbEventResponse> create(Header<TbEventRequest> request) {
        TbEventRequest tbEventRequest = request.getData();
        TbEvent tbEvent = TbEvent.builder()
                .evtTitle(tbEventRequest.getEvtTitle())
                .evtContent(tbEventRequest.getEvtContent())
                .evtImg(tbEventRequest.getEvtImg())
                .evtStartDate(tbEventRequest.getEvtStartDate())
                .evtEndDate(tbEventRequest.getEvtEndDate())
                .evtRegDate(LocalDateTime.now())
                .build();
        TbEvent newTbEvent = baseRepository.save(tbEvent);
        return Header.OK(response(newTbEvent));
    }

    @Override
    public Header<TbEventResponse> read(Long evtIdx) {
        return baseRepository.findById(evtIdx).map(tbEvent -> response(tbEvent)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbEventResponse> update(Header<TbEventRequest> request) {
        TbEventRequest tbEventRequest = request.getData();
        Optional<TbEvent> tbEvent = baseRepository.findById(tbEventRequest.getEvtIdx());
        return tbEvent.map(
                newTbEvent -> {
                    newTbEvent.setEvtTitle(tbEventRequest.getEvtTitle());
                    newTbEvent.setEvtContent(tbEventRequest.getEvtContent());
                    newTbEvent.setEvtImg(tbEventRequest.getEvtImg());
                    newTbEvent.setEvtStartDate(tbEventRequest.getEvtStartDate());
                    newTbEvent.setEvtEndDate(tbEventRequest.getEvtEndDate());
                    return newTbEvent;
                }).map(newTbEvent -> baseRepository.save(newTbEvent))
                .map(newTbEvent -> response(newTbEvent)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long evtIdx) {
        Optional<TbEvent> tbEvent = baseRepository.findById(evtIdx);
        return tbEvent.map(newTbEvent -> {
            baseRepository.delete(newTbEvent);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbEventResponse>> search(Pageable pageable){
        Page<TbEvent> tbEvent = baseRepository.findAll(pageable);
        List<TbEventResponse> tbEventResponseList = tbEvent.stream().map(
                newTbEvent -> response(newTbEvent)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbEvent.getTotalPages())
                .totalElements(tbEvent.getTotalElements())
                .currentPage(tbEvent.getNumber())
                .currentElements(tbEvent.getNumberOfElements())
                .build();
        return Header.OK(tbEventResponseList, pagination);
    }

}
