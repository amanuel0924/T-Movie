/*
  Warnings:

  - Added the required column `released` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "released" TIMESTAMP(3) NOT NULL;
