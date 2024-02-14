import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, User } from "../../utils/types";
import { _db } from "../../utils/_db";
import { Token } from "../../utils/token";

export const calculationFn = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Find User
    const { userId } = req.decodeToken as { userId: string };
    const user = await _db.users.findUnique({
      where: {
        id: userId,
      },
    });

    // Define input from FE
    const { salary, loan, interest, interestType, paidOff, savingMoney, travelling, wishlist, wishlistTarget, wishlistBudget } = req.body;

    let dailyNeeds: number;
    let loanDB: number;
    let savings: number;
    let donation: number;
    let wishlistCost: number;

    let resultBudgetWishlist: number;

    // Result
    let resultLoan: number;
    let isHealth: boolean;

    // Loan Calculation
    if (loan != null && paidOff != null) {
      if (travelling === true) {
        if (wishlist != null) {
          dailyNeeds = (salary * 33) / 100;
          loanDB = (salary * 30) / 100;
          savings = (salary * 27) / 100;
          donation = (salary * 10) / 100;
        }
        dailyNeeds = (salary * 35) / 100;
        loanDB = (salary * 30) / 100;
        savings = (salary * 25) / 100;
        donation = (salary * 10) / 100;
      } else {
        if (wishlist != null) {
          dailyNeeds = (salary * 38) / 100;
          loanDB = (salary * 30) / 100;
          savings = (salary * 22) / 100;
          donation = (salary * 10) / 100;
        }
        dailyNeeds = (salary * 40) / 100;
        loanDB = (salary * 30) / 100;
        savings = (salary * 20) / 100;
        donation = (salary * 10) / 100;
      }
      if (interest == null) {
        // Math For loan
        const loanMath = loan / paidOff;
        resultLoan = loanMath;
      } else if (paidOff < 12 && interest != null) {
        const interestLoan = (loan * interest) / 100;
        let loanPerMonth = loan / paidOff;
        const result = interestLoan + loanPerMonth;
        resultLoan = result;
      } else if (paidOff >= 12 && interest != null && interestType == "month") {
        const interestLoan = (loan * interest) / 100;
        let loanPerMonth = loan / paidOff;
        const result = interestLoan + loanPerMonth;
        resultLoan = result;
      } else if (paidOff >= 12 && interest != null && interestType == "year") {
        const interestLoanPerYear = (loan * interest) / 100;
        const paidInterestPerMonth = interestLoanPerYear / paidOff;
        const paidLoan = loan / paidOff;
        const resultFinal = paidInterestPerMonth + paidLoan;
        resultLoan = resultFinal;
      }
      const resultLoanFnl = resultLoan * paidOff;
      let sisa = Math.ceil(loanDB % resultLoanFnl);

      if (sisa != 0) {
        savings = savings + sisa;
      }
    } else {
      if (travelling === true) {
        if (wishlist !== null) {
          dailyNeeds = (salary * 40) / 100;
          savings = (salary * 50) / 100;
          donation = (salary * 10) / 100;
        } else {
          dailyNeeds = (salary * 45) / 100;
          savings = (salary * 45) / 100;
          donation = (salary * 10) / 100;
        }
      } else {
        if (wishlist != null) {
          dailyNeeds = (salary * 43) / 100;
          savings = (salary * 47) / 100;
          donation = (salary * 10) / 100;
        }
        dailyNeeds = (salary * 50) / 100;
        savings = (salary * 40) / 100;
        donation = (salary * 10) / 100;
      }
    }

    // Save Input for Info Finance in DB
    const saveInfoFinance = await _db.infoFinance.create({
      data: {
        idUsers: user.id,
        salary: salary,
        loan: loan,
        interest: interest,
        interestType: interestType,
        paidOff: paidOff,
        savingMoney: savingMoney,
      },
    });

    // Save Input for Calculation in DB
    const saveCalculation = await _db.calculation.create({
      data: {
        idUser: user.id,
        dailyNeeds: dailyNeeds,
        dept: resultLoan,
        saving: savings,
        donation: donation,
      },
    });

    return res.status(201).json({
      message: "Berhasil Kalkulasi",
      data: {
        infoFinance: saveInfoFinance,
        calculation: saveCalculation,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCalculationFn = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { userId } = req.decodeToken as { userId: string };
    const calculation = await _db.calculation.findFirst({
      where: {
        idUser: userId,
      },
      select:{
        idUser: true,
        dailyNeeds: true
      }
    });
    console.log(calculation);
    return res.status(200).json({
      data: calculation,
    });
  } catch (error) {
    next(error);
  }
};
