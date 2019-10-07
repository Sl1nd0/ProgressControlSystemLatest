ALTER TABLE progressAccount
ADD column workID varchar(5);

UPDATE progressAccount
SET workid = 2
WHERE userPosition like '%Support%'

SELECT * 
FROM huddleupdates

ALTER Table huddleupdates

UPDATE progressAccount
SET workid = 3, userposition = 'Consultant'
WHERE username like '%Jamie%'

INSERT INTO huddleupdates(huddledate, accomplishyesterday, accomplishtoday, obstacles, userid) VALUES ( 'Now()', 'aaaaaaaaaaaa', 'bbbbbbbbbbbbbb', 'cccccccccccccc', '68')



INSERT INTO huddleupdates(huddledate, accomplishyesterday, accomplishtoday, obstacles, userid) VALUES ( 'Now()', 'aaaaaaaa', 'bbbbbbbbbbb', 'ccccccccccc', '68')