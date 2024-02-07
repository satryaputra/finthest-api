import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, User } from "../../utils/types";

export const calculationFn = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // const { userId } = req.decodeToken as { userId: string };

    const { salary, loan, interest, interestType, paidOff, savings, travelling, wishlist, wishlistTarget, wishlistBudget } = req.body;

    // Rumus 40-30-20-10
    let dailyNeeds: Number;
    let loanDB: number;
    let savingMoney: number;
    let donation: number;
    let resultLoan: number;
    let resultBudgetWishlist: number;
    // Loan Calculation
    if (loan && paidOff != null) {
      dailyNeeds = (salary * 40) / 100;
      loanDB = (salary * 30) / 100;
      savingMoney = (salary * 20) / 100;
      donation = (salary * 10) / 100;

      if (interest == null) {
        // Math For loan
        const loanMath = loan / paidOff;
        console.log("no interest " + loanMath);
        resultLoan = loanMath;
      } else if (paidOff < 12 && interest != null) {
        const interestLoan = (loan * interest) / 100;
        console.log("bawah 12" + interestLoan);
        let loanPerMonth = loan / paidOff;
        console.log("bawah 12 " + loanPerMonth);
        const result = interestLoan + loanPerMonth;
        resultLoan = result;
      } else if (paidOff >= 12 && interest != null && interestType == "month") {
        const interestLoan = (loan * interest) / 100;
        console.log("atas 12 month " + interestLoan);
        let loanPerMonth = loan / paidOff;
        console.log("atas 12 month " + loanPerMonth);
        const result = interestLoan + loanPerMonth;
        resultLoan = result;
      } else if (paidOff >= 12 && interest != null && interestType == "year") {
        const interestLoanPerYear = (loan * interest) / 100;
        console.log("atas 12 year " + interestLoanPerYear);
        const paidInterestPerMonth = interestLoanPerYear / paidOff;
        console.log("atas 12 year " + paidInterestPerMonth);
        const paidLoan = loan / paidOff;
        console.log("atas 12 year " + paidLoan);
        const resultFinal = paidInterestPerMonth + paidLoan;
        resultLoan = resultFinal;
      }
      const resultLoanFnl = resultLoan * paidOff;
      let sisa = loanDB % resultLoanFnl;
      if (sisa != 0) {
        savingMoney = savingMoney + sisa;
      }
    } else {
      console.log("nooo");
      // Rumus 40-50-10 (No Loan)
      dailyNeeds = (salary * 40) / 100;
      savingMoney = (salary * 50) / 100;
      donation = (salary * 10) / 100;
    }

    // Wishlist Calculation
    if (wishlist != null && wishlistBudget != null && wishlistTarget != null) {
    }

    return res.status(201).json({
      message: "Berhasil Kalkulasi",
      data: {
        dailyNeeds: dailyNeeds,
        donation: donation,
        loan: resultLoan,
      },
    });
  } catch (error) {
    next(error);
  }
};
