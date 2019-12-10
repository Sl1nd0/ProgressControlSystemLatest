========================= Create progressAccount Query ===========================================================================================

Create Table progressAccount(
   userid serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   usersurname VARCHAR (50) NOT NULL,
   userbirthdate TIMESTAMP without time zone NOT NULL,
   startdate TIMESTAMP without time zone NOT NULL,
   userposition VARCHAR (50) NOT NULL,
   useremail VARCHAR (255) UNIQUE NOT NULL,
   usernumber integer  NOT NULL,
   usergender VARCHAR (20) NOT NULL,
   userpassword VARCHAR (50) NOT NULL
)

SELECT * 
FROm progressAccount

=========================================  Create workSite Query ===================================================================================

Create Table workSite (
   siteid serial PRIMARY KEY,
   sitename VARCHAR (50) UNIQUE NOT NULL,
   sitecolor VARCHAR (50) NOT NULL
)

=========================================  Create postLocation Query ===================================================================================

Create Table postLocation (
   locationid serial PRIMARY KEY,
   sitename VARCHAR (50) NOT NULL,
   locationmessage VARCHAR (500) NOT NULL,
   locationstatus integer  NOT NULL,
   userid integer REFERENCES progressAccount (userid)

)

=========================================  Create employeeLeave Query ===================================================================================

Create Table employeeLeave (

   leaveid serial PRIMARY KEY,
   annualeave integer,
   sickleave integer,
   managerid integer DEFAULT NULL,
   userid integer REFERENCES progressAccount(userid),
   leavestatus varchar(50) default null
  -- enddate TIMESTAMP without time zone NOT NULL,
  -- leavenote VARCHAR (500) NOT NULL,
   
)


==================== ALTER Query ================================================================================

ALTER Table progressAccount
Alter Column usernumber SET DATA Type varchar(15);

ALTER Table progressAccount
Add Column activeStatus varchar(20) default 'deactive';

ALTER Table postLocation
Add Column locationDate TIMESTAMP;


DELETE FROM progressAccount

DELETE FROM huddleupdates
DELETE FROM employeeleave


   <td> {{leave.leavedate}} </td>
                    <td> {{leave.empName}} </td>
                    <td> {{leave.empSur}} </td>
                    <td> {{leave.empEmail}} </td>
                    <td> {{leave.empType}} </td>
                    <td> {{leave.empDays}} </td> 
		    <td> {{leave.startDate}} </td> 
		    <td> {{leave.endDate}} </td> 

SELECT (DATE_PART('day', '2019-08-30'::date) - DATE_PART('day','2019-08-29' ::date))+1


DELETE FROM employeeleave  WHERE leaveid = 54 AND manageremail = 'ssankabi@gmail.com'

UPDATE progressaccount SET annualleave = ()

SELECT *
FROM employeeleave
		    
SELECT A.leaveid, B.username, B.usersurname, B.useremail, A.leavetype, A.startdate, A.enddate, A.leavestatus
(SELECT (DATE_PART('day',A.enddate::date) - DATE_PART('day', A.startdate::date))+1) as leavedays
FROM employeeleave A
Inner JOIN progressaccount B ON A.userid = B.userid


UPDATE progressAccount
SET activeStatus = 'deactive'

SELECT A.leaveid,  B.username, A.manageremail, B.usersurname, B.useremail, A.leavetype, A.startdate, 
A.enddate, A.leavestatus,  (SELECT (DATE_PART('day',A.enddate::date) - DATE_PART('day', A.startdate::date))+1)
 as leavedays  FROM employeeleave A  Inner JOIN progressaccount B ON A.userid = B.userid

 SELECT A.leaveid,  B.username, A.manageremail, B.usersurname, B.useremail, A.leavetype, A.startdate, A.enddate,
  A.leavestatus,  (SELECT (DATE_PART('day',A.enddate::date) - DATE_PART('day', A.startdate::date))+1) 
 as leavedays  FROM employeeleave A  Inner JOIN progressaccount B ON A.userid = B.userid

