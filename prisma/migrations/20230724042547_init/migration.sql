/*
  Warnings:

  - You are about to drop the column `userId` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Bookmark] DROP CONSTRAINT [Bookmark_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Bookmark] DROP COLUMN [userId];
ALTER TABLE [dbo].[Bookmark] ADD [authorId] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Bookmark] ADD CONSTRAINT [Bookmark_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
