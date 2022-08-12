package com.project.jejuair.service;

import com.project.jejuair.model.entity.TbMember;
import com.project.jejuair.model.enumclass.member.MemberStatus;
import com.project.jejuair.model.network.Header;
import com.project.jejuair.model.network.Pagination;
import com.project.jejuair.model.network.request.TbMemberRequest;
import com.project.jejuair.model.network.response.TbMemberResponse;
import com.project.jejuair.repository.TbMemberRepository;
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
public class TbMemberApiLogicService extends BaseService<TbMemberRequest, TbMemberResponse, TbMember>{

    @Autowired
    private TbMemberRepository tbMemberRepository;

    private TbMemberResponse response(TbMember tbMember){
        TbMemberResponse tbMemberResponse = TbMemberResponse.builder()
                .memIdx(tbMember.getMemIdx())
                .memUserid(tbMember.getMemUserid())
                .memUserpw(tbMember.getMemUserpw())
                .memKoLastname(tbMember.getMemKoLastname())
                .memKoFirstname(tbMember.getMemKoFirstname())
                .memEngLastname(tbMember.getMemEngLastname())
                .memEngFirstname(tbMember.getMemEngFirstname())
                .memGender(tbMember.getMemGender())
                .memSsn(tbMember.getMemSsn())
                .memHp(tbMember.getMemHp())
                .memEmail(tbMember.getMemEmail())
                .memMarketing(tbMember.getMemMarketing())
                .memStatus(tbMember.getMemStatus())
                .memRegDate(tbMember.getMemRegDate())
                .memPoint(tbMember.getMemPoint())
                .memSnsPush(tbMember.getMemSnsPush())
                .build();
        return tbMemberResponse;
    }


    @Override
    public Header<TbMemberResponse> create(Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        TbMember tbMember = TbMember.builder()
                .memUserid(tbMemberRequest.getMemUserid())
                .memUserpw(tbMemberRequest.getMemUserpw())
                .memKoLastname(tbMemberRequest.getMemKoLastname())
                .memKoFirstname(tbMemberRequest.getMemKoFirstname())
                .memEngLastname(tbMemberRequest.getMemEngLastname())
                .memEngFirstname(tbMemberRequest.getMemEngFirstname())
                .memGender(tbMemberRequest.getMemGender())
                .memSsn(tbMemberRequest.getMemSsn())
                .memHp(tbMemberRequest.getMemHp())
                .memEmail(tbMemberRequest.getMemEmail())
                .memMarketing(tbMemberRequest.getMemMarketing())
                .memStatus(MemberStatus.REGISTERED)
                .memRegDate(LocalDateTime.now())
                .memSnsPush(tbMemberRequest.getMemSnsPush())
                .memPoint(0)
                .build();
        TbMember newTbMember = baseRepository.save(tbMember);
        return Header.OK(response(newTbMember));
    }

