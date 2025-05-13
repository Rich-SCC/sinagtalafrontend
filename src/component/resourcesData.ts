export type Resource = {
    id: number;
    title: string;
    description: string;
    type: "articles" | "exercises" | "videos" | "books";
    imageUrl: string;
    link: string;
    tags: string[];
    isFeatured?: boolean;
  };
  
  export const resourcesData: Resource[] = [
    {
        id: 1,
        title: "Mental Health Awareness in the Philippines",
        description: "A comprehensive overview of mental health challenges and initiatives in the Philippines.",
        type: "articles",
        imageUrl: "https://www.silakbo.ph/wp-content/uploads/2017/08/mhresources-e1652592325681-768x637.png",
        link: "https://www.silakbo.ph/help/",
        tags: ["mental health", "Philippines", "awareness"],
        isFeatured: true
    },
    {
        id: 2,
        title: "3-Minute Mindful Breathing (Filipino)",
        description: "A guided breathing exercise in Filipino to help reduce stress and anxiety.",
        type: "exercises",
        imageUrl: "https://i.ytimg.com/vi/ExEXOfe81Nc/maxresdefault.jpg",
        link: "https://www.youtube.com/watch?v=ExEXOfe81Nc",
        tags: ["breathing", "stress relief", "Filipino"]
    },
    {
        id: 3,
        title: "Understanding Depression and Anxiety",
        description: "An informative article discussing the prevalence and impact of depression and anxiety in the Philippines.",
        type: "articles",
        imageUrl: "https://media.philstar.com/photos/2023/05/09/mental_2023-05-09_22-37-54.jpg",
        link: "https://www.philstar.com/lifestyle/health-and-family/2024/01/12/2308964/silent-epidemic-emerging-rising-mental-health-concern",
        tags: ["depression", "anxiety", "Philippines"]
    },
    {
        id: 4,
        title: "Breaking the Silence: The Philippines' Mental Health Battle",
        description: "A documentary exploring the mental health crisis in the Philippines and efforts to address it.",
        type: "videos",
        imageUrl: "https://i.ytimg.com/vi/5lkAB0pTBo0/maxresdefault.jpg",
        link: "https://www.youtube.com/watch?v=5lkAB0pTBo0",
        tags: ["mental health", "documentary", "Philippines"]
    },
    {
        id: 5,
        title: "Feeling Good: The New Mood Therapy",
        description: "A self-help book offering cognitive-behavioral techniques to overcome depression.",
        type: "books",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81Tz5zKxwEL.jpg",
        link: "https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336",
        tags: ["CBT", "self-help", "depression"]
    },
    {
        id: 6,
        title: "Mental Health and Wellbeing Books in the Philippines",
        description: "A collection of self-help and cognitive health books available in the Philippines.",
        type: "books",
        imageUrl: "https://gregory.ph/cdn/shop/collections/Mental_Health_and_Wellbeing_Collection_1200x.jpg",
        link: "https://gregory.ph/collections/mental-health-and-wellbeing",
        tags: ["books", "wellbeing", "Philippines"]
    },
    {
        id: 7,
        title: "Advancing Mental Health by Helping Filipino Youth",
        description: "An initiative focusing on promoting mental health awareness among Filipino youth.",
        type: "videos",
        imageUrl: "https://i.ytimg.com/vi/gJZQxgjFlY8/maxresdefault.jpg",
        link: "https://www.youtube.com/watch?v=gJZQxgjFlY8",
        tags: ["youth", "mental health", "Philippines"]
    },
    {
        id: 8,
        title: "Depression and Other Mental Health Issues: The Filipino American Experience",
        description: "A study on the psychological, social, and cultural influences affecting the mental health of Filipino Americans.",
        type: "books",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41N1p1k9kLL._SX331_BO1,204,203,200_.jpg",
        link: "https://www.amazon.com/Depression-Other-Mental-Health-Issues/dp/0787900419",
        tags: ["Filipino American", "depression", "mental health"]
    },
    {
        id: 9,
        title: "Cognitive Distortions and How to Challenge Them",
        description: "An article explaining common thought patterns that contribute to anxiety and depression.",
        type: "articles",
        imageUrl: "https://psychcentral.com/wp-content/uploads/2021/01/Cognitive-Distortions-732x549-thumbnail.jpg",
        link: "https://psychcentral.com/lib/cognitive-distortions-negative-thinking",
        tags: ["CBT", "thoughts", "depression", "anxiety"]
    },
    {
        id: 10,
        title: "Journaling Prompts for Self-Discovery",
        description: "A list of thought-provoking journaling prompts to help explore thoughts and emotions.",
        type: "exercises",
        imageUrl: "https://psychcentral.com/wp-content/uploads/2021/01/Journaling-Prompts-732x549-thumbnail.jpg",
        link: "https://psychcentral.com/blog/30-journaling-prompts-for-self-reflection-and-self-discovery",
        tags: ["journaling", "self-discovery", "reflection"]
    },
    {
        id: 11,
        title: "How to Support Someone with Mental Health Issues",
        description: "Practical advice for supporting friends or family members experiencing mental health challenges.",
        type: "articles",
        imageUrl: "https://www.mind.org.uk/media-a/2942/supporting-someone.jpg",
        link: "https://www.mind.org.uk/information-support/helping-someone-else/",
        tags: ["support", "helping others", "relationships"]
    },
    {
        id: 12,
        title: "Mental Health Services in the Philippines",
        description: "An overview of the current state of mental health services in the Philippines.",
        type: "articles",
        imageUrl: "https://www.ncbi.nlm.nih.gov/corehtml/pmc/pmcgifs/PMC6646843/PMC6646843-fig-0001.jpg",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6646843/",
        tags: ["mental health", "services", "Philippines"]
    },
    {
        id: 13,
        title: "Unlocking Resilience: Filipino American History and Mental Health",
        description: "An article discussing the links between cultural identity and mental well-being among Filipino Americans.",
        type: "articles",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/5f3e4b7c3b2b6e7e1c3e4b7c/1600000000000-ABCDE/filipino-american-history.jpg",
        link: "https://www.exploringtherapy.com/therapy-blog/unlocking-resilience-filipino-american-history-and-mental-health",
        tags: ["Filipino American", "resilience", "mental health"]
    },
    {
        id: 14,
        title: "Mental Health in the Philippines",
        description: "A Wikipedia article providing an overview of mental health issues and initiatives in the Philippines.",
        type: "articles",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Philippines_location_map.svg/800px-Philippines_location_map.svg.png",
        link: "https://en.wikipedia.org/wiki/Mental_health_in_the_Philippines",
        tags: ["mental health", "Philippines", "overview"]
    },
    {
        id: 15,
        title: "Filipino Children's Books on Mental Health",
        description: "A list of children's books in Filipino that address mental health topics.",
        type: "books",
        imageUrl: "https://lovealibrarian.blogspot.com/2023/02/filipino-childrens-books-on-mental.html",
        link: "https://lovealibrarian.blogspot.com/2023/02/filipino-childrens-books-on-mental.html",
        tags: ["children", "books", "mental health"]
    },
    {
        id: 16,
        title: "A Moment for Myself: Mental Health Self-Care Booklet",
        description: "A free booklet designed for Filipino teens to teach mental health self-care in the post-pandemic era.",
        type: "books",
        imageUrl: "https://in-touch.org/wp-content/uploads/2023/01/A-Moment-For-Myself-Booklet-Cover.jpg",
        link: "https://tinyurl.com/MHBookletEng",
        tags: ["self-care", "teens", "Philippines"],
        isFeatured: true
    },
    {
        id: 17,
        title: "Mental Health Awareness in the Philippines",
        description: "An article discussing the state of mental health awareness and services in the Philippines.",
        type: "articles",
        imageUrl: "https://www.philstar.com/files/images/2024/01/12/mental-health.jpg",
        link: "https://www.philstar.com/lifestyle/health-and-family/2024/01/12/2308964/silent-epidemic-emerging-rising-mental-health-concern",
        tags: ["mental health", "Philippines", "awareness"]
    },
    {
        id: 18,
        title: "Spirituality in Philippine Mental Health Research and Practice",
        description: "A public forum discussing the role of spirituality in mental health research and practice in the Philippines.",
        type: "videos",
        imageUrl: "https://www.dost.gov.ph/images/2021/Spirituality_in_Philippine_Mental_Health.jpg",
        link: "https://www.facebook.com/dostpchrd/videos/spirituality-in-philippine-mental-health-research-and-practice/3536714819886679/",
        tags: ["spirituality", "mental health", "Philippines"]
    },
    {
        id: 19,
        title: "Transforming Lives: Mental Health Care of the Community",
        description: "A book focusing on mental health programs in disaster-stricken communities in the Philippines.",
        type: "books",
        imageUrl: "https://www.upm.edu.ph/sites/default/files/Transforming_Lives_Book_Cover.jpg",
        link: "https://www.upm.edu.ph/cpt_news/revised-book-on-mental-health-programs-in-disaster-stricken-communities-launched/",
        tags: ["community", "mental health", "Philippines"]
    },
    {
        id: 20,
        title: "Mental Health Philippines Podcast",
        description: "A podcast series addressing various mental health topics relevant to Filipinos.",
        type: "videos",
        imageUrl: "https://i.scdn.co/image/ab6765630000ba8a5f9f6e8b9f7a9a9f5f9f6e8b",
        link: "https://open.spotify.com/show/6WCz7s2Rb0eQyVfXEtBLaW",
        tags: ["podcast", "mental health", "Philippines"]
    },
    {
        id: 21,
        title: "Right to Mental Health Handy Resource Book",
        description: "A resource book by the Commission on Human Rights of the Philippines focusing on mental health rights.",
        type: "articles",
        imageUrl: "https://chr.gov.ph/wp-content/uploads/2023/08/Right-to-Mental-Health-Handy-Resource-Book-Cover.jpg",
        link: "https://chr2bucket.storage.googleapis.com/wp-content/uploads/2023/08/08145425/Handy-Resource-Book-PDF-Downloadable.pdf",
        tags: ["mental health", "rights", "Philippines"]
    },
    {
        id: 22,
        title: "Navigating the Philippine Mental Health System for the Nation's Youth",
        description: "An article discussing the challenges and opportunities in the Philippine mental health system for youth.",
        type: "articles",
        imageUrl: "https://www.cambridge.org/core/journals/bjpsych-international/article/navigating-the-philippine-mental-health-system-for-the-nations-youth-challenges-and-opportunities/7A53913BC7E4559F87BC1F2D3740BAB6",
        link: "https://www.cambridge.org/core/journals/bjpsych-international/article/navigating-the-philippine-mental-health-system-for-the-nations-youth-challenges-and-opportunities/7A53913BC7E4559F87BC1F2D3740BAB6",
        tags: ["youth", "mental health", "Philippines"]
    },
    {
        id: 23,
        title: "Filipino Help-Seeking for Mental Health Problems",
        description: "A systematic review on behavioral and attitudinal patterns in Filipino formal help-seeking.",
        type: "articles",
        imageUrl: "https://pmc.ncbi.nlm.nih.gov/corehtml/pmc/pmcgifs/PMC7578164/PMC7578164-fig-0001.jpg",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7578164/",
        tags: ["help-seeking", "mental health", "Philippines"]
    },
    {
        id: 24,
        title: "Preventing Filipino Mental Health Disparities",
        description: "Perspectives from adolescents, caregivers, providers, and advocates on mental health prevention.",
        type: "articles",
        imageUrl: "https://pmc.ncbi.nlm.nih.gov/corehtml/pmc/pmcgifs/PMC4319658/PMC4319658-fig-0001.jpg",
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4319658/",
        tags: ["prevention", "mental health", "Philippines"]
    },
    {
        id: 25,
        title: "Mental Health Equity of Filipino Communities in COVID-19",
        description: "A framework for practice and advocacy to support Filipino communities during the pandemic.",
        type: "articles",
        imageUrl: "https://tpcjournal.nbcc.org/wp-content/uploads/2021/03/Mental-Health-Equity-of-Filipino-Communities-in-COVID-19.jpg",
        link: "https://tpcjournal.nbcc.org/mental-health-equity-of-filipino-communities-in-covid-19-a-framework-for-practice-and-advocacy/",
        tags: ["COVID-19", "mental health", "Philippines"]
    }
  ];
  