SELECT locationid, sitename, locationmessage, locationstatus, userid, 
       locationdate
  FROM postlocation;

ALTER Table postlocation 
ALTER COLUMN locationdate type timestamp with time zone