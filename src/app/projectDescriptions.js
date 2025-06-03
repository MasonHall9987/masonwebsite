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
• Push notifications for low water levels
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
      { name: "Arduino/ESP32", iconName: "Arduino" },
      { name: "C++", iconName: "Cplusplus" },
      { name: "React Native", iconName: "React" },
      { name: "JavaScript", iconName: "Javascript" },
      { name: "Supabase", iconName: "Supabase" },
      { name: "3D Printing", iconName: "Threedotjs" },
      { name: "IoT", iconName: "Internetexplorer" },
      { name: "Git", iconName: "Git" }
    ],
  },
  {
    id: 2,
    name: "Futurex",
    date: "05/21/24-08/05/24",
    subtitle: "InternShip - Software Developer",
    githubUrl: "https://github.com/yourusername/futurex",
    description: `A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.

Project Overview:

• Developed during internship at Futurex
• Focus on secure e-commerce solutions
• Emphasis on scalable architecture

Key Features:

• User authentication and authorization
• Product catalog management
• Shopping cart functionality
• Secure payment processing
• Order tracking system

Technical Implementation:

• Python-based backend architecture
• Secure API endpoints
• Database optimization
• Real-time inventory management
• Payment gateway integration`,
    image: "/images/icon-plant-pot.png",
    video: "/videos/futurex-demo.mp4",
    technologies: [
      { name: "Python", iconName: "Python" },
      { name: "Python", iconName: "Python" },
      { name: "Python", iconName: "Python" },
      { name: "React", iconName: "React" }
    ],
  },
  {
    id: 3,
    name: "Cabana App",
    date: "05/21/24-08/05/24",
    subtitle: "React Native - Mobile App",
    githubUrl: "https://github.com/yourusername/cabana-app",
    description: `A real-time weather application that provides current conditions and forecasts based on user location or search.

Application Features:

• Real-time weather updates
• Location-based forecasting
• Custom weather alerts
• Interactive weather maps
• Historical weather data

Technical Details:

• React Native implementation
• Weather API integration
• Location services
• Push notification system
• Offline functionality`,
    image: "/images/icon-plant-pot.png",
    video: "/videos/cabana-demo.mp4",
    technologies: [
      { name: "Python", iconName: "Python" },
      { name: "Python", iconName: "Python" },
      { name: "Python", iconName: "Python" },
      { name: "Python", iconName: "Python" }
    ],
  },
]; 