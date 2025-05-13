export interface Hotline {
  id: number;
  organization: string;
  description: string;
  phone_number: string;
  website?: string;
  operating_hours?: string;
}

export const hotlineData: Hotline[] = [
  {
    id: 1,
    organization: "National Center for Mental Health Crisis Hotline",
    description: "Provides 24/7 crisis intervention and psychological support.",
    phone_number: "1553 / (02) 7989-8727 / 0917-899-8727 / 0966-351-4518 / 0908-639-2672",
    operating_hours: "24/7"
  },
  {
    id: 2,
    organization: "Hopeline Philippines",
    description: "A 24/7 suicide prevention and crisis support helpline.",
    phone_number: "(02) 8804-4673 / 0917-558-4673 / 0918-873-4673",
    operating_hours: "24/7"
  },
  {
    id: 3,
    organization: "In Touch Community Services",
    description: "Offers 24/7 free and anonymous crisis line support.",
    phone_number: "(02) 8893-7603 / 0917-800-1123 / 0922-893-8944",
    website: "https://www.in-touch.org",
    operating_hours: "24/7"
  },
  {
    id: 4,
    organization: "Philippine Mental Health Association (PMHA)",
    description: "Provides mental health services through multimedia platforms and volunteers.",
    phone_number: "(02) 8921-4958 / (02) 8921-4959 / 0917-565-2036",
    website: "https://www.facebook.com/PMHAofficial",
    operating_hours: "Monday to Friday, 7am–4pm; Chat support: Monday to Saturday, 8am–5pm"
  },
  {
    id: 5,
    organization: "Manila Lifeline Centre (MLC)",
    description: "Offers 24/7 emotional support and crisis intervention.",
    phone_number: "(02) 896-9191 / 0917-854-9191",
    operating_hours: "24/7"
  },
  {
    id: 6,
    organization: "Dial-A-Friend",
    description: "Provides emotional support and counseling services.",
    phone_number: "(02) 8525-1743 / (02) 8525-1881",
    operating_hours: "Monday to Friday, 9am–5pm"
  },
  {
    id: 7,
    organization: "Tawag Paglaum – Centro Bisaya",
    description: "24/7 suicide, depression, and emotional crisis intervention hotline.",
    phone_number: "0939-937-5433 / 0939-936-5433 / 0927-654-1629",
    operating_hours: "24/7"
  },
  {
    id: 8,
    organization: "Living Free Foundation",
    description: "Offers free psychological services and online psychosocial support.",
    phone_number: "0917-322-7807",
    website: "http://livingfreefoundationph.com/",
    operating_hours: "Monday to Friday, 9am–5pm"
  },
  {
    id: 9,
    organization: "Lunas Collective",
    description: "Provides a safe and comfortable online space on issues related to gender-based violence and reproductive health.",
    phone_number: "Available via Facebook Messenger",
    website: "https://www.facebook.com/LunasCollective",
    operating_hours: "Monday to Saturday, 8am–5pm"
  },
  {
    id: 10,
    organization: "MindNation",
    description: "Offers online psychologist consultations and mental health support.",
    phone_number: "Available via Facebook Messenger",
    website: "https://www.facebook.com/mindnation/",
    operating_hours: "Monday to Friday, 9am–6pm"
  }
];
