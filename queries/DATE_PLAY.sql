SELECT locationid, sitename, locationmessage, locationstatus, userid, 
       locationdate
  FROM postlocation;

DELETE From postlocation

UPDATE postlocation SET locationstatus = 0, loationmessage = 'Left Cellc' 
WHERE userid = 95 AND locationstatus = 1 AND  locationdate > to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S')
  

UPDATE postlocation
SET locationstatus = 0
WHERE locationid = 2

Select * FROM postlocation WHERE sitename = 'Cellc' AND userid = '95'

SELECT to_char(now(), 'YYYY-MM-DD 00:00:00') -- FOR SETTING IT RIGHT


SELECT to_timestamp(to_char(now(), 'YYYY-MM-DD 03:00:00'), 'YYYY-MM-DD H:M:S') as MDATE 



SELECT * FROM postlocation WHERE sitename in (SELECT distinct sitename FROM postlocation) 
AND locationdate >  to_timestamp(to_char(now(), 'YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD H:M:S') AND userid = 95 AND locationstatus = 1