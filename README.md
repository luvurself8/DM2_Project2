# DM2_Project2
디지털 마스터 2기_ 2차 프로젝트(지도 API를 이용한 여행 플랜/기록 서비스)
<br> 2nd Project at Digital Masater Program
<br> Travel planning web service utlizing Map API (GoogleMap, Kakao Map)
링크 :  <https://drive.google.com/drive/folders/1GK0yX1X8cTZZjbr0iFqLW8AcFWWcQKtG>

# 트립코드 사용방법
트립코드(스프링부트파일을실행 predict_) 사용전 파일세팅
먼저 1.1 , 1,2 실행시켜 세팅

1.1 sql으로 파일의 순서대로 실행해주세요 (DB생성Oracle.sql을참고)
코드실행}

DROP TABLE members;
DROP TABLE member_plan;
DROP TABLE planservice;
DROP SEQUENCE member_plan_seq;
DROP SEQUENCE planservice_seq;
DROP TABLE price; --이건 주식그래프를 위한거라 생략가능


  CREATE TABLE EXRATE
   (   
   RATE_TIME VARCHAR2(100) NOT NULL, 
   USD NUMBER NOT NULL, 
   CNY NUMBER NOT NULL, 
   JPY NUMBER NOT NULL, 
   EURO NUMBER NOT NULL, 
   DOLLAR_INDEX NUMBER NOT NULL
   ); 
 
 
 CREATE TABLE members
 (
    memberid VARCHAR2(100) PRIMARY KEY,
    membername VARCHAR2(30) NOT NULL, 
    memberpwd VARCHAR2(100) NOT NULL,
    phone VARCHAR2(100),
    email VARCHAR2(100) NOT NULL,
    enabled NUMBER DEFAULT 1 CHECK(enabled IN (1,0)),
    rolename VARCHAR2(20) DEFAULT 'ROLE_USER' 
 );

-- 주식그래프를 위한 테이블로 생략가능
 CREATE TABLE price 
 (
    datetime VARCHAR2(100) PRIMARY KEY, 
    close_rate NUMBER NOT NULL,
    open_rate NUMBER NOT NULL ,
    high_rate NUMBER NOT NULL,
    low_rate NUMBER  NOT NULL
 
 );
 
CREATE TABLE member_plan
(
    memberid  VARCHAR2(100) REFERENCES members(memberid) ON DELETE CASCADE,
    planseq NUMBER PRIMARY KEY,
    plantitle  VARCHAR2(400)  UNIQUE NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    departure VARCHAR2(50) NOT NULL,
    destination VARCHAR2(50) NOT NULL
    
);
CREATE SEQUENCE member_plan_seq;

CREATE TABLE planservice
(
    planseq NUMBER REFERENCES member_pl스) 브라우저 위치 제공 동의를 해야됩니다. 



