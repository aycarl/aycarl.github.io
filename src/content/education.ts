export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  courses: string[];
}

export const education: Education[] = [
  {
    degree: "MS. Information Systems and Assurance",
    school: "The University of New Mexico",
    location: "Albuquerque, New Mexico",
    period: "Dec 2020",
    courses: ["Data Mining", "Data Analytics", "Advanced Database Management", "Linux Scripting & Automation"]
  },
  {
    degree: "BSc. Management Information Systems",
    school: "Ashesi University",
    location: "Berekuso, Eastern Region, Ghana",
    period: "June 2015",
    courses: ["Data Structures & Algorithms", "Web Development", "Software Engineering", "E-commerce"]
  }
];
