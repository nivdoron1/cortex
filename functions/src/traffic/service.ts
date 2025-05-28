import {FirestoreService} from "../services/firebaseService";
import {TrafficEntry} from "./types";

export const trafficService = FirestoreService<TrafficEntry>("trafficStats");
