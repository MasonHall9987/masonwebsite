// Technology color definitions
const TECH_COLORS = {
  Arduino: "#00979D",
  Cplusplus: "#00599C",
  React: "#61DAFB",
  Javascript: "#F7DF1E",
  Supabase: "#3ECF8E",
  Threedotjs: "#000000",
  Internetexplorer: "#0076D6",
  Git: "#F05032",
  Vuedotjs: "#41B883",
  Python: "#3776AB",
  Docker: "#2496ED",
  Jira: "#0052CC",
  Confluence: "#172B4D",
  Agile: "#2E7D32",
  Typescript: "#3178C6",
  Nodedotjs: "#339933",
  Apple: "#000000",
  Pandas: "#150458",
  Selenium: "#43B02A",
  Beautifulsoup: "#FF4C4C",
  Openai: "#412991",
  Nextdotjs: "#000000",
  Tailwindcss: "#06B6D4",
  Cloudflare: "#F6821F",
  Vercel: "#000000",
  Firebase: "#FFCA28",
  Php: "#777BB4",
  Mysql: "#4479A1",
  Digitalocean: "#0080FF",
  Html5: "#E34F26",
  Css3: "#1572B6",
  Godot: "#478CBF",
  Trello: "#0052CC",
  GDScript: "#478CBF"
};

