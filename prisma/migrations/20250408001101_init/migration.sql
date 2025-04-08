-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
