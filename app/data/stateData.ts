export interface Impact {
  schools: number;
  students: number;
  ngos: number;
  projects: number;
}

export const stateImpactData: Record<string, Impact> = {
  "Telangana":         { schools: 48, students: 12400, ngos: 18, projects: 34 },
  "Andhra Pradesh":    { schools: 42, students: 10800, ngos: 15, projects: 28 },
  "Karnataka":         { schools: 36, students: 9200,  ngos: 14, projects: 24 },
  "Tamil Nadu":        { schools: 31, students: 8100,  ngos: 12, projects: 20 },
  "Maharashtra":       { schools: 29, students: 7600,  ngos: 11, projects: 18 },
  "Delhi":             { schools: 25, students: 6800,  ngos: 10, projects: 16 },
  "Uttar Pradesh":     { schools: 22, students: 5900,  ngos: 9,  projects: 14 },
  "Gujarat":           { schools: 18, students: 4700,  ngos: 7,  projects: 12 },
  "Rajasthan":         { schools: 15, students: 3900,  ngos: 6,  projects: 10 },
  "West Bengal":       { schools: 14, students: 3600,  ngos: 6,  projects: 9  },
  "Madhya Pradesh":    { schools: 12, students: 3100,  ngos: 5,  projects: 8  },
  "Kerala":            { schools: 11, students: 2900,  ngos: 5,  projects: 7  },
  "Bihar":             { schools: 10, students: 2600,  ngos: 4,  projects: 6  },
  "Odisha":            { schools: 9,  students: 2300,  ngos: 4,  projects: 6  },
  "Punjab":            { schools: 8,  students: 2100,  ngos: 3,  projects: 5  },
  "Haryana":           { schools: 8,  students: 2000,  ngos: 3,  projects: 5  },
  "Jharkhand":         { schools: 7,  students: 1800,  ngos: 3,  projects: 4  },
  "Chhattisgarh":      { schools: 6,  students: 1600,  ngos: 2,  projects: 4  },
  "Assam":             { schools: 6,  students: 1500,  ngos: 2,  projects: 3  },
  "Himachal Pradesh":  { schools: 5,  students: 1200,  ngos: 2,  projects: 3  },
  "Uttarakhand":       { schools: 5,  students: 1100,  ngos: 2,  projects: 3  },
  "Goa":               { schools: 4,  students: 900,   ngos: 2,  projects: 2  },
  "Jammu & Kashmir":   { schools: 4,  students: 900,   ngos: 1,  projects: 2  },
  "Tripura":           { schools: 3,  students: 700,   ngos: 1,  projects: 2  },
  "Meghalaya":         { schools: 3,  students: 650,   ngos: 1,  projects: 2  },
  "Manipur":           { schools: 2,  students: 500,   ngos: 1,  projects: 1  },
  "Nagaland":          { schools: 2,  students: 450,   ngos: 1,  projects: 1  },
  "Arunachal Pradesh": { schools: 2,  students: 400,   ngos: 1,  projects: 1  },
  "Mizoram":           { schools: 2,  students: 380,   ngos: 1,  projects: 1  },
  "Sikkim":            { schools: 1,  students: 250,   ngos: 1,  projects: 1  },
};
