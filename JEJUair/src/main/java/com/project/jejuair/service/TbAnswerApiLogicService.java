package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbAnswer;
import com.project.jejuair.model.enumclass.common.Check;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbAnswerRequest;
import com.project.jejuair.model.network.response.TbAnswerResponse;
import com.project.jejuair.repository.TbAnswerRepository;
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
public class TbAnswerApiLogicService extends BaseService<TbAnswerRequest, TbAnswerResponse, TbAnswer> {

    private TbAnswerResponse response(TbAnswer tbAnswer){
        TbAnswerResponse tbAnswerResponse = TbAnswerResponse.builder()
                .ansIdx(tbAnswer.getAnsIdx())
                .ansInquiryContent(tbAnswer.getAnsInquiryContent())
                .ansUserid(tbAnswer.getAnsUserid())
                .ansAnswerCheck(tbAnswer.getAnsAnswerCheck())
                .ansInquiryTitle(tbAnswer.getAnsInquiryTitle())
                .ansAnswerContent(tbAnswer.getAnsAnswerContent())
                .ansInquiryRegDate(tbAnswer.getAnsInquiryRegDate())
                .ansAnswerRegDate(tbAnswer.getAnsAnswerRegDate())
                .ansMemIdx(tbAnswer.getAnsMemIdx())
                .build();
        return tbAnswerResponse;
    }

    @Override
    public Header<TbAnswerResponse> create(Header<TbAnswerRequest> request) {
        TbAnswerRequest tbAnswerRequest = request.getData();
        TbAnswer tbAnswer = TbAnswer.builder()
                .ansInquiryContent(tbAnswerRequest.getAnsInquiryContent())
                .ansUserid(tbAnswerRequest.getAnsUserid())
                .ansAnswerCheck(Check.No)
                .ansInquiryTitle(tbAnswerRequest.getAnsInquiryTitle())
                .ansAnswerContent(tbAnswerRequest.getAnsAnswerContent())
                .ansInquiryRegDate(LocalDateTime.now())
                .ansAnswerRegDate(tbAnswerRequest.getAnsAnswerRegDate())
                .ansMemIdx(tbAnswerRequest.getAnsMemIdx())
                .build();
        TbAnswer newTbAnswer = baseRepository.save(tbAnswer);
        return Header.OK(response(newTbAnswer));
    }


    @Override
    public Header<TbAnswerResponse> read(Long ansIdx) {
        return baseRepository.findById(ansIdx).map(tbAnswer -> response(tbAnswer))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));

    }



    @Override
    public Header<TbAnswerResponse> update(Header<TbAnswerRequest> request) {
        TbAnswerRequest tbAnswerRequest = request.getData();
        Optional<TbAnswer> tbAnswer = baseRepository.findById(tbAnswerRequest.getAnsIdx());
        return tbAnswer.map(
                        newTbAnswer -> {
                            newTbAnswer.setAnsInquiryContent(tbAnswerRequest.getAnsInquiryTitle());
                            newTbAnswer.setAnsInquiryContent(tbAnswerRequest.getAnsInquiryContent());
                            newTbAnswer.setAnsUserid(tbAnswerRequest.getAnsUserid());
                            newTbAnswer.setAnsAnswerCheck(tbAnswerRequest.getAnsAnswerCheck());
                            newTbAnswer.setAnsAnswerContent(tbAnswerRequest.getAnsAnswerContent());
                            newTbAnswer.setAnsInquiryRegDate(tbAnswerRequest.getAnsInquiryRegDate());
                            newTbAnswer.setAnsAnswerRegDate(LocalDateTime.now());

                            return newTbAnswer;
                        }).map(newTbAnswer -> baseRepository.save(newTbAnswer))
                .map(newTbAnswer -> response(newTbAnswer)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long ansIdx) {
        Optional<TbAnswer> tbAnswer = baseRepository.findById(ansIdx);
        return tbAnswer.map(newTbAnswer -> {
            baseRepository.delete(newTbAnswer);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbAnswerResponse>> search(Pageable pageable){
        Page<TbAnswer> tbAnswer = baseRepository.findAll(pageable);
        List<TbAnswerResponse> tbAnswerResponseList = tbAnswer.stream().map(
                newTbAnswer -> response(newTbAnswer)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbAnswer.getTotalPages())
                .totalElements(tbAnswer.getTotalElements())
                .currentPage(tbAnswer.getNumber())
                .currentElements(tbAnswer.getNumberOfElements())
                .build();
        return Header.OK(tbAnswerResponseList, pagination);
    }

    public Header<List<TbAnswerResponse>> inquiryOk(String ansUserid, Pageable pageable){
        Page<TbAnswer> tbAnswersList = baseRepository.findAll(pageable);
        List<TbAnswerResponse> tbAnswerResponseList = tbAnswersList.stream()
                .map(tbAnswer -> response(tbAnswer))
                .filter(tbAnswerResponse -> tbAnswerResponse.getAnsUserid().equals(ansUserid)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbAnswersList.getTotalPages())
                .totalElements(tbAnswersList.getTotalElements())
                .currentPage(tbAnswersList.getNumber())
                .currentElements(tbAnswersList.getNumberOfElements())
                .build();
        return Header.OK(tbAnswerResponseList, pagination);
    }
}
