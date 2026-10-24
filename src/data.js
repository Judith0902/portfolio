export const profile = {
    name: "Judith D. Arellano",
    title: "4th Year Computer Engineering Student",
    badge: "Computer Engineering · Class of 2027",
    tagline:
        "I’m a fourth-year Computer Engineering student interested in embedded systems, IoT, hardware design, and practical technology that solves real-world problems.",
    about:
        "I am a dedicated fourth-year Computer Engineering student with an interest in embedded systems, programming, hardware design, and web-based tools. Through academic projects and technical learning, I continue to develop my analytical, teamwork, and problem-solving skills. I also hold an SO1 certificate and aim to keep growing as an engineer while contributing to meaningful and innovative projects.",
    location: "Cagayan, Philippines",
    // Tip: before you deploy, move the picture into the public/ folder,
    // rename it to profile.jpg, and change this to "/profile.jpg".
    photo: "/src/images/profile.jpg.jpg",
    links: [
        {
            label: "Email",
            value: "judithdarellano@gmail.com",
            url: "mailto:judithdarellano@gmail.com",
        },
        {
            label: "LinkedIn",
            value: "linkedin.com/in/judith-arellano-7723b9426",
            url: "https://www.linkedin.com/in/judith-arellano-7723b9426/",
        },
        {
            label: "GitHub",
            value: "github.com/Judith0902",
            url: "https://github.com/Judith0902",
        },
    ],
};

export const education = [
    {
        degree: "Bachelor of Science in Computer Engineering",
        school: "Cagayan State University – Carig Campus",
        place: "Tuguegarao City, Cagayan, Philippines",
        year: 4,
        totalYears: 4,
        note: "Expected graduation: 2027",
    },
];

export const skills = [
    {
        group: "Software & Tools",
        items: [
            { name: "Microsoft Excel" },
            { name: "Microsoft Access" },
            { name: "Canva" },
            { name: "Arduino IDE" },
        ],
    },
    {
        group: "Programming",
        items: [
            { name: "Python (basics)" },
            { name: "C++ (academic basics)" },
        ],
    },
    {
        group: "Hardware & Embedded Systems",
        items: [
            { name: "Arduino" },
            { name: "Basic microcontroller programming" },
            { name: "Circuit design" },
        ],
    },
];

export const projects = [
    {
        title: "Agoscoop – Solar-Powered Automated River Trash Collection Bin",
        desc:
            "Prototype for automated floating waste collection. Integrates ultrasonic, water-level, and float-switch sensors with Arduino, relay-controlled automation, and GSM notifications, powered by solar energy for sustainable operation.",
        tech: ["Arduino", "C++", "GSM", "Sensors", "Relay", "Solar"],
        stats: [
            { value: 3, label: "Sensor types" },
            { value: 1, label: "GSM alert system" },
        ],
        url: "",
    },
    {
        title: "Computer Engineering Alumni Job Portal",
        desc:
            "Team project: a web-based platform connecting university alumni with local job opportunities. Applied database design principles and the software development lifecycle (SDLC).",
        tech: ["Web", "Database", "SDLC"],
        stats: [],
        url: "",
    },
    {
        title: "Strengthening Enabling Factors in Rural Healthcare: A Framework for Operational Sustainability and Logistical Continuity",
        desc:
            "A survey-based research study examining the enabling factors that support operational sustainability and logistical continuity in rural healthcare facilities, focusing on resource availability, healthcare accessibility, supply management, and service delivery.",
        tech: ["Survey Research", "Questionnaire", "Descriptive Statistics", "Data Analysis"],
        stats: [
            { label: "Research Method", value: "Survey" },
            { label: "Data Collection", value: "Questionnaire" },
            { label: "Research Design", value: "Descriptive" },
            { label: "Study Focus", value: "Rural Healthcare" },
        ],
        url: "",
    },
];

// Certificates page (text only). "file" is optional: use it for a PDF link,
// for example file: "/certs/so1.pdf" (put the PDF in public/certs/).
export const certifications = [
    {
        title: "Civil Service Professional Examination – Passer",
        issuer: "Civil Service Commission",
        date: "",
        file: "",
    },
    {
        title: "SO1 Certificate",
        issuer: "Department of Labor and Employment (DOLE)",
        date: "",
        file: "",
    },
];

// Conference certificates shown on the Seminars page.
// Put each picture in public/seminars/ and write its path in "image".
// Each seminar below points to its certificate with cert: 0, 1 or 2.
// (The year of the two December certificates is taken from the conference
// name, "2025 International Conference". Change it if it is different.)
export const seminarCertificates = [
    {
        title: "International Conference: Envision, Construct, Empower",
        place: "Cagayan State University – Carig Campus · Zoom",
        date: "May 8, 2026",
        image: "/seminars/seminar-cert-1.jpg",
    },
    {
        title: "Frontiers of Computer Engineering: 2025 International Conference on New and Emerging Technologies",
        place: "Cagayan State University – Carig Campus · Zoom",
        date: "Dec 13, 2025",
        image: "/seminars/seminar-cert-3.jpg",
    },
    {
        title: "Frontiers of Computer Engineering: 2025 International Conference on New and Emerging Technologies",
        place: "Cagayan State University – Carig Campus · Zoom",
        date: "Dec 12, 2025",
        image: "/seminars/seminar-cert-2.jpg",
    },
];

export const seminars = [
    {
        title: "Lab to Market: AI-Based Field Robotics",
        tag: "AI & Robotics",
        cert: 0,
    },
    {
        title:
            "Reinforcement Learning-Augmented Broker Selection for Decentralized Swarm SLAM",
        tag: "AI & Robotics",
        cert: 0,
    },
    {
        title:
            "Modular Battery Swapping Architectures: Performance Benchmarking for Scalable Energy Systems",
        tag: "Energy Systems",
        cert: 0,
    },
    {
        title: "Project Management in Engineering",
        tag: "Engineering Practice",
        cert: 1,
    },
    {
        title:
            "From Reactive to Proactive: How AI is Redefining the Cybersecurity Paradigm",
        tag: "Cybersecurity",
        cert: 1,
    },
    {
        title:
            "Smart Imaging Systems: Integrating AI and Computer Engineering in Biomedical Applications",
        tag: "AI & Biomedical",
        cert: 1,
    },
    {
        title:
            "Research Article Publication in Scopus- and Clarivate-Indexed Journals Using Emerging AI Tools",
        tag: "Research",
        cert: 2,
    },
    {
        title:
            "Enterprise Cybersecurity Resilience: Harnessing Segmented Networks and Multi-Layered Defense",
        tag: "Cybersecurity",
        cert: 2,
    },
    {
        title: "Ransomware Resilience: Defend, Detect, Recover",
        tag: "Cybersecurity",
        cert: 2,
    },
];

export const stats = [
    {
        value: education[0].year,
        suffix: "th",
        label: "Year level",
    },
    {
        value: seminars.length,
        label: "Seminars listed",
    },
    {
        value: projects.length,
        label: "Academic projects",
    },
    {
        value: certifications.length,
        label: "Certificates",
    },
];