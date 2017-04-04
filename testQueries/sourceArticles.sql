SELECT
a.*
FROM "Articles" a
JOIN "Sources" ss ON a."sourceId" = ss.id
JOIN
(SELECT 
s.* 
FROM "Sources" s 
WHERE s.id = '5') t 
ON
t.id = a."sourceId";