export const projects = [
  {
    id: 1,
    name: "Self Watering Plant Pot",
    date: "01/01/25-04/21/25",
    subtitle: "EGN 3060C - Robotics Project",
    githubUrl: "https://github.com/yourusername/plant-pot",
    description: `An innovative IoT-enabled self-watering plant pot system developed for EGN 3060C. The project features a 3D printed pot integrated with an ESP32 microcontroller for automated plant care.

Hardware Components:

• Soil moisture sensor for detecting watering needs
• Water level sensors for reservoir monitoring
• Automated water pump system
• Smart LED lighting system with dimming capabilities
• Light sensors for ambient light detection
• Water reservoir for automated refills

Software Features:

• ESP32 main loop written in C++ for sensor monitoring and control
• Custom Arduino library for simplified database management
• Real-time monitoring of soil moisture, light levels, and water levels
• Automated watering system triggered by soil moisture thresholds
• Smart lighting control based on ambient light conditions

Mobile Application:

• React Native app for remote monitoring and control
• Real-time display of all sensor data
• Manual override controls for pump and lighting
• Historical data tracking and visualization

Integration:

• Supabase database for real-time data synchronization
• Bi-directional communication between ESP32 and mobile app
• Secure API endpoints for device control
• Automated data logging and storage

The system maintains optimal growing conditions by automatically adjusting water levels and lighting based on sensor readings. Users can monitor their plant's health metrics and manually control the system through the mobile app, with all data being synchronized in real-time through Supabase.`,
    image: "/images/icon-plant-pot.png",
    video: "/videos/project-demo.mp4",
    technologies: [
      { name: "Arduino/ESP32", iconName: "Arduino", color: TECH_COLORS.Arduino },
      { name: "C++", iconName: "Cplusplus", color: TECH_COLORS.Cplusplus },
      { name: "React Native", iconName: "React", color: TECH_COLORS.React },
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "Supabase", iconName: "Supabase", color: TECH_COLORS.Supabase },
      { name: "3D Printing", iconName: "Threedotjs", color: TECH_COLORS.Threedotjs },
      { name: "IoT", iconName: "Internetexplorer", color: TECH_COLORS.Internetexplorer },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 2,
    name: "Futurex",
    date: "05/21/24-08/05/24",
    subtitle: "Full Stack Software Engineer Intern",
    githubUrl: "https://github.com/yourusername/futurex",
    description: `Led a three-person intern team in refactoring the LCD display interface for Hardware Security Modules (HSM) at Futurex. The project involved comprehensive system redesign and integration across firmware, API, and web interfaces.

Project Overview:

• Engineered and presented a proposal for a modernized HSM display interface
• Implemented a complete stack-based menu system replacing legacy code
• Developed features for remote HSM management and monitoring
• Created and maintained comprehensive documentation
• Participated in agile development with weekly scrums

Key Features:

• Category-based menu interface for quick HSM stats access
• Real-time monitoring of transaction rates
• Real-time monitoring of CPU temperatures
• Real-time monitoring of IP addresses
• Real-time monitoring of system status
• LCD screen flashing for device location
• IP address masking functionality
• Custom bitmap logo display

Firmware Development:
• C/C++ for HSM firmware
• Stack-based screen management system
• Shared memory implementation
• Unit testing framework

Web Development:
• Vue.js frontend
• Python backend
• Docker containerization
• API integration with existing systems

Development Tools:
• Git/GitLab for version control
• Jira for project management
• Confluence for documentation
• Docker for local testing environment

The project successfully modernized the HSM interface, improving usability and adding new features while maintaining compatibility with existing systems. The implementation was completed within the internship timeframe and met all company standards.`,
    image: "/images/icon-futurex.png",
    video: "/videos/futurex-demo.mp4",
    technologies: [
      { name: "C++", iconName: "Cplusplus", color: TECH_COLORS.Cplusplus },
      { name: "Vue.js", iconName: "Vuedotjs", color: TECH_COLORS.Vuedotjs },
      { name: "Python", iconName: "Python", color: TECH_COLORS.Python },
      { name: "Docker", iconName: "Docker", color: TECH_COLORS.Docker },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git },
      { name: "Jira", iconName: "Jira", color: TECH_COLORS.Jira },
      { name: "Confluence", iconName: "Confluence", color: TECH_COLORS.Confluence },
      { name: "Agile", iconName: "Agile", color: TECH_COLORS.Agile }
    ],
  },
  {
    id: 3,
    name: "Cabana App",
    date: "05/21/24-08/05/24",
    subtitle: "React Native - College Roommate Finder",
    githubUrl: "https://github.com/yourusername/cabana-app",
    description: `A college roommate finder mobile application developed as a replacement for Patio, focusing on creating a more focused and less dating-app-like experience for students.

Project Overview:

• Cofounded a cross-college team to develop a roommate finder app
• Successfully launched to the App Store with over 5,000 users
• Established LLC for business operations
• Implemented comprehensive marketing strategy

Key Features:

• College-specific group messaging system
• Real-time notifications and messaging
• Custom matching algorithm based on preferences
• Automated content moderation system
• Push notification integration with Apple services

Technical Implementation:

• React Native mobile application in JavaScript
• Supabase for user authentication
• Supabase for real-time messaging
• Supabase for photo storage buckets
• Supabase for sensitive data management
• Edge functions in TypeScript for automated moderation bots
• Edge functions in TypeScript for real-time notifications
• Edge functions in TypeScript for content filtering
• Custom matching algorithm for roommate compatibility
• Apple Push Notification Service integration

Comprehensive planning phase:
• User flow modeling
• Database schema design
• Marketing strategy development
Social media marketing:
• TikTok content creation
• Instagram brand photoshoots
• Influencer partnerships with freshman-focused accounts
• Legal business structure with LLC formation

The app successfully filled the gap left by Patio's shutdown, providing a more focused and appropriate platform for college students to find roommates. The combination of technical innovation and strategic marketing led to successful user adoption and growth.`,
    image: "/images/icon-cabana.png",
    video: "/videos/cabana-demo.mp4",
    technologies: [
      { name: "React Native", iconName: "React", color: TECH_COLORS.React },
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "TypeScript", iconName: "Typescript", color: TECH_COLORS.Typescript },
      { name: "Supabase", iconName: "Supabase", color: TECH_COLORS.Supabase },
      { name: "Node.js", iconName: "Nodedotjs", color: TECH_COLORS.Nodedotjs },
      { name: "Apple", iconName: "Apple", color: TECH_COLORS.Apple },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 4,
    name: "ScoutGlobal.tech",
    date: "02/2024",
    subtitle: "Full-Stack Engineer | Georgia Tech Hackalytics",
    githubUrl: "https://github.com/yourusername/scoutglobal",
    description: `A 24-hour hackathon project that revolutionized talent scouting for international basketball players through advanced data analytics and web scraping.

Project Overview:

• Developed a cutting-edge web application hosted on a .tech domain
• Created a comprehensive player insights platform
• Implemented advanced data analytics for player evaluation
• Built and deployed within a 24-hour timeframe

Technical Implementation:

• Web scraping pipeline using BeautifulSoup and Selenium
• Data processing and analysis with Pandas
• Linear regression model for performance metric analysis
• React frontend for intuitive user interface
• Python backend for data processing and API endpoints

Key Achievements:

• Successfully scraped and processed 2000+ international basketball player records
• Identified four statistically significant performance metrics for NBA success
• Achieved p-value of less than 0.01 for identified metrics
• Created an efficient data pipeline for real-time player evaluation

The project demonstrated the power of data analytics in sports scouting, providing valuable insights for talent evaluation while showcasing rapid development capabilities under time constraints.`,
    image: "/images/icon-basketball.png",
    video: "/videos/scoutglobal-demo.mp4",
    technologies: [
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "Python", iconName: "Python", color: TECH_COLORS.Python },
      { name: "React", iconName: "React", color: TECH_COLORS.React },
      { name: "Pandas", iconName: "Pandas", color: TECH_COLORS.Pandas },
      { name: "Selenium", iconName: "Selenium", color: TECH_COLORS.Selenium },
      { name: "BeautifulSoup", iconName: "Beautifulsoup", color: TECH_COLORS.Beautifulsoup },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 5,
    name: "Outfitme",
    date: "10/2023",
    subtitle: "Full-Stack Engineer | UCF Hackathon",
    githubUrl: "https://github.com/yourusername/outfitme",
    description: `A 24-hour hackathon project that leverages AI to revolutionize personal fashion styling through image analysis and outfit recommendations.

Project Overview:

• Developed a mobile application using React Native
• Implemented AI-powered outfit suggestions
• Created a custom wrapper for OpenAI's ChatGPT-4 API
• Built and deployed within a 24-hour timeframe

Technical Implementation:

• Custom wrapper for OpenAI's ChatGPT-4 API integration
• Advanced image processing and analysis pipeline
• Real-time outfit visualization system
• Efficient backend communication architecture
• Dynamic image rendering for outfit display

Key Achievements:

• Achieved 96% success rate in outfit recommendations
• Implemented 0.2-second latency between API requests and responses
• Developed intuitive UI/UX for outfit visualization
• Successfully trained AI model for edge cases
• Created efficient image processing pipeline

The project demonstrated the potential of AI in fashion technology, providing users with instant, personalized outfit recommendations based on color theory and social norms.`,
    image: "/images/icon-chestplate.png",
    video: "/videos/outfitme-demo.mp4",
    technologies: [
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "React Native", iconName: "React", color: TECH_COLORS.React },
      { name: "OpenAI", iconName: "Openai", color: TECH_COLORS.Openai },
      { name: "Supabase", iconName: "Supabase", color: TECH_COLORS.Supabase },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 6,
    name: "Minecraft Portfolio",
    date: "03/2024",
    subtitle: "Full-Stack Engineer | Personal Website",
    githubUrl: "https://github.com/yourusername/masonwebsite",
    description: `A Minecraft-themed portfolio website that showcases projects and experiences through an immersive, interactive interface.

Project Overview:

• Developed a responsive, interactive portfolio website
• Implemented Minecraft-inspired UI/UX design
• Created an engaging project showcase system
• Built with modern web technologies

Technical Implementation:

• Next.js 14 with App Router for server-side rendering
• Tailwind CSS for responsive, pixel-perfect styling
• Cloudflare R2 for video and asset storage
• Vercel for global deployment and hosting
• Custom audio and visual effects
• Interactive project modal system

Key Features:

• Minecraft-style inventory system for project display
• Custom sound effects and animations
• Responsive design for all device sizes
• Optimized video streaming through Cloudflare
• Interactive project selection and viewing
• Smooth transitions and hover effects

The website combines modern web development practices with nostalgic gaming elements, creating an engaging and memorable user experience while maintaining professional presentation of projects and skills.`,
    image: "/images/icon-herobrine.png",
    video: "/videos/website-demo.mp4",
    technologies: [
      { name: "Next.js", iconName: "Nextdotjs", color: TECH_COLORS.Nextdotjs },
      { name: "React", iconName: "React", color: TECH_COLORS.React },
      { name: "Tailwind CSS", iconName: "Tailwindcss", color: TECH_COLORS.Tailwindcss },
      { name: "Cloudflare", iconName: "Cloudflare", color: TECH_COLORS.Cloudflare },
      { name: "Vercel", iconName: "Vercel", color: TECH_COLORS.Vercel },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 7,
    name: "FitTrack",
    date: "01/2024",
    subtitle: "Full-Stack Engineer | School Project",
    githubUrl: "https://github.com/yourusername/fittrack",
    description: `A comprehensive fitness tracking web application that helps users monitor their workouts and nutrition through an intuitive interface.

Project Overview:

• Developed a full-stack fitness tracking application
• Implemented secure user authentication
• Created a responsive, user-friendly interface
• Built with React and Firebase

Technical Implementation:

• React for frontend development
• Firebase Authentication for user management
• Firebase Firestore for real-time data storage
• Firebase Hosting for deployment
• Custom workout and nutrition tracking system
• Responsive design for all devices

Key Features:

• User authentication and profile management
• Daily calorie tracking and logging
• Workout history and progress tracking
• Custom workout creation and management
• Real-time data synchronization
• Progress visualization and statistics

The application provides users with a seamless experience for tracking their fitness journey, combining modern web technologies with practical fitness management features.`,
    image: "/images/icon-dumbell.png",
    video: "/videos/fittrack-demo.mp4",
    technologies: [
      { name: "React", iconName: "React", color: TECH_COLORS.React },
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "Firebase", iconName: "Firebase", color: TECH_COLORS.Firebase },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 8,
    name: "Contact Manager",
    date: "12/2023",
    subtitle: "Full-Stack Engineer | COP4331C Small Project",
    githubUrl: "https://github.com/yourusername/contact-manager",
    description: `A full-stack contact management system built with the LAMP stack, featuring comprehensive planning documentation and secure user authentication.

Project Overview:

• Developed a complete contact management system
• Created detailed project planning documentation
• Implemented secure user authentication
• Built with LAMP stack technologies

Technical Implementation:

• HTML5 and CSS3 for frontend development
• JavaScript for interactive features
• PHP for backend API development
• MySQL for database management
• Cookie-based user session handling
• DigitalOcean for hosting

Key Features:

• User authentication (signup/login)
• Contact CRUD operations
• Search functionality
• User-specific contact management
• Secure data handling
• Responsive design

Project Planning:

• UML diagrams for system architecture
• Entity Relationship Diagrams for database design
• Gantt charts for project timeline
• Comprehensive documentation
• Database schema design

The project demonstrates strong fundamentals in web development, database design, and project planning, showcasing the implementation of a complete full-stack application.`,
    image: "/images/icon-phone.png",
    video: "/videos/contact-manager-demo.mp4",
    technologies: [
      { name: "HTML5", iconName: "Html5", color: TECH_COLORS.Html5 },
      { name: "CSS3", iconName: "Css3", color: TECH_COLORS.Css3 },
      { name: "JavaScript", iconName: "Javascript", color: TECH_COLORS.Javascript },
      { name: "PHP", iconName: "Php", color: TECH_COLORS.Php },
      { name: "MySQL", iconName: "Mysql", color: TECH_COLORS.Mysql },
      { name: "DigitalOcean", iconName: "Digitalocean", color: TECH_COLORS.Digitalocean },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git }
    ],
  },
  {
    id: 9,
    name: "Super Chess Bros",
    date: "03/2024-Present",
    subtitle: "Project Manager & Developer | Senior Design Project",
    githubUrl: "https://github.com/yourusername/super-chess-bros",
    description: `An innovative chess game that combines traditional chess with platform fighting mechanics, where piece captures trigger character duels.

Project Overview:

• Leading a team of 4 developers in game development
• Managing project timeline and deliverables
• Implementing game mechanics and features
• Expected completion: November 2024

Technical Implementation:

• Godot game engine for development
• GDScript for game logic and mechanics
• Custom sprite-based art assets
• Platform fighting mechanics
• Chess game logic integration
• Character-specific fighting styles
• Code quality tools and linting
• Hitbox system for combat mechanics
• State machine for character animations
• Object-oriented design patterns
• Physics-based movement system
• Collision detection and response
• Scene management for game states
• Resource management for assets
• Input handling system
• Sound effect management

Development Process:

• Agile methodology implementation
• Weekly in-person scrum meetings
• Sprint planning and retrospectives
• User story mapping
• Trello for task management and tracking
• Peer review system for code quality
• Automated linting for code consistency
• Gantt chart for project timeline
• Regular progress tracking and updates
• Continuous integration practices

Key Features:

• Traditional chess gameplay
• Platform fighting mechanics
• Character-specific abilities
• Sprite-based animations
• Seamless transition between chess and fighting
• Unique character designs for each chess piece
• Dynamic hitbox system
• State-based animation system
• Physics-based combat
• Sound effect integration

The project combines strategic chess gameplay with dynamic fighting mechanics, creating a unique gaming experience while demonstrating strong project management and development skills.`,
    image: "/images/icon-king.png",
    video: "/videos/super-chess-bros-demo.mp4",
    technologies: [
      { name: "Godot", iconName: "Godot", color: TECH_COLORS.Godot },
      { name: "GDScript", iconName: "GDScript", color: TECH_COLORS.GDScript },
      { name: "Trello", iconName: "Trello", color: TECH_COLORS.Trello },
      { name: "Git", iconName: "Git", color: TECH_COLORS.Git },
      { name: "Agile", iconName: "Agile", color: TECH_COLORS.Agile }
    ],
  },
]; 