export interface EventItem {
  id: string;
  title: string;
  category: string;
  fullDate: string;
  day: string;
  month: string;
  year: string;
  location: string;
}

export const EVENTS: EventItem[] = [
  { id: "e1", title: "SDG School Drive – Hyderabad", category: "School Drives", fullDate: "2025-08-10", day: "10", month: "Aug", year: "2025", location: "Hyderabad" },
  { id: "e2", title: "Climate Action Workshop", category: "Workshops", fullDate: "2025-09-05", day: "5", month: "Sep", year: "2025", location: "Bangalore" },
  { id: "e3", title: "CSR Leadership Meet", category: "CSR Meets", fullDate: "2025-09-20", day: "20", month: "Sep", year: "2025", location: "Mumbai" },
  { id: "e4", title: "NGO Collaboration Summit", category: "NGO Collaboration", fullDate: "2025-10-12", day: "12", month: "Oct", year: "2025", location: "Delhi" },
  { id: "e5", title: "Youth SDG Challenge 2025", category: "Youth Challenges", fullDate: "2025-11-01", day: "1", month: "Nov", year: "2025", location: "Chennai" },
];
