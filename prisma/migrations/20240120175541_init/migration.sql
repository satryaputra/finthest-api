-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "refreshToken" TEXT,
    "refreshTokenExpire" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoFinance" (
    "id" TEXT NOT NULL,
    "idUsers" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "loan" DOUBLE PRECISION,
    "month" INTEGER,
    "savingMoney" DOUBLE PRECISION,

    CONSTRAINT "InfoFinance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishList" (
    "id" TEXT NOT NULL,
    "wish" TEXT,
    "idUser" TEXT,
    "year" INTEGER,
    "price" DOUBLE PRECISION,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "dailyNeeds" DOUBLE PRECISION NOT NULL,
    "dept" DOUBLE PRECISION,
    "saving" DOUBLE PRECISION,
    "donation" DOUBLE PRECISION,
    "wishBudget" DOUBLE PRECISION,
    "isHealth" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InfoFinance_idUsers_key" ON "InfoFinance"("idUsers");

-- CreateIndex
CREATE UNIQUE INDEX "WishList_idUser_key" ON "WishList"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Calculation_idUser_key" ON "Calculation"("idUser");

-- AddForeignKey
ALTER TABLE "InfoFinance" ADD CONSTRAINT "InfoFinance_idUsers_fkey" FOREIGN KEY ("idUsers") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
