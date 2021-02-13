package com.project.pte.api;

import com.project.pte.entity.Members;
import com.project.pte.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class hello {

    @Autowired
    MemberRepository memberRepository;

    @GetMapping("/api/hello")
    public String hello() {
        return "안녕하세요. 경민 현재 서버시간은 "+new Date() +"입니다. \n";
    }

    @GetMapping("/api/hello2")
    public String hello2() {
        return "안녕하세요. 경민2 현재 서버시간은 "+new Date() +"입니다. \n";
    }

    @GetMapping("/api/dbTest")
    public Members dbTest() {
        Members members = new Members();
        members.setId(1L);

        Optional<Members> byId = memberRepository.findById(1L);
        if (!byId.isPresent()) {
            memberRepository.save(members);
            Optional<Members> byId2 = memberRepository.findById(1L);
            return byId2.get();
        }

        return byId.get();
    }
}
