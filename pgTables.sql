CREATE TABLE progressaccount
(
  userid serial PRIMARY KEY,
  username character varying(50) NOT NULL,
  usersurname character varying(50) NOT NULL,
  userbirthdate timestamp without time zone NOT NULL,
  startdate timestamp without time zone NOT NULL,
  userposition character varying(50) NOT NULL,
  useremail character varying(255) NOT NULL,
  usernumber character varying(20) NOT NULL,
  usergender character varying(20) NOT NULL,
  userpassword character varying(50) NOT NULL,
  useridentity character varying(13),
  workid character varying(2) NOT NULL,
  activestatus character varying(20) DEFAULT 'deactive'
)

======

CREATE TABLE employeeleave
(
 leaveid serial PRIMARY KEY,
  userid integer,
  managerid integer,
  manageremail character varying(100) NOT NULL,
  leavestatus character varying(50) DEFAULT NULL::character varying,
  startdate timestamp without time zone NOT NULL,
  enddate timestamp without time zone NOT NULL,
  leavenote character varying(500)
)


====

CREATE TABLE worksite
(
  siteid serial PRIMARY KEY,
  sitename character varying(50) NOT NULL,
  red character varying(10),
  green character varying(10),
  blue character varying(10)
)


================


CREATE TABLE postlocation
(
  locationid  serial PRIMARY KEY,
  sitename character varying(50) NOT NULL,
  locationmessage character varying(500) NOT NULL,
  locationstatus integer NOT NULL,
  userid integer REFERENCES progressAccount (userid)
)

=================

CREATE TABLE huddleupdates
(
  huddleid serial PRIMARY KEY,
  huddledate timestamp without time zone NOT NULL,
  accomplishyesterday text NOT NULL,
  accomplishtoday text NOT NULL,
  obstacles character varying(500) NOT NULL,
  needhelp character varying(400) NOT NULL,
  userid integer REFERENCES progressAccount(userid) 
  workid character varying(2) NOT NULL,

)



DELETE FROM employeeleave;
DELETE FROM postlocation;
SELECT * FROM postlocation;
DELETE FROM huddleupdates;



DELETE FROM worksite;
