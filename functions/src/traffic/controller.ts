import {Request, Response} from "express";
import {trafficService} from "./service";
import {buildTrafficFilters} from "./utils";
import {GenericFilter, PaginationOptions} from "../types";

export const getTraffic = async (req: Request, res: Response) => {
  try {
    const parsedFilters = req.query.filters ?
      JSON.parse(req.query.filters as string) :
      {};

    const filters: GenericFilter[] = buildTrafficFilters(parsedFilters);
    const data = await trafficService.getAll({
      page: Number(req.query.page) ?? 1,
      limit: Number(req.query.limit) || 5,
      orderBy: req.query.sortKey as string || "date",
      direction: req.query.sortDirection as FirebaseFirestore.OrderByDirection || "asc",
      filters,
    }as PaginationOptions);
    res.json(data);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const createTraffic = async (req: Request, res: Response) => {
  try {
    const entry = await trafficService.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const bulkCreateTraffic = async (req: Request, res: Response) => {
  try {
    const entries = await trafficService.bulkCreate(req.body);
    res.status(201).json(entries);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const updateTraffic = async (req: Request, res: Response) => {
  try {
    const entry = await trafficService.update(req.params.id, req.body);
    res.json(entry);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const deleteTraffic = async (req: Request, res: Response) => {
  try {
    await trafficService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};

export const getOneTraffic = async (req: Request, res: Response) => {
  try {
    const entry = await trafficService.getOne(req.params.id);
    res.json(entry);
  } catch (err) {
    res.status(404).json({error: (err as Error).message});
  }
};


export const bulkUpdateTraffic = async (req: Request, res: Response) => {
  try {
    const updated = await trafficService.bulkUpdate(req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({error: (err as Error).message});
  }
};
