USE MegaHerdtAPI
DECLARE @id as int;

SET @id = (SELECT ISNULL(MAX(Id),0) FROM ArticlesBrands);
DBCC CHECKIDENT(ArticlesBrands, RESEED, @id)
SET IDENTITY_INSERT ArticlesBrands ON
INSERT INTO ArticlesBrands ([Id], [Name], [Enabled] ) SELECT 1, N'HyperX', 1 WHERE NOT EXISTS (SELECT Id FROM ArticlesBrands WHERE Id=1)
SET IDENTITY_INSERT ArticlesBrands OFF

SET @id = (SELECT ISNULL(MAX(Id),0) FROM ArticlesCategories);
DBCC CHECKIDENT(ArticlesCategories, RESEED, @id)
SET IDENTITY_INSERT ArticlesCategories ON
INSERT INTO ArticlesCategories ([Id], [Name], [Enabled] ) SELECT 1, N'', 1 WHERE NOT EXISTS (SELECT Id FROM ArticlesCategories WHERE Id=1)
SET IDENTITY_INSERT ArticlesCategories OFF

delete from ArticlesCategories

select * from ArticlesCategories