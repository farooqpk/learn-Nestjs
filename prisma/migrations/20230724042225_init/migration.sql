/*
  Warnings:

  - You are about to drop the column `description` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Bookmark` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Bookmark] DROP COLUMN [description],
[link];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