    @Override
    public Header<TbMemberResponse> read(Long memIdx) {
        return baseRepository.findById(memIdx).map(tbMember -> response(tbMember)).map(Header::OK)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<TbMemberResponse> update(Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        Optional<TbMember> tbMember = baseRepository.findById(tbMemberRequest.getMemIdx());
        return tbMember.map(
                newTbMember -> {
                    newTbMember.setMemUserpw(tbMemberRequest.getMemUserpw());
//                    newTbMember.setMemKoLastname(tbMemberRequest.getMemKoLastname());
//                    newTbMember.setMemKoFirstname(tbMemberRequest.getMemKoFirstname());
                    newTbMember.setMemEngLastname(tbMemberRequest.getMemEngLastname());
                    newTbMember.setMemEngFirstname(tbMemberRequest.getMemEngFirstname());
                    newTbMember.setMemGender(tbMemberRequest.getMemGender());
                    newTbMember.setMemHp(tbMemberRequest.getMemHp());
                    newTbMember.setMemEmail(tbMemberRequest.getMemEmail());
//                    System.out.println(tbMemberRequest.getMemEmail() + " 1");
                    newTbMember.setMemMarketing(tbMemberRequest.getMemMarketing());
//                    System.out.println(tbMemberRequest.getMemMarketing() + " 2");
                    newTbMember.setMemSnsPush(tbMemberRequest.getMemSnsPush());
//                    System.out.println(tbMemberRequest.getMemMarketing() +" 3");
                    newTbMember.setMemPoint(tbMemberRequest.getMemPoint());
                    return newTbMember;
                }).map(newTbMember -> baseRepository.save(newTbMember))
                .map(newTbMember -> response(newTbMember))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(Long memIdx) {
        Optional<TbMember> tbMember = baseRepository.findById(memIdx);
        return tbMember.map(newTbMember -> {
            baseRepository.delete(newTbMember);
            return Header.OK();
        }).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public int IdCheck(String memUserid) {
        int result = 1; //기본값

        if (memUserid.equals("")){
            result = 2;
        }
        else if (tbMemberRepository.findByMemUserid(memUserid).isEmpty()) {
            result = 0; //아이디가 사용가능할떄
        }else{ result = 1;}
        System.out.println(result);
        return result;
    }


    public int emailCheck(String memEmail) {
        int result = 1; //기본값

        if (memEmail.equals("")){
            result = 2;
        }
        else if (tbMemberRepository.findByMemEmail(memEmail).isEmpty()) {
            result = 0; // 없는 이메일
        }else{ result = 1;} //있는 이메일
        System.out.println(result);
        return result;
    }

    public Header<TbMemberResponse> emailOk(String memEmail){
        return tbMemberRepository.findByMemEmail(memEmail)
                .map(user -> response(user)).map(Header::OK)
                .orElseGet(() -> Header.ERROR(("데이터 없음")));
    }



    public Header<List<TbMemberResponse>> search(Pageable pageable){
        Page<TbMember> tbMember = baseRepository.findAll(pageable);
        List<TbMemberResponse> tbMemberResponseList = tbMember.stream().map(
                newTbMember -> response(newTbMember)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbMember.getTotalPages())
                .totalElements(tbMember.getTotalElements())
                .currentPage(tbMember.getNumber())
                .currentElements(tbMember.getNumberOfElements())
                .build();
        return Header.OK(tbMemberResponseList, pagination);
    }


    public Header<TbMemberResponse> pwCheck(String memUserid, String memUserpw){
        return tbMemberRepository.findByMemUseridAndMemUserpw(memUserid, memUserpw)
                .map(user -> response(user)).map(Header::OK)
                .orElseGet(() -> Header.ERROR(("데이터 없음")));
    }



    public Header<TbMemberResponse> pwUpdate(String memUserid, String memUserpw) {

        Optional<TbMember> tbMember = tbMemberRepository.findByMemUserid(memUserid);
        return tbMember.map(
                        newTbMember -> {
                            newTbMember.setMemUserpw(memUserpw);
                            return newTbMember;
                        }).map(newTbMember -> baseRepository.save(newTbMember))
                .map(newTbMember -> response(newTbMember))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<TbMemberResponse> nameChange(String memUserid, String memEngLastname, String memEngFirstname) {

        Optional<TbMember> tbMember = tbMemberRepository.findByMemUserid(memUserid);
        return tbMember.map(
                        newTbMember -> {
                            newTbMember.setMemEngLastname(memEngLastname);
                            newTbMember.setMemEngFirstname(memEngFirstname);
                            return newTbMember;
                        }).map(newTbMember -> baseRepository.save(newTbMember))
                .map(newTbMember -> response(newTbMember))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<TbMemberResponse> pointUpdate(Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        Optional<TbMember> tbMember = baseRepository.findById(tbMemberRequest.getMemIdx());
        Integer existingPoint = tbMember.get().getMemPoint();
        return tbMember.map(
                        newTbMember -> {
                            newTbMember.setMemPoint(existingPoint+tbMemberRequest.getMemPoint());
                            return newTbMember;
                        }).map(newTbMember -> baseRepository.save(newTbMember))
                .map(newTbMember -> response(newTbMember))
                .map(Header::OK).orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    public Header<List<TbMemberResponse>> searchByAll(Pageable pageable, Header<TbMemberRequest> request) {
        TbMemberRequest tbMemberRequest = request.getData();
        Page<TbMember> tbMember = tbMemberRepository
                .findByMemUserid(tbMemberRequest.getMemUserid(), pageable);
        List<TbMemberResponse> tbMemberResponseList = tbMember.stream().map(
                newTbMember -> response(newTbMember)).collect(Collectors.toList());

        Pagination pagination = Pagination.builder()
                .totalPages(tbMember.getTotalPages())
                .totalElements(tbMember.getTotalElements())
                .currentPage(tbMember.getNumber())
                .currentElements(tbMember.getNumberOfElements())
                .build();
        return Header.OK(tbMemberResponseList, pagination);
    }

}
