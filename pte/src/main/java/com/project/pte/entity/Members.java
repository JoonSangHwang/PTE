package com.project.pte.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Members {

    @Id @GeneratedValue
    @Column(name = "member_no")
    private Long id;
}
