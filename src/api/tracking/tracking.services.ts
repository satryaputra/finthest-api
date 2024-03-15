import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../utils/types";
import { _db } from "../../utils/_db";

export const addTrackingOutput = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
    const { userId } = req.decodeToken as { userId: string };
    const {outFor, price, date} = req.body;
    const user = await _db.users.findUnique({
        where: {
          id: userId,
        },
    });

    const createData = await _db.tracking.create({
        data: {
           idUser: user.id,
           outFor: outFor,
           price: price,
           date: date 
        },

        select:{
            outFor: true,
            price: true,
            date: true
        }
    });

    const dataCalculation = await _db.calculation.findFirst({
        where: {
            idUser: user.id
        },
        select: {
            dailyNeeds: true
        }
    });

    const updateDailyNeeds = await _db.calculation.update({
        data:{
            dailyNeeds: dataCalculation.dailyNeeds -= createData.price
        },
        where:{
            idUser: user.id
        },
        select:{
            dailyNeeds: true
        }
    });
    
    return res.status(201).json({
        message: `Berhasil membuat tracking pengeluaran`,
        data: createData,
        updateDataDailyNeeds: updateDailyNeeds
      });
};

export const getTrackingOutput = async(req: AuthenticatedRequest, res: Response, next: NextFunction) : Promise<Response> => {
    const { userId } = req.decodeToken as { userId: string };
    const user = await _db.users.findUnique({
        where: {
          id: userId,
        },
    });

    const data = await _db.tracking.findMany({
        where:{
            idUser: user.id
        }
    });

    return res.status(201).json({
        message: `Berhasil ambil data tracking pengeluaran ${user.name}`,
        data: data,
      });
}