SELECT count(*) FROM employeeleave

UPDATE progressaccount SET annualleave = 20 - (SELECT (DATE_PART('day',enddate::date) - 
DATE_PART('day', startdate::date))+1)  WHERE useremail = 'ssankabi@gmail.com' AND usernumber = '+27793691302';


SELECT count(*) FROM employeeleave  WHERE leaveid = 55

SELECT * FROM progressAccount WHERE useremail not like 'ssankabi@gmail.com%'

   leavenote VARCHAR (500) NOT NULL,

UPDATE progressAccount
SET activestatus = 'active'
WHERE useremail like 'Silindokuhle.Nkabinde%'


INSERT INTO progressAccount(username, usersurname, userbirthdate, startdate,  userposition, useremail, usernumber, usergender, userpassword, useridentity) VALUES ( 'Silindokuhle', 'Nkabinde',
 '1995-10-05T22:00:00.000Z', '2019-08-03T22:00:00.000Z', 'Junior Software Developer', 'ssankabi@gmail.com', '0793691302', 'Male', '@Sli2354', );

=========================================  Create huddleUpdates Query ===================================================================================

Create Table huddleUpdates (
   huddleid serial PRIMARY KEY,
   huddledate TIMESTAMP NOT NULL,
   accomplishyesterday text NOT NULL,
   accomplishtoday text NOT NULL,
   obstacles varchar(500) NOT NULL,
   needhelp varchar(400) NOT NULL,
  userid integer REFERENCES progressAccount(userid) 
)




INSERT INTO progressAccount(username, usersurname, userbirthdate, startdate,  userposition, useremail, usernumber, usergender, userpassword) VALUES ( 'Silindokuhle', 'Nkabinde', '1995-10-05T22:00:00.000Z', '2019-08-03T22:00:00.000Z', 'Junior Software Developer', 'ssankabi@gmail.com', '0793691302', 'Male', '@Sli2354');


select * 
from huddleUpdates


ALTER table employeeleave
add Column LEAVENOTE varchar(200);


SELECT * FROM employeeleave

SELECT username, usersurname, useremail, usernumber FROM progressaccount 
WHERE username = 'Nonjabulo' AND useremail = 'myworkcv951006@gmail.com';

SELECT username, usersurname, useremail, usernumber FROM progressaccount WHERE username = 'Silindokuhle'
 AND usersurname = 'Nkabinde' AND useremail = 'ssankabi@gmail.com' AND usernumber = '+27793691302';


Select username, useremail, annualleave, sickleave
From progressaccount WHERE useremail like 'ssankabi@gmail.com'% AND usernumber like '+27793691302%'


Delete from progressaccount where userid = 96


UPDATE progressaccount SET sickleave = 20, annualleave = 12 WHERE useridentity like '9510065619081%' AND useremail like 'ssankabi@gmail.com%' 

Create Table employeeLeave (

   leaveid serial PRIMARY KEY,
   userid integer REFERENCES progressAccount(userid),
   managerid integer DEFAULT NULL,
   manageremail varchar(100) not null,
   leavestatus varchar(50) default null,
   startdate TIMESTAMP without time zone NOT NULL,
   enddate TIMESTAMP without time zone NOT NULL
  -- leavenote VARCHAR (500) NOT NULL,
)



SELECT DATEDIFF(yy, '2011/08/25', '2017/08/25') AS DateDiff;


--DATE_PART('year', end) - DATE_PART('year', start)

SELECT (DATE_PART('year', '2011/08/25'::date) - DATE_PART('year', '2017/08/25'::date))+1 as mydays



SELECT (DATE_PART('day','2019-08-28T22:00:00.000Z'::date) - DATE_PART('day','2019-08-28T22:00:00.000Z'::date))+1 
as mydays From progressaccount  WHERE useremail = 'ssankabi@gmail.com' AND usernumber = '+27793691302';







Joshua Selman