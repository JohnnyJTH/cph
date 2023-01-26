import { addDays, format, subDays } from "date-fns";
import type { Departure } from "./interfaces";

export async function getDepartures(userQuery?: string): Promise<Departure[]> {
    const fromDate = format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const toDate = format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    const response = await fetch(`https://www.cph.dk/api/FlightInformation/GetFlightInfoTable?direction=D&userQuery=${userQuery ? userQuery : "*:*"}&startDateTime=${fromDate}&endDateTime=${toDate}&language=en`);
    const data = await response.json();

    // map the data to our Departure interface
    return data as Departure[];
}