-- SELECT "Articles".name FROM (SELECT COUNT("ArticleKeywords"."keywordId") AS "count", "Keywords"."name" FROM "Keywords" JOIN "ArticleKeywords" ON "ArticleKeywords"."keywordId" = "Keywords".id GROUP BY "Keywords"."name" Order By "count" DESC) freq JOIN "ArticleKeywords" "Keywords" ON "ArticleKeywords"."keywordId" = "Keywords".id AND "ArticleKeywords"."articleId" = "Articles".id

--SELECT DISTINCT ON ("ArticleKeywords"."keywordId") "ArticleKeywords"."keywordId", "Keywords".name FROM "Keywords" JOIN "ArticleKeywords" ON "ArticleKeywords"."keywordId" = "Keywords".id


SELECT
	a.*,
	popular_keywords.name,
	popular_keywords.rel
FROM "Articles" a
	JOIN "ArticleKeywords" akk ON a.id = akk."articleId"
	JOIN 
		(SELECT 
			COUNT(ak."keywordId") AS rel,
			k.id, 
			k.name 
		FROM "Keywords" k
		JOIN 
			"ArticleKeywords" ak ON 
			ak."keywordId" = k.id 
		GROUP BY k.id, k.name Order By rel DESC)
	popular_keywords ON popular_keywords.id = akk."keywordId"


--select count(k.id) from keyword k join article_keyword ak ON 


