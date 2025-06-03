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
  Apple: "#000000"
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
    image: "/images/icon-plant-pot.png",
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
]; 