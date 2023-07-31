
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
    planseq NUMBER REFERENCES member_plan(planseq) ON DELETE CASCADE,
    planservice_seq NUMBER PRIMARY KEY,
    daynum NUMBER NOT NULL,
    placenum NUMBER NOT NULL,
    placename VARCHAR2(500) NOT NULL,
    placebudget NUMBER,
    placeexpenditure number,
    placememo VARCHAR2(1000),
    lat NUMBER NOT NULL,
    lng NUMBER NOT NULL

);

CREATE SEQUENCE planservice_seq;

CREATE TABLE diary
(
    planseq NUMBER REFERENCES member_plan(planseq) ON DELETE CASCADE
    , daynum NUMBER 
    , diary_seq number PRIMARY KEY
    , regdate DATE DEFAULT SYSDATE
    , diary_title VARCHAR2(100) NOT NULL
    , diary_text VARCHAR2(3000) NOT NULL
);
CREATE SEQUENCE diary_seq;