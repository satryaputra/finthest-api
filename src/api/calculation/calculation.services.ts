import type { Request, Response, NextFunction } from "express";
import { db } from "../../utils/db";
import { AuthenticatedRequest, User } from "../../utils/types";

export const calculationFn = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { idUser } = req.decodeToken as { idUser: string };
    const { salary, loan, interest, interestType, paidOff, savings, travelling, wishlist, wishlistTarget, wishlistBudget } = req.body;
    const dailyNeeds = salary / 40 / 100;
    const donation = salary / 10 / 100;

    let resultLoan: number;
    let resultBudgetWishlist: number;

    // Loan Calculation
    if (loan && interest && paidOff != null) {
      if (interest == null) {
        // Math For loan
        const loanMath = loan / paidOff;
        resultLoan = Math.ceil(salary / 30 / 100 / loanMath);
      } else if (paidOff <= 12 && interest != null) {
        const interestLoan = loan * interest;
        const loanPerMonth = loan / paidOff;
        const result = interestLoan + loanPerMonth; 
        resultLoan = Math.ceil(salary / 30 / 100 / result);
      } else if (paidOff >= 12 && interest != null && interestType == "month") {
      } else if (paidOff >= 12 && interest != null && interestType == "year") {
      }
    }
    return res.status(200).json({
      message: "Berhasil Kalkulasi",
      data:{
        dailyNeeds: dailyNeeds,
        donation: donation,
        loan: resultLoan
      }
    })
  } catch (error) {
    next(error)
  }
};
