package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbPassenger;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbPassengerRequest;
import com.project.jejuair.model.network.response.TbPassengerResponse;
import com.project.jejuair.repository.TbAirlineFoodRepository;
import com.project.jejuair.repository.TbBaggageRepository;
import com.project.jejuair.repository.TbPassengerRepository;
import com.project.jejuair.repository.TbReservationRepository;
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
public class TbPassengerApiLogicService extends BaseService<TbPassengerRequest, TbPassengerResponse, TbPassenger>{

    private final TbReservationRepository tbReservationRepository;

    private final TbPassengerRepository tbPassengerRepository;

    private final TbAirlineFoodRepository tbAirlineFoodRepository;

    private final TbBaggageRepository tbBaggageRepository;

    public static TbPassengerResponse response(TbPassenger tbPassenger){
        TbPassengerResponse tbPassengerResponse = TbPassengerResponse.builder()
                .pasIdx(tbPassenger.getPasIdx())
                .pasFirstname(tbPassenger.getPasFirstname())
                .pasLastname(tbPassenger.getPasLastname())
                .pasBirthDate(tbPassenger.getPasBirthDate())
                .pasGender(tbPassenger.getPasGender())
                .pasRegDate(tbPassenger.getPasRegDate())
                .pasSeat(tbPassenger.getPasSeat())
                .tbReservationResIdx(tbPassenger.getTbReservation().getResIdx())

                .tbAirlineFoodFoodIdx(tbPassenger.getTbAirlineFood().getFoodIdx())
                .foodKorName(tbPassenger.getTbAirlineFood().getFoodKorName())
                .foodKrwPrice(tbPassenger.getTbAirlineFood().getFoodKrwPrice())

                .tbBaggageBagIdx(tbPassenger.getTbBaggage().getBagIdx())
                .bagPrice(tbPassenger.getTbBaggage().getBagPrice())
                .bagWeight(tbPassenger.getTbBaggage().getBagWeight())
                .build();
        return tbPassengerResponse;
    }


    @Override
    public Header<TbPassengerResponse> create(Header<TbPassengerRequest> request) {
        TbPassengerRequest tbPassengerRequest = request.getData();
        TbPassenger tbPassenger = TbPassenger.builder()
                .pasFirstname(tbPassengerRequest.getPasFirstname())
                .pasLastname(tbPassengerRequest.getPasLastname())
                .pasBirthDate(tbPassengerRequest.getPasBirthDate())
                .pasGender(tbPassengerRequest.getPasGender())
                .pasSeat(tbPassengerRequest.getPasSeat())
                .pasRegDate(LocalDateTime.now())
                .tbReservation(tbReservationRepository.findByResIdx(tbPassengerRequest.getTbReservationResIdx()).get())
                .tbAirlineFood(tbAirlineFoodRepository.findByFoodIdx(tbPassengerRequest.getTbAirlineFoodFoodIdx()).get())
                .tbBaggage(tbBaggageRepository.findByBagIdx(tbPassengerRequest.getTbBaggageBagIdx()).get())
                .build();
        TbPassenger newPassenger = baseRepository.save(tbPassenger);
        return Header.OK(response(newPassenger));
    }

    @Override
    public Header<TbPassengerResponse> read(Long pasIdx) {
        return baseRepository.findById(pasIdx).map(tbPassenger -> response(tbPassenger)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbPassengerResponse> update(Header<TbPassengerRequest> request) {
        TbPassengerRequest tbPassengerRequest = request.getData();
        Optional<TbPassenger> tbPassenger = baseRepository.findById(tbPassengerRequest.getPasIdx());

        return tbPassenger.map(
                newTbPassenger -> {
                    newTbPassenger.setPasFirstname(tbPassengerRequest.getPasFirstname());
                    newTbPassenger.setPasLastname(tbPassengerRequest.getPasLastname());
                    newTbPassenger.setPasBirthDate(tbPassengerRequest.getPasBirthDate());
                    newTbPassenger.setPasGender(tbPassengerRequest.getPasGender());
                    return newTbPassenger;
                }).map(newTbPassenger -> baseRepository.save(newTbPassenger))
                .map(newTbPassenger -> response(newTbPassenger))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long pasIdx) {
        Optional<TbPassenger> tbPassenger = baseRepository.findById(pasIdx);
        return tbPassenger.map(newTbPassenger -> {
            baseRepository.delete(newTbPassenger);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbPassengerResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbPassenger> tbPassenger = baseRepository.findAll(pageable);
        List<TbPassengerResponse> tbPassengerResponseList = tbPassenger.stream().map(
                newTbPassenger -> response(newTbPassenger)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbPassenger.getTotalPages())
                .totalElements(tbPassenger.getTotalElements())
                .currentPage(tbPassenger.getNumber())
                .currentElements(tbPassenger.getNumberOfElements())
                .build();
        return Header.OK(tbPassengerResponseList, pagination);
    }

    public Header<List<TbPassengerResponse>> reservation(Long id){
        List<TbPassenger> tbPassengerList = tbPassengerRepository.findByTbReservationResIdx(id);
        List<TbPassengerResponse> tbPassengerResponseList = tbPassengerList.stream()
                .map(tbPassengers -> response(tbPassengers)).collect(Collectors.toList());
        return Header.OK(tbPassengerResponseList);
    }


}
