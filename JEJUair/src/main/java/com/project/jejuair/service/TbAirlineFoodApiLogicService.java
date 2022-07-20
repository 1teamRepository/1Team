package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbAirlineFood;
import com.project.jejuair.model.entity.TbExtraService;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbAirlineFoodRequest;
import com.project.jejuair.model.network.response.TbAirlineFoodResponse;
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
public class TbAirlineFoodApiLogicService extends BaseService<TbAirlineFoodRequest, TbAirlineFoodResponse, TbAirlineFood> {

    private TbAirlineFoodResponse response(TbAirlineFood tbAirlineFood){
        TbAirlineFoodResponse tbAirlineFoodResponse = TbAirlineFoodResponse.builder()
                .foodIdx(tbAirlineFood.getFoodIdx())
                .foodKorName(tbAirlineFood.getFoodKorName())
                .foodEngName(tbAirlineFood.getFoodEngName())
                .foodKrwPrice(tbAirlineFood.getFoodKrwPrice())
                .foodUsdPrice(tbAirlineFood.getFoodUsdPrice())
                .foodJpyPrice(tbAirlineFood.getFoodJpyPrice())
                .foodDiscount(tbAirlineFood.getFoodDiscount())
                .foodPicture(tbAirlineFood.getFoodPicture())
                .foodStartingPoint(tbAirlineFood.getFoodStartingPoint())
                .foodSpecific(tbAirlineFood.getFoodSpecific())
                .foodTitle(tbAirlineFood.getFoodTitle())
                .foodContent(tbAirlineFood.getFoodContent())
                .foodRegDate(tbAirlineFood.getFoodRegDate())
                .build();
        return tbAirlineFoodResponse;
    }

    @Override
    public Header<TbAirlineFoodResponse> create(Header<TbAirlineFoodRequest> request) {
        TbAirlineFoodRequest tbAirlineFoodRequest = request.getData();
        TbAirlineFood tbAirlineFood = TbAirlineFood.builder()
                .foodIdx(tbAirlineFoodRequest.getFoodIdx())
                .foodKorName(tbAirlineFoodRequest.getFoodKorName())
                .foodEngName(tbAirlineFoodRequest.getFoodEngName())
                .foodKrwPrice(tbAirlineFoodRequest.getFoodKrwPrice())
                .foodUsdPrice(tbAirlineFoodRequest.getFoodUsdPrice())
                .foodJpyPrice(tbAirlineFoodRequest.getFoodJpyPrice())
                .foodDiscount(tbAirlineFoodRequest.getFoodDiscount())
                .foodPicture(tbAirlineFoodRequest.getFoodPicture())
                .foodStartingPoint(tbAirlineFoodRequest.getFoodStartingPoint())
                .foodSpecific(tbAirlineFoodRequest.getFoodSpecific())
                .foodTitle(tbAirlineFoodRequest.getFoodTitle())
                .foodContent(tbAirlineFoodRequest.getFoodContent())
                .foodRegDate(LocalDateTime.now())
                .build();
        TbAirlineFood newTbAirlineFood = baseRepository.save(tbAirlineFood);
        return Header.OK(response(newTbAirlineFood));
    }

    @Override
    public Header<TbAirlineFoodResponse> read(Long foodIdx) {
        return baseRepository.findById(foodIdx).map(tbAirlineFood -> response(tbAirlineFood)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbAirlineFoodResponse> update(Header<TbAirlineFoodRequest> request) {
        TbAirlineFoodRequest tbAirlineFoodRequest = request.getData();
        Optional<TbAirlineFood> tbAirlineFood = baseRepository.findById(tbAirlineFoodRequest.getFoodIdx());

        return tbAirlineFood.map(
                tbAirlineFood1 -> {
                    tbAirlineFood1.setFoodKorName(tbAirlineFoodRequest.getFoodKorName());
                    tbAirlineFood1.setFoodEngName(tbAirlineFoodRequest.getFoodEngName());
                    tbAirlineFood1.setFoodKrwPrice(tbAirlineFoodRequest.getFoodKrwPrice());
                    tbAirlineFood1.setFoodUsdPrice(tbAirlineFoodRequest.getFoodUsdPrice());
                    tbAirlineFood1.setFoodJpyPrice(tbAirlineFoodRequest.getFoodJpyPrice());
                    tbAirlineFood1.setFoodDiscount(tbAirlineFoodRequest.getFoodDiscount());
                    tbAirlineFood1.setFoodPicture(tbAirlineFoodRequest.getFoodPicture());
                    tbAirlineFood1.setFoodStartingPoint(tbAirlineFoodRequest.getFoodStartingPoint());
                    tbAirlineFood1.setFoodSpecific(tbAirlineFoodRequest.getFoodSpecific());
                    tbAirlineFood1.setFoodTitle(tbAirlineFoodRequest.getFoodTitle());
                    tbAirlineFood1.setFoodContent(tbAirlineFoodRequest.getFoodContent());
                    return tbAirlineFood1;
                }).map(tbAirlineFood1 -> baseRepository.save(tbAirlineFood1))
                .map(tbAirlineFood1 -> response(tbAirlineFood1))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long foodIdx) {
        Optional<TbAirlineFood> tbAirlineFood = baseRepository.findById(foodIdx);
        return tbAirlineFood.map(tbAirlineFood1 -> {
            baseRepository.delete(tbAirlineFood1);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbAirlineFoodResponse>> search(Pageable pageable){
        //  객체를 리스트 타입으로 변환해서 반환
        Page<TbAirlineFood> tbAirlineFood = baseRepository.findAll(pageable);
        List<TbAirlineFoodResponse> tbAirlineFoodResponseList = tbAirlineFood.stream().map(
                tbAirlineFood1 -> response(tbAirlineFood1)).collect(Collectors.toList());
//
        Pagination pagination = Pagination.builder()
                .totalPages(tbAirlineFood.getTotalPages())
                .totalElements(tbAirlineFood.getTotalElements())
                .currentPage(tbAirlineFood.getNumber())
                .currentElements(tbAirlineFood.getNumberOfElements())
                .build();
        return Header.OK(tbAirlineFoodResponseList, pagination);
    }


}
