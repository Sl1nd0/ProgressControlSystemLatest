SELECT siteid, sitename, sitecolor
  FROM worksite;

============
DELETE   FROM worksite WHERE siteid = 14;

ALTER table worksite
Alter column sitecolor type BYTEA;

DROP 
table worksite

CReate Table worksite
(
siteid serial,
 sitename varchar(100), 
 red varchar(10),
green varchar(10),
blue varchar(10),

)
