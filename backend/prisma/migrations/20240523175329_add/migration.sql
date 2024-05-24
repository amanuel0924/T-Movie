/*
  Warnings:

  - Added the required column `status` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "status" BOOLEAN NOT NULL;
