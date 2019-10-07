
CREATE TABLE progressaccount
(
  userid serial NOT NULL,
  username character varying(50) NOT NULL,
  usersurname character varying(50) NOT NULL,
  userbirthdate timestamp without time zone NOT NULL,
  startdate timestamp without time zone NOT NULL,
  userposition character varying(50) NOT NULL,
  useremail character varying(255) NOT NULL,
  usernumber character varying(15) NOT NULL,
  usergender character varying(20) NOT NULL,
  userpassword character varying(50) NOT NULL,
  useridentity character varying(50) NOT NULL,
  activestatus character varying(20) DEFAULT 'deactive'::character varying,
  workid character varying(5),
  sickleave integer,
  annualleave integer
)

====

CREATE TABLE employeeleave
(
  leaveid serial NOT NULL,
  userid integer,
  managerid integer,
  manageremail character varying(100) NOT NULL,
  leavestatus character varying(50) DEFAULT NULL::character varying,
  startdate timestamp without time zone NOT NULL,
  enddate timestamp without time zone NOT NULL,
  leavenote character varying(300),
  leavetype character varying(20)
)

===

CREATE TABLE worksite
(
  siteid serial NOT NULL,
  sitename character varying(50) NOT NULL,
  sitecolor character varying(50) NOT NULL 
)


========


 


CREATE TABLE postlocation
(
  locationid serial NOT NULL,
  sitename character varying(50) NOT NULL,
  locationmessage character varying(500) NOT NULL,
  locationstatus integer NOT NULL,
  userid integer,
  locationdate timestamp with time zone 
)


 ====



CREATE TABLE huddleupdates
(
  huddleid serial NOT NULL,
  huddledate timestamp without time zone NOT NULL,
  accomplishyesterday text NOT NULL,
  accomplishtoday text NOT NULL,
  obstacles character varying(500) NOT NULL,
  needhelp character varying(400) NOT NULL,
  userid integer,
  workid character varying(5) 
)
 


 

