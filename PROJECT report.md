**CHAPTER 1: INTRODUCTION TO PROJECT**

## **CHAPTER 1: INTRODUCTION TO PROJECT**

### **Introduction**

In today’s competitive academic environment, campus placements play a crucial role in shaping the career of students. Colleges and universities organize placement drives where companies recruit students based on their skills, qualifications, and performance. However, the traditional placement process often lacks a centralized and efficient system for managing job opportunities, student applications, and communication.

Students frequently face difficulties in tracking placement drives, uploading resumes, and monitoring their application status. Important information is often scattered across different platforms such as emails, notice boards, or messaging groups, leading to confusion and missed opportunities. Similarly, Training and Placement Officers (TPOs) find it challenging to manage large volumes of student data, job postings, and application records manually.

To overcome these challenges, an **AI-Based Placement Portal** has been developed as a web-based system that provides a centralized and structured platform for managing placement activities efficiently. The system connects students with job opportunities posted by administrators and simplifies the entire placement workflow.

The Placement Portal is developed using modern web technologies such as **React** for building interactive user interfaces and **Vite** for fast development and performance optimization. The system uses **localStorage** as a mock database to store user data, job details, and application records within the browser, enabling the application to function without a dedicated backend server.

The system supports two types of users:

* **Students**, who can register, log in, upload resumes, view placement drives, apply for jobs, and track application status.  
* **Administrators (TPOs)**, who can post placement drives, view applications, shortlist or reject candidates, and manage placement activities.

A key feature of this project is the integration of **Artificial Intelligence (AI)**. The system analyzes uploaded resumes using AI techniques to provide feedback, evaluate suitability for job roles, and generate relevant interview questions. Additionally, **PDF parsing technology** is used to extract text from resumes directly in the browser, eliminating the need for backend processing.

The application follows a **Single Page Application (SPA)** architecture, where all pages are dynamically rendered without reloading the browser. It also implements **role-based access control**, ensuring that users can only access features relevant to their roles, thereby improving security and usability.

The main aim of the Placement Portal is to digitize and simplify the placement process by providing an organized, intelligent, and user-friendly system. It reduces manual effort, enhances accessibility, and improves communication between students and administrators.

### **Conclusion**

In conclusion, the AI-Based Placement Portal demonstrates the practical implementation of modern web development concepts along with intelligent features such as AI-based resume analysis and PDF processing. It provides a scalable and efficient solution for managing college placement activities and enhances the overall placement experience for both students and administrators.

**CHAPTER 2: OBJECTIVE AND SCOPE OF THE PROJECT**

**Objective of the Project**

The primary objective of the AI-Based Placement Portal is to design and develop a centralized, web-based system that simplifies and digitizes the college placement process. Traditional placement systems are often manual, unorganized, and inefficient, making it difficult for students to access job opportunities and for administrators to manage placement activities effectively.

This project aims to provide an intelligent and structured platform where students and administrators can interact seamlessly. By integrating modern web technologies with Artificial Intelligence, the system enhances the placement process by improving accessibility, automation, and decision-making.

**Specific Objectives of the Project**

* **To Develop a Centralized Placement Platform**  
  The system provides a single platform where all placement-related activities such as job postings, applications, and status tracking are managed efficiently.  
* **To Simplify the Job Application Process**  
  Students can easily register, log in, upload resumes, view placement drives, and apply for jobs through a user-friendly interface.  
* **To Implement Role-Based Access Control**  
  The system distinguishes between students and administrators, ensuring secure access to features based on user roles.  
* **To Enable Resume Upload and Management**  
  Students can upload their resumes once and use them for multiple job applications, reducing redundancy and saving time.  
* **To Provide Application Tracking System**  
  Students can track the status of their applications (pending, shortlisted, or rejected), while administrators can efficiently manage and review applications.  
* **To Simulate Backend Functionality Using localStorage**  
  The project uses browser localStorage as a mock database to store users, jobs, and applications, eliminating the need for a dedicated backend.  
* **To Implement AI-Based Resume Analysis**  
  The system uses Artificial Intelligence to analyze resumes and evaluate their suitability for specific job roles. It provides suggestions to improve resume quality and increases chances of selection.  
* **To Generate AI-Based Interview Questions**  
  Based on the student’s resume and job role, the system generates relevant interview questions to help students prepare effectively.  
* **To Extract Resume Data Using PDF Parsing**  
  The system uses client-side PDF processing techniques to extract text from uploaded resumes, enabling intelligent analysis without requiring a backend server.  
* **To Apply Modern Web Development Concepts**  
  The project demonstrates concepts such as React components, state management, routing, and Single Page Application (SPA) architecture.


**Outcome of the Objectives**

By achieving the above objectives, the Placement Portal provides:

* A centralized and organized system for placement management  
* Easy access to job opportunities for students  
* Efficient application handling and tracking  
* Intelligent resume analysis and preparation support using AI  
* Reduced manual effort for administrators  
* Practical implementation of modern frontend technologies

Achievement of these outcomes indicates that the project successfully transitions the placement process from an ad hoc communication model to a structured information system. The portal minimizes ambiguity by providing a consistent and shared source of data for both students and administrators.

**Scope of the project**

The scope of the AI-Based Placement Portal extends across multiple dimensions including functionality, technical implementation, and future enhancements.

**1\. Functional Scope**

* Students can register, log in, upload resumes, and apply for jobs  
* Administrators can post placement drives and manage applications  
* The system supports application status updates (pending, shortlisted, rejected)  
* AI features provide resume evaluation and interview preparation support


  

**2\. Technical Scope**

* Developed using React for frontend development  
* Uses React Router for navigation without page reload  
* Implements localStorage as a mock database  
* Integrates AI APIs for resume analysis and question generation  
* Uses PDF parsing (PDF.js) for extracting resume data


**3\. User Scope**

* Designed for college students seeking placement opportunities  
* Useful for Training and Placement Officers to manage recruitment processes  
* Provides a simple, interactive, and user-friendly interface

**4\. Educational Scope**

* Demonstrates real-world application development using modern technologies  
* Provides practical understanding of frontend frameworks and data handling  
* Enhances knowledge of AI integration in web applications

**5\. Future Scope**

* Integration with real backend technologies such as Node.js and Express  
* Use of databases like MongoDB or MySQL for scalable data storage  
* Advanced AI-based job recommendation systems  
* Mobile application development for Android and iOS  
* Implementation of notifications, analytics dashboards, and advanced search features

### **Conclusion**

The AI-Based Placement Portal has a broad scope in terms of functionality, technical implementation, and future expansion. It not only simplifies the placement process but also introduces intelligent features that enhance student preparation and system efficiency, making it a powerful and scalable solution for modern placement management.

**CHAPTER 3: THEORETICAL BACKGROUND AND DEFINITION OF THE PROBLEM**

**Theoretical Background**

**Introduction**

The AI-Based Placement Portal is developed in the domain of modern web application development. It combines frontend technologies, client-side data storage, and Artificial Intelligence to create an interactive and intelligent system for managing placement activities.

The application is built using React, which follows a component-based architecture, enabling the development of reusable and modular user interface elements. Navigation within the system is handled using client-side routing, making it a Single Page Application (SPA). Data is managed using browser localStorage, which acts as a mock database.

Additionally, the system integrates Artificial Intelligence for resume analysis and interview preparation, making it more advanced compared to traditional web applications.

**Web Development Fundamentals**

Web development involves creating applications that run in a web browser and provide dynamic interaction with users. It consists of multiple layers:

**1\. Frontend Development**  
Frontend development focuses on designing and implementing the user interface.

* React is used to build dynamic and interactive components  
* JSX allows writing HTML-like syntax within JavaScript  
* CSS is used for styling and layout design  
* The interface updates automatically based on user actions

This layer ensures a smooth and user-friendly experience for both students and administrators.

**2\. Application Logic (Client-Side Processing)**  
This layer handles the internal functioning of the application.

* React Hooks such as useState and useEffect manage state and lifecycle  
* Context API is used for global state management (authentication)  
* Event handling manages user interactions like login, form submission, and job applications  
* Routing logic controls navigation between different pages

This ensures proper system behavior and efficient handling of user inputs.

**3\. Data Management**  
Data management is responsible for storing and retrieving application data.

* localStorage is used as a browser-based storage system  
* It stores users, jobs, applications, and session data  
* Data is stored in JSON format  
* Provides persistence even after page refresh

Although localStorage is limited compared to real databases, it is suitable for simulating backend functionality in this project.

**4\. Artificial Intelligence Integration**

**Artificial Intelligence (AI)** is used to enhance the functionality of the Placement Portal by making the system more **intelligent** and **interactive**.

* AI analyzes student resumes and evaluates their suitability for job roles  
* It provides suggestions to improve resume quality  
* It generates role-specific interview questions based on resume content  
* It helps students prepare better for placement interviews

The integration of AI transforms the system from a basic application into an **intelligent platform** that assists users in decision-making and preparation.

**5\. PDF Processing (Client-Side)**

The system uses **PDF** processing techniques to **extract information** from uploaded resumes.

* PDF.js library is used to read and process **PDF** files in the browser  
* It extracts text content from resumes without requiring a backend server  
* The extracted data is used for AI analysis and evaluation

This feature improves a**utomation and eliminates manual data entry.**

**6\. Authentication and Authorization**

Authentication verifies the identity of users, while authorization controls access to system features.

* Users log in using email and password  
* The system validates credentials using stored data  
* Role-based access control is implemented:  
  * **Student**s can apply for jobs  
  * **Admins** can manage job postings and applications

This ensures secure and controlled access within the system.

**7\. Single Page Application (SPA)**

The Placement Portal follows a Single Page Application architecture.

* Only one HTML page is loaded  
* Content is dynamically updated using JavaScript  
* Navigation does not require full page reload

This improves performance and provides a seamless user experience.

**Definition of the Problem**

**Problem Identification**

In many educational institutions, placement processes are either manual or poorly organized. Students face several challenges such as:

* Lack of a centralized platform for placement information  
* Difficulty in tracking job opportunities and deadlines  
* Manual resume submission and application processes  
* No proper system to track application status

Administrators also face issues such as:

* Managing large volumes of student data  
* Tracking applications manually  
* Difficulty in shortlisting candidates efficiently  
* Lack of intelligent tools for evaluating resumes

**Problem Statement**

Despite the rapid growth of digital platforms, many educational institutions still lack an efficient and intelligent system for managing placement activities. Existing systems are often unorganized, lack real-time interaction, and do not provide advanced features to support students during the placement process.

Most platforms focus only on displaying job opportunities without offering tools for resume evaluation, application tracking, or interview preparation. Additionally, there is limited use of automation and Artificial Intelligence to assist students in improving their chances of selection.

Therefore, the problem can be defined as:

“A need for a centralized, intelligent, and user-friendly web-based system that effectively manages placement activities, simplifies the job application process, ensures secure user access, and enhances student preparedness through AI-based resume analysis and interview support.”

**Need for the Project**

The AI-Based Placement Portal is developed to overcome the limitations of traditional and existing placement systems. There is a growing need for a platform that not only manages placement activities but also supports students in preparing for recruitment processes.

The project is needed to:

* Provide a centralized platform for managing placement information and job opportunities  
* Simplify the process of applying for jobs and tracking application status  
* Reduce manual effort and paperwork for administrators  
* Enable secure access through authentication and role-based control  
* Assist students in improving their resumes using AI-based analysis  
* Provide intelligent interview preparation through automated question generation  
* Enhance communication and interaction between students and administrators

**Expected Outcome**

The implementation of the AI-Based Placement Portal is expected to deliver the following outcomes:

* A well-organized and centralized system for managing placement drives and applications  
* Improved accessibility to job opportunities for students  
* Efficient handling and tracking of student applications  
* Secure and reliable user authentication system  
* Intelligent resume evaluation and improvement suggestions using AI  
* Generation of relevant interview questions to enhance student preparation  
* Reduced workload for administrators through automation  
* A responsive and user-friendly interface for better user experience

### **Conclusion**

The AI-Based Placement Portal successfully addresses the challenges faced in traditional placement systems by introducing a centralized, structured, and intelligent solution. It combines modern web development technologies with Artificial Intelligence to enhance both system functionality and user experience.

The project not only simplifies placement management but also adds value by assisting students in resume building and interview preparation. Its scalable design and modular architecture make it suitable for future enhancements and real-world implementation.

Thus, the system serves as an effective and innovative solution for improving the overall placement process in educational institutions.

**CHAPTER 4: SYSTEM ANALYSIS & DESIGN VIS-À-VIS USER REQUIREMENTS**

**Introduction to System Analysis** 

System analysis and design is a fundamental phase in the development of any software system. It involves studying the existing problems, understanding user requirements, and defining the functionalities that the system must provide. This phase ensures that the final system is efficient, reliable, and capable of meeting user expectations.

In the context of the AI-Based Placement Portal, system analysis plays a crucial role in identifying the challenges faced in traditional placement processes and determining how a digital platform can address these issues. The system is designed to provide a centralized, interactive, and intelligent environment where students and administrators can manage placement activities effectively.

The analysis focuses on understanding the needs of different users, including students and administrators (TPOs), and defining features such as job posting, application management, resume handling, and AI-based assistance. It also considers important aspects such as security, usability, and performance to ensure that the system functions smoothly.

By carefully analyzing the problem domain and user requirements, the system can be designed in a structured and scalable manner. This helps in reducing complexity, improving efficiency, and ensuring that all functionalities are properly implemented.

**System Analysis**

System analysis is the process of examining the current system, identifying its limitations, and defining the requirements for a new and improved system. It helps in understanding how the system should operate and what features it must include to solve the identified problems.

For the AI-Based Placement Portal, system analysis involves studying the difficulties faced by students in accessing placement information and the challenges faced by administrators in managing placement activities. It also includes defining system features such as authentication, job management, application tracking, and AI-based resume evaluation.

The analysis ensures that both functional and non-functional requirements are clearly identified so that the system can be designed to meet user needs effectively.

**Objectives of System Analysis**

The objectives of system analysis for the AI-Based Placement Portal are defined to ensure that the system is capable of solving real-world placement problems in an efficient, structured, and intelligent manner. These objectives guide the design and development of the system and ensure that all user needs are properly addressed.

The detailed objectives are as follows:

1. **To Identify User Requirements Clearly**  
   The system analysis aims to understand the needs of both students and administrators. This includes identifying what features each user requires, such as job access, application tracking, and administrative controls.  
2. **To Analyze Limitations of the Existing System**  
   The objective is to study the drawbacks of traditional placement processes, such as lack of centralization, manual handling of data, and absence of tracking mechanisms, and to design a system that overcomes these issues.  
3. **To Define Core Functionalities of the System**  
   The analysis focuses on identifying essential system features such as user registration, login, job posting, job application, resume upload, and application status tracking.  
4. **To Design a Role-Based Access Mechanism**  
   The system must ensure that students and administrators have access only to their respective functionalities. This improves security and prevents unauthorized actions.  
5. **To Ensure Secure Authentication and Session Management**  
   The objective is to implement a secure login system that validates user credentials and maintains user sessions using localStorage.  
6. **To Plan Efficient Data Management**  
   The system should store and retrieve data efficiently using localStorage, including user details, job postings, resumes, and applications, ensuring consistency and persistence.  
7. **To Enable Resume Handling and Processing**  
   The system must support uploading resumes in PDF format, converting them into Base64 format, and storing them securely for job applications.  
8. **To Integrate AI-Based Resume Analysis**  
   The analysis aims to include Artificial Intelligence features that evaluate resumes, provide improvement suggestions, and match them with job requirements to enhance student preparedness.  
9. **To Implement AI-Based Interview Preparation Support**  
   The system should generate relevant interview questions based on the student’s resume and job role, helping students prepare effectively for recruitment processes.  
10. **To Incorporate Client-Side PDF Parsing**  
    The objective is to extract text from uploaded resumes using PDF processing techniques, enabling automated analysis without requiring a backend server.  
11. **To Ensure Smooth Data Flow and Interaction**  
    The system must allow seamless interaction between users, application logic, and data storage, ensuring that operations such as applying for jobs and updating status are performed efficiently.  
12. **To Improve User Experience and Usability**  
    The system should provide a clean, intuitive, and responsive interface that is easy to use for both students and administrators.  
13. **To Ensure System Performance and Reliability**  
    The system should function smoothly with minimal delays, handle user inputs correctly, and maintain stability during operations.  
14. **To Design for Scalability and Future Enhancements**  
    The system should be flexible enough to support future upgrades, such as integration with real backend systems, databases, and advanced AI features.  
15. **To Reduce Manual Effort and Increase Automation**  
    The system aims to automate placement-related activities such as application tracking, resume evaluation, and candidate shortlisting, reducing the workload on administrators.

These objectives ensure that the AI-Based Placement Portal is not only functional but also intelligent, secure, user-friendly, and capable of adapting to future technological advancements.

**User Requirements**

**(a) Functional Requirements**

Functional requirements define what the system should do. These requirements describe the core features and operations that the AI-Based Placement Portal must perform to meet user needs.

| Requirement | Description |
| :---- | :---- |
| **User Registration** | Allows students to create an account using name, email, and password. The system stores user details securely in localStorage. |
| **User Login** | Enables both students and administrators to log in using valid credentials. The system verifies identity and grants access based on role. |
| **Authentication & Session Management** | Maintains user session using localStorage, ensuring that users remain logged in even after page refresh. Prevents unauthorized access. |
| **Role-Based Access Control** | Restricts access based on user roles. Students can apply for jobs, while administrators can manage placement drives and applications. |
| **Job Viewing System** | Allows students to view all available placement drives with details such as company name, role, salary, and deadline. |
| **Job Posting (Admin)** | Enables administrators to create and manage placement drives by entering job details such as title, company, description, salary, and deadline. |
| **Job Application System** | Allows students to apply for jobs using their uploaded resume. The system ensures that duplicate applications are not allowed. |
| **Resume Upload** | Students can upload resumes in PDF format. The system converts them into Base64 format for storage in localStorage. |
| **Resume Parsing (PDF Processing)** | Extracts text from uploaded PDF resumes using client-side PDF processing, enabling further analysis without backend support. |
| **Application Tracking** | Allows students to track application status such as pending, shortlisted, or rejected in real time. |
| **Admin Application Management** | Enables administrators to view all applications, review candidate details, and update application status (shortlist/reject). |
| **AI Resume Analysis** | Analyzes resume content using AI and provides suggestions to improve quality and job suitability. |
| **AI Interview Question Generation** | Generates customized interview questions based on resume content and job role to help students prepare effectively. |

**(b) Non-Functional Requirements**

Non-functional requirements define how the system should perform and the quality attributes it must satisfy. These requirements ensure that the AI-Based Placement Portal is efficient, secure, reliable, and user-friendly.

| Requirement | Description |
| :---- | :---- |
| **Usability** | The system should have a simple, clean, and intuitive interface so that students and administrators can use it easily without technical knowledge. |
| **Performance** | The application should load quickly and respond instantly to user actions using React’s dynamic rendering and SPA architecture. |
| **Reliability** | The system should function correctly without crashes or errors and handle all operations such as login, job application, and data storage smoothly. |
| **Scalability** | The system should be designed in a way that it can be extended in the future with backend integration, databases, and advanced AI features. |
| **Security** | The system must ensure secure authentication, role-based access control, and protection of user data stored in localStorage. |
| **Data Integrity** | Data such as user details, job postings, and applications should remain accurate, consistent, and properly stored without corruption. |
| **Maintainability** | Maintain a clean layout, consistent design, readable fonts, and a user-friendly interface suitable for an academic platform. |
| **Accessibility** | The application should be accessible on different devices such as desktops, laptops, and tablets, and should work across multiple web browsers. |
| **Efficiency** | The system should minimize unnecessary processing and ensure optimal use of resources for smooth performance. |
| **Compatibility** | The application should work properly on modern web browsers such as Chrome, Edge, and Firefox without layout or functionality issues. |
| **Responsiveness** | The interface should adapt to different screen sizes and provide a consistent user experience across devices. |
| **Availability** | The system should be available whenever the user accesses it, as it runs locally in the browser without dependency on external servers. |

**System Design**

System design is the phase where the requirements identified during system analysis are converted into a structured and implementable framework. It defines how different components of the system interact with each other and how data flows within the system.

For the AI-Based Placement Portal, system design focuses on creating a modular, scalable, and user-friendly web application that integrates frontend technologies with client-side data storage and AI-based features.

The system is designed to ensure:

* Smooth interaction between users and the application  
* Efficient handling of job postings and applications  
* Secure authentication and role-based access  
* Integration of AI features such as resume analysis and interview question generation  
* Proper data storage and retrieval using localStorage

The design follows a layered and modular approach, which makes the system easy to understand, maintain, and extend in the future.

**Design Approach**

The AI-Based Placement Portal follows a **User-Centered Design (UCD)** approach, which focuses on creating a system that is simple, interactive, and easy to use for both students and administrators.

The design approach includes the following key aspects:

#### **1\. User-Centered Design (UCD)**

* The system is designed based on user needs and behavior  
* Provides a simple and intuitive interface  
* Ensures easy navigation and accessibility

#### **2\. Modular Design**

* The system is divided into independent modules such as:  
  * Authentication Module  
  * Student Dashboard  
  * Admin Dashboard  
  * Job Management System  
  * Application Management System  
  * AI Module  
* Each module performs a specific function, making the system easy to maintain and update

#### **3\. Component-Based Architecture (React)**

* The application is built using reusable React components  
* Each component handles a specific part of the UI  
* Improves code reusability and maintainability

#### **4\. Single Page Application (SPA) Design**

* The system loads a single HTML page  
* Navigation between pages is handled using React Router  
* No full page reloads, resulting in faster performance

#### **5\. Client-Side Data Management**

* localStorage is used as a mock database  
* Stores users, jobs, applications, and session data  
* Enables the application to function without a backend

#### **6\. Role-Based Design**

* Different interfaces and functionalities for:  
  * Students (apply for jobs, track status)  
  * Admin (manage jobs and applications)  
* Ensures security and controlled access

#### **7\. AI-Integrated Design**

* Includes AI-based modules for:  
  * Resume analysis  
  * Interview question generation  
* Enhances system intelligence and user support

#### **8\. Responsive Design**

* The interface adapts to different screen sizes  
* Provides a consistent experience across devices

**System Architecture**

System architecture defines the overall structure of the system and explains how different components interact with each other. It provides a clear understanding of how data flows between the user interface, application logic, and data storage.

The AI-Based Placement Portal follows a **three-layer architecture**, which ensures separation of concerns, better organization, and easier maintenance.

### **Three-Layer Architecture**

#### **1\. Presentation Layer (Frontend)**

The presentation layer is responsible for user interaction and interface design.

* Developed using **React**  
* Handles UI components such as login page, dashboards, and job listings  
* Uses JSX and CSS for designing interactive and responsive layouts  
* Enables smooth navigation using React Router (SPA behavior)

This layer ensures that users can easily interact with the system.

#### **2\. Application Layer (Logic & Processing)**

The application layer handles the core logic and processing of the system.

* Manages authentication and session handling using Context API  
* Controls routing and navigation logic  
* Processes user actions such as login, job application, and job posting  
* Handles AI functionalities such as:  
  * Resume analysis  
  * Interview question generation  
* Implements validation and error handling

This layer acts as a bridge between the frontend and data storage.

#### **3\. Data Layer (Storage)**

The data layer is responsible for storing and retrieving data.

* Uses **localStorage** as a mock database  
* Stores:  
  * User data  
  * Job postings  
  * Application records  
  * Session information  
* Data is stored in JSON format  
* Provides persistence even after page refresh

Although localStorage is limited compared to real databases, it is sufficient for simulation and demonstration purposes.

### **Architecture Flow**

The overall system flow can be represented as:

User (Student/Admin)

        ↓

Frontend (React UI Components)

        ↓

Application Logic (JS \+ Context API \+ AI Modules)

        ↓

Data Storage (localStorage)

        ↓

Output Displayed to User

### **Interaction Flow**

1. User interacts with the frontend (login, apply, upload resume)  
2. Request is processed in the application layer  
3. Data is stored or retrieved from localStorage  
4. AI modules process resume data when required  
5. Processed data is displayed back to the user

### **Advantages of the Architecture**

* Clear separation of layers improves maintainability  
* Easy to upgrade with backend technologies in future  
* Efficient handling of user interactions  
* Supports integration of AI features  
* Provides fast performance using client-side processing

**Data Flow Design**

Data Flow Design describes how data moves through the system, from user input to processing and final output. It helps in understanding how different components of the AI-Based Placement Portal interact with each other and how information is stored, processed, and displayed.

The system follows a structured flow where user actions are processed through the application logic and stored in localStorage, while AI modules enhance the processing of resume data.

The general data flow of the system is as follows:

**User → Input (Login/Register/Upload/Apply) → Processing (JS \+ React \+ AI) → Storage (localStorage) → Output (Dashboard/Status/Feedback)**

### **Detailed Data Flow Explanation**

#### **1\. User Input**

* Users (Students/Admin) interact with the system through forms and buttons  
* Inputs include:  
  * Registration details  
  * Login credentials  
  * Resume upload (PDF)  
  * Job application requests  
  * Job posting (admin)

#### **2\. Processing Layer**

* The application processes user inputs using JavaScript and React logic  
* Authentication is handled using Context API  
* Validation checks are performed on user inputs  
* Resume files are converted into Base64 format  
* PDF parsing extracts text from resumes  
* AI modules analyze resume data and generate insights

#### **3\. Data Storage (localStorage)**

* Processed data is stored in localStorage  
* Key data stored includes:  
  * Users  
  * Jobs  
  * Applications  
  * Resume data  
* Data is stored in JSON format for easy retrieval

#### **4\. Data Retrieval**

* Data is retrieved from localStorage when required  
* Examples:  
  * Displaying job listings  
  * Showing user dashboard  
  * Fetching application status  
  * Loading resume data for analysis

#### **5\. Output Display**

* Processed data is displayed to users through the frontend  
* Examples:  
  * Job listings shown to students  
  * Application status (pending/shortlisted/rejected)  
  * AI-generated resume feedback  
  * Interview questions

**Data Flow for Student Operations**

Student → Login → Dashboard → View Jobs → Upload Resume → Apply for Job → Data Stored → View Application Status → AI Feedback

**Data Flow for Admin Operations**

Admin → Login → Dashboard → Create Job → View Applications → Shortlist/Reject → Update Status → Display to Student

### **Key Features of Data Flow Design**

* Ensures smooth interaction between user and system  
* Provides real-time updates using client-side processing  
* Maintains structured data handling  
* Integrates AI processing within the flow  
* Reduces dependency on external servers

**Design Components**

| Component | Description |
| :---- | :---- |
| **Landing Page** | Displays the project name, introduction, and navigation options. It acts as the entry point of the system and guides users to login or registration. |
| **Authentication Module** | Handles user registration and login functionality. Validates credentials and maintains user session using localStorage. Implements role-based access for students and administrators. |
| **Student Dashboard** | Provides an interface for students to view available placement drives, upload resumes, apply for jobs, and track application status. |
| **Admin Dashboard** | Allows administrators (TPO) to manage placement activities, including posting jobs, viewing applications, and shortlisting or rejecting candidates. |
| **Job Management Module** | Manages placement drives by storing job details such as title, company, description, salary, and deadline. Allows dynamic creation and display of jobs. |
| **Application Management Module** | Handles student job applications by storing application details, linking students with jobs, and maintaining application status (pending, shortlisted, rejected). |
| **Resume Module** | Enables students to upload resumes in PDF format. Converts files into Base64 format and stores them in localStorage for further use. |
| **PDF Parsing Module** | Extracts text from uploaded resumes using client-side PDF processing techniques, enabling automated analysis without backend support. |
| **AI Module** | Provides intelligent features such as resume analysis, job-role matching, and generation of interview questions based on resume data. |
| **Data Storage Module** | Uses localStorage as a mock database to store user data, job listings, applications, and session information in JSON format. |
| **Navigation System** | Enables smooth navigation between pages using React Router, ensuring Single Page Application (SPA) behavior without page reload. |
| **UI & Styling Component** | Handles the visual design and layout of the system, ensuring responsiveness, readability, and a user-friendly interface using modern CSS techniques. |

**Design Validation**

Design validation is the process of verifying whether the system design meets user requirements and performs efficiently under different conditions. It ensures that the AI-Based Placement Portal is functional, reliable, user-friendly, and capable of handling real-world scenarios.

The system design was validated using the following methods:

#### **1\. Functional Testing**

* All core features such as user registration, login, job posting, job application, and dashboard operations were tested  
* Ensured that students can apply for jobs and admins can manage applications correctly  
* Verified that application status updates (pending, shortlisted, rejected) work properly

#### **2\. User Interface Testing**

* Checked the layout, navigation, and readability of the interface  
* Ensured that the system is simple and easy to use for both students and administrators  
* Verified smooth navigation between pages using React Router

#### **3\. Data Handling Testing**

* Verified proper storage and retrieval of data using localStorage  
* Ensured that user data, job details, and applications are stored accurately  
* Checked data persistence after page refresh

#### **4\. AI Feature Testing**

* Tested resume analysis functionality to ensure correct feedback is generated  
* Verified generation of interview questions based on resume and job role  
* Ensured AI features integrate smoothly with the system

#### **5\. Input Validation Testing**

* Checked all input fields such as login forms, registration forms, and job posting forms  
* Ensured proper error messages are displayed for invalid or incomplete inputs  
* Prevented incorrect or duplicate data entry

#### **6\. Performance Testing**

* Ensured fast loading and smooth performance using React  
* Verified that the system responds quickly to user actions  
* Tested system behavior under multiple operations

#### **7\. Compatibility Testing**

* Tested the system on different browsers such as Chrome and Edge  
* Ensured consistent performance and layout across platforms

#### **8\. Responsiveness Testing**

* Verified that the system works properly on different screen sizes  
* Ensured usability on desktops, laptops, and tablets

#### **9\. User Feedback**

* Collected feedback from users to improve usability and functionality  
* Identified areas for improvement in navigation and design

**User Requirements vs. System Design Mapping**

| User Requirement | System Design Response |
| :---- | :---- |
| **Easy access to placement drives** | Job Section displays all available placement drives in a structured and organized format |
| **Secure user login** | Authentication Module ensures secure login using email and password with session management |
| **Separate access for different users** | Role-Based Access Control provides different dashboards for students and administrators |
| **Simple job application process** | Student Dashboard allows users to apply for jobs easily using uploaded resumes |
| **Resume handling** | Resume Module enables uploading and storing resumes for job applications |
| **Tracking application status** | Application Management Module displays status such as pending, shortlisted, or rejected |
| **Efficient job management** | Admin Dashboard allows administrators to create and manage placement drives |
| **Managing student applications** | Application Management Module allows admins to review, shortlist, or reject candidates |
| **Intelligent support for students** | AI Features provide resume analysis and interview question generation |
| **Organized data storage** | Data Storage Module uses localStorage to store users, jobs, and application data |
| **Smooth navigation** | Navigation System uses React Router for seamless page transitions without reload |
| **User-friendly interface** | UI & Styling Component ensures clean design and easy usability |
| **System reliability** | Modular design ensures smooth functioning and error handling |
| **Future scalability** | System architecture supports integration with backend and advanced features |

**CHAPTER 5: SYSTEM PLANNING (PERT CHART)**

**Introduction**

Program Evaluation and Review Technique (PERT) is a project management tool used for planning, scheduling, and controlling project activities. It helps in analyzing the time required to complete each task and the overall project.

PERT is especially useful in software development projects where multiple activities are involved, and proper planning is required to ensure timely completion. It represents the project in the form of a network diagram consisting of nodes (events) and arrows (activities).

In the AI-Based Placement Portal project, the PERT chart is used to plan different phases such as requirement analysis, system design, development, testing, and deployment. It helps in organizing tasks in a logical sequence and identifying dependencies between them.

**Purpose of PERT Chart**

The main purpose of using a PERT chart in this project is to ensure efficient planning and management of project activities.

The specific purposes are as follows:

1. **To Plan Project Activities**  
   It helps in identifying all tasks involved in the development of the Placement Portal.  
2. **To Determine Time Required**  
   It estimates the time required for each activity and the total project duration.  
3. **To Identify Task Dependencies**  
   It shows the sequence in which tasks must be performed and which tasks depend on others.  
4. **To Improve Project Scheduling**  
   It helps in creating a proper schedule to complete the project within the given time frame.  
5. **To Identify Critical Path**  
   It highlights the most important sequence of tasks that directly affects project completion time.  
6. **To Monitor Project Progress**  
   It allows tracking of completed and pending tasks during development.  
7. **To Reduce Delays and Risks**  
   Proper planning helps in minimizing delays and managing risks effectively.

**Project Planning Overview**

Project planning is the process of organizing tasks, resources, and timelines required for the successful development of a software system. It ensures that the project is completed within the given time frame and meets all defined requirements.

In the AI-Based Placement Portal, project planning plays a crucial role in managing different stages of development such as requirement analysis, system design, implementation, testing, and deployment. Proper planning helps in maintaining a clear workflow and avoiding confusion during development.

The project is divided into multiple phases, each with specific tasks and objectives:

#### **1\. Requirement Analysis Phase**

* Understanding the problem and identifying user needs  
* Defining system requirements (functional and non-functional)  
* Studying existing placement systems and their limitations

#### **2\. System Design Phase**

* Designing system architecture and components  
* Preparing data flow diagrams and structure of the system  
* Planning modules such as authentication, dashboards, and AI features

#### **3\. Development Phase**

* Implementing the frontend using React  
* Creating components for different modules  
* Developing features such as login, job management, and application system  
* Integrating AI features and resume processing

#### **4\. Testing Phase**

* Performing functional testing of all features  
* Checking user interface and navigation  
* Validating data storage and retrieval  
* Testing AI features and system performance

#### **5\. Deployment Phase**

* Finalizing the project  
* Running the application in a browser environment  
* Ensuring the system is ready for demonstration or submission

The AI-Based Placement Portal project was developed in a structured and time-bound manner using the Program Evaluation and Review Technique (PERT). The following representation shows the sequence of activities, their dependencies, and progression from initial planning to final completion.

**START**  
↓

**Requirement Analysis (Week 1\)**  
• Identify user requirements (students and administrators)  
• Define project objectives and key features  
• Plan authentication system, job management, and data handling

↓

**System Design (Week 2\)**  
• Design system architecture and module structure  
• Define data flow and role-based access control  
• Plan integration of AI features and resume processing

↓

**Frontend Development (Week 3\)**  
• Develop UI using React components  
• Design layouts, responsiveness, and navigation  
• Implement routing and interactive features

↓

**Application Logic & Storage Setup (Week 4–5)**  
• Implement authentication using Context API  
• Develop job management and application system  
• Configure localStorage for data storage (users, jobs, applications)  
• Integrate resume upload and PDF processing  
• Implement AI features for resume analysis and interview questions

↓

**Integration & Testing (Week 6\)**  
• Integrate all modules and features  
• Test login, job application, and dashboard functionalities  
• Validate data storage and retrieval  
• Debug errors and improve performance

↓

**Implementation & Deployment (Week 7\)**  
• Run and finalize the project in browser environment  
• Perform final system verification and testing  
• Prepare system for demonstration

↓

**Documentation & Final Review (Week 8\)**  
• Prepare project report and documentation  
• Review system performance and features

↓

**END**

**PERT Chart Description**

| Task ID | Task Description | Duration (in Weeks) | Dependency |
| :---- | :---- | :---- | :---- |
| 1 | Requirement Analysis | 1 | — |
| 2 | System Design | 1 | Task 1 |
| 3 | Frontend Development (HTML, CSS, JavaScript) | 1 | Task 2 |
| 4 | Application Logic & Storage Setup (React, localStorage, PDF Parsing, AI Setup) | 2 | Task 3 |
| 5 | Integration & Testing | 1 | Task 4 |
| 6 | Implementation & Deployment | 1 | Task 5 |
| 7 | Documentation & Maintenance Planning | 1 | Task 6 |

**Critical Path**

**1 → 2 → 3 → 4 → 5 → 6 → 7**

This sequence represents the longest chain of dependent tasks in the project. It determines the minimum time required to complete the entire project, which is approximately **8 weeks**.

Any delay in these activities will directly impact the overall project timeline, making this path critical for successful and timely completion.

**CHAPTER 6: METHODOLOGY ADOPTED, SYSTEM IMPLEMENTATION AND DETAILS OF HARDWARE, SOFTWARE USED, SYSTEM MAINTENANCE & EVALUATION**

**Introduction**

The success of any software or web development project depends on a well-defined and systematic methodology. A clear development strategy ensures that each phase of the project is executed efficiently, maintains quality standards, and meets user requirements.

The AI-Based Placement Portal project follows a structured and phased development approach to ensure consistency, reliability, and proper integration of frontend, application logic, and data storage. Since the project includes dynamic functionalities using modern web technologies and AI-based features, careful planning and implementation were required to manage authentication, job handling, resume processing, and application management.

This chapter describes the methodology adopted, system implementation process, hardware and software requirements, and system maintenance and evaluation strategy. It explains how the system was developed step by step from requirement analysis to final deployment.

**Methodology Adopted**

The development of the AI-Based Placement Portal project was carried out using the **System Development Life Cycle (SDLC)** approach, specifically adopting the **Waterfall Model**.

The Waterfall Model was selected because it provides a clear and structured flow of development where each phase is completed before moving to the next. This model is suitable for academic projects as it ensures proper documentation, validation, and systematic progress.

**Phases of the Methodology**

#### **1\. Requirement Analysis**

• Collected and analyzed user requirements from students and administrators  
• Identified core functionalities such as user authentication, job management, application tracking, resume handling, and AI features  
• Defined both functional (job application, data handling) and non-functional (security, scalability, usability) requirements

#### **2\. System Design**

• Designed page layouts and structured navigation flow  
• Planned system architecture and modular components  
• Defined data flow and interaction between frontend and localStorage  
• Designed role-based access and dashboard functionalities  
• Planned integration of AI features and resume processing

#### **3\. Development / Implementation**

• Developed the frontend using React and JavaScript  
• Implemented authentication system using Context API  
• Used localStorage for data storage and management  
• Developed job management and application system  
• Implemented resume upload and PDF processing  
• Integrated AI features for resume analysis and interview question generation

#### **4\. Testing**

• Conducted functional testing for login, job application, dashboard operations, and data handling  
• Performed compatibility testing across browsers such as Chrome and Edge  
• Tested responsiveness across desktop and laptop devices  
• Verified AI features and resume processing functionality

#### **5\. Deployment**

• Executed the project in a browser environment for demonstration  
• Verified system performance and ensured all modules function correctly  
• Prepared the system for presentation

#### **6\. Maintenance and Updates**

• Planned updates to improve system features and user experience  
• Ensured proper data management and scalability for future enhancements  
• Maintained modular code structure for easy updates

**System Implementation**

System implementation refers to the process of converting the designed system into a fully functional web application. It involves developing individual modules, integrating them, and ensuring smooth interaction between all components.

In the AI-Based Placement Portal, each module such as Homepage, Authentication System, Student Dashboard, Admin Dashboard, Job Management, and AI Features was developed separately with clearly defined functionality.

After development, all modules were integrated into a unified system to ensure:

• Smooth navigation between pages using React Router  
• Secure user authentication and session management  
• Proper execution of job posting and application processes  
• Efficient data storage and retrieval using localStorage  
• Consistent user interface and design across all pages  
• Integration of AI features for resume analysis and interview preparation

Special attention was given to input validation, secure data handling, and efficient system performance to ensure reliability and a smooth user experience.

**Modules Implemented**

| Module | Description |
| :---- | :---- |
| **Homepage** | Introduces the Placement Portal with project name, tagline, and navigation links. Provides access to login and registration features. |
| **About Page** | Provides background, purpose, and objectives of the Placement Portal, highlighting its role in simplifying placement activities. |
| **Job Section** | Displays available placement drives with details such as company, role, salary, and deadline in a structured format. |
| **User Registration & Login** | Allows students to create accounts and log in securely. Manages authentication and session handling. |
| **Student Dashboard** | Enables students to view jobs, upload resumes, apply for placement drives, and track application status. |
| **Admin Dashboard** | Allows administrators to manage placement drives, view applications, and shortlist or reject candidates. |
| **Application Module** | Handles job applications and maintains application status such as pending, shortlisted, or rejected. |
| **Resume Module** | Allows students to upload resumes which are used for job applications. |
| **AI Features** | Provides resume analysis and generates interview questions to assist students in preparation. |
| **Footer Section** | Includes institutional details, copyright information, and navigation links. |

Each module was developed with a focus on clarity, responsiveness, cloud-based data integration, and a consistent design language to ensure a secure, user-friendly, and accessible experience.

**Details of Hardware Used**

| Hardware Component | Specification / Description |
| :---- | :---- |
| **Processor** | AMD Ryzen 9 |
| **RAM** | 32 GB DDR5 |
| **Storage** | 1 TB NVMe M.2 Gen 4  |
| **Monitor** | 27" OLED Display, 240 Hz Refresh Rate |
| **Input Devices** | Standard High-precision TMR keyboard and ergonomic optical mouse for efficient development workflow |
| **Internet Connection** | High-speed broadband connection (100 Mbps or higher) ensuring smooth development, testing, and API integration |
| **Server** | Local development environment with optimized browser runtime and support for scalable backend integration (future-ready architecture) |

**Details of Software Used**

| Software Category | Name / Tool | Purpose |
| :---- | :---- | :---- |
| **Operating System** | Windows 11 | Provides the development and testing environment for the project |
| **Front-End Technologies** | React, JavaScript, CSS | Used to design the user interface, build components, and handle interactivity |
| **Build Tool** | Vite | Used for fast development, bundling, and running the React application |
| **Data Storage** | localStorage | Acts as a mock database to store user data, job details, and applications |
| **AI Integration** | OpenRouter / OpenAI API | Used for resume analysis and generating interview questions |
| **PDF Processing** | PDF.js (pdfjs-dist) | Extracts text from uploaded PDF resumes for analysis |
| **Code Editor** | Visual Studio Code | Used for writing, editing, and debugging code |
| **Version Control**  | Git | Used for managing project versions and tracking changes |
| **Runtime Environment** | Web Browser (Chrome/Edge) | Used to run and test the application |

**System Maintenance**

System maintenance ensures that the AI-Based Placement Portal remains functional, secure, and up-to-date after deployment. Since the system uses client-side technologies and dynamic features such as AI integration and data handling through localStorage, regular maintenance is essential to maintain performance, data accuracy, and usability.

A combination of corrective, adaptive, and preventive maintenance strategies is adopted to ensure long-term stability and reliability of the system.

### **Types of Maintenance**

#### **1\. Corrective Maintenance:**

Fixing errors such as login issues, application bugs, data handling errors, or UI inconsistencies identified after deployment.

#### **2\. Adaptive Maintenance:**

Updating the system to align with new technologies, improving user interface design, enhancing AI features, and adding new functionalities based on user requirements.

#### **3\. Preventive Maintenance:**

Performing regular checks on system performance, improving code structure, and implementing updates to prevent future issues or system failures.

### **Maintenance Schedule**

• **Weekly:** Check login functionality, navigation flow, and job application process. Fix minor bugs if found.

• **Monthly:** Update job listings, review system performance, and improve UI if required.

• **Quarterly:** Perform performance testing, review data handling, and optimize system efficiency.

• **Annually:** Evaluate overall system performance, scalability, and plan future feature enhancements such as backend integration.

**System Evaluation**

System evaluation ensures that the AI-Based Placement Portal meets user requirements, performance standards, and design objectives. The evaluation is carried out through testing, validation, and user feedback.

The system was evaluated based on functionality, usability, performance, and reliability.

**Evaluation Criteria**

| Criteria | Evaluation Method / Result |
| :---- | :---- |
| **Functionality** | User registration, login authentication, job posting, application process, and dashboard operations work correctly; AI features such as resume analysis and interview question generation function properly |
| **Usability** | Simple navigation, clear menu structure, and user-friendly interface for both students and administrators |
| **Performance** | Fast loading speed and efficient data handling using React with smooth user interaction |
| **Design Aesthetics** | Consistent layout, clean UI design, and structured display of job listings and dashboards |
| **Security** | Secure authentication, input validation, and role-based access ensure data safety |
| **Data Integrity** | Accurate storage and retrieval of user data, job details, and application records using localStorage |
| **User Feedback** | Positive feedback regarding ease of use, organized structure, and helpful AI features |

**Outcome**

The AI-Based Placement Portal was successfully developed, implemented, and evaluated as an efficient and user-friendly system. The application is functionally stable, visually structured, secure, and technically reliable. It effectively simplifies placement management and enhances student preparation through intelligent features.

**CHAPTER 7: DETAILED LIFE CYCLE OF THE PROJECT**

**Introduction**

The development of any web-based application requires a systematic and structured approach to ensure successful implementation. A project’s life cycle defines all the key stages involved, from requirement analysis and system design to development, testing, deployment, and maintenance.

For the AI-Based Placement Portal, the Software Development Life Cycle (SDLC) methodology was adopted to ensure that each phase of development was clearly planned, properly executed, and thoroughly evaluated. This project includes dynamic functionality using modern web technologies along with AI-based features, making the system interactive and intelligent.

This chapter presents the detailed lifecycle of the Placement Portal system, covering ERD (Entity Relationship Diagram), DFD (Data Flow Diagram), input and output screen designs, system processes, data structure, testing methodologies, and test reports with code implementation.

Special emphasis is given to user authentication, job management, application handling, resume processing, and AI-based features, which are key components of the system.

Each stage was carried out systematically to achieve the final goal — the development of a secure, scalable, and user-friendly placement platform that simplifies recruitment processes and enhances student preparation.

**I. ENTITY RELATIONSHIP DIAGRAM (ERD)**

The Entity Relationship Diagram (ERD) illustrates how data entities are structured and interconnected within the system. In the AI-Based Placement Portal, the ERD represents the data model implemented using localStorage to manage users, jobs, and applications.

The ERD plays a crucial role in defining relationships between students, administrators, job postings, and applications, ensuring efficient data storage, retrieval, and management within the system.

**ERD Diagram**

USER ───────\< APPLICATION \>───── JOB  
│                   │  
│                   │  
└──────\< ADMIN\>───────────────

**Explanation:**

• **USER Entity:** Represents registered students who can log in, upload resumes, view job opportunities, and apply for placement drives.

• **JOB Entity:** Stores placement drive details such as company name, job role, description, salary, and deadline.

• **APPLICATION Entity:** Represents the relationship between users and jobs. It stores application details including resume, status (pending, shortlisted, rejected), and application date.

• **ADMIN Entity:** Represents authorized users who manage the system, including posting jobs, reviewing applications, and updating application status

**II. DATA FLOW DIAGRAM (DFD)**

The Data Flow Diagram (DFD) represents how data flows through the system — from user inputs to processing and final output. It helps in understanding how the system handles data, performs operations, and interacts with the data storage layer.

In the AI-Based Placement Portal, the DFD illustrates the functional flow of a dynamic system where user inputs are processed using React and JavaScript logic, and data is stored and retrieved from localStorage. AI features and resume processing are also integrated within the data flow.

**Context Level 1 DFD (Functional Flow)**

\[User\]  
↓  
→ (Input Module) – Collects user data such as registration details, login credentials, resume upload, and job applications  
↓  
→ (Processing Module) – Validates inputs, handles authentication, processes applications, and performs AI-based analysis   
↓  
→ (Data Storage Module) – Stores and retrieves data from localStorage (users, jobs, applications, resumes)   
↓  
→ (Application Module) – Manages job listings, applications, dashboards, and AI features   
↓  
→ (Output Module) – Displays results such as login success, job listings, application status, and AI feedback

### **Explanation:**

• **User:** Interacts with the system by registering, logging in, viewing jobs, uploading resumes, applying for jobs, and accessing AI-based features.

• **Input Module:** Collects user inputs through forms such as login, registration, resume upload, and job application forms.

• **Processing Module:** Validates user inputs, manages authentication, processes job applications, handles resume parsing, and performs AI-based analysis.

• **Data Storage Module:** Handles storage and retrieval of data using localStorage, including user data, job details, applications, and resume information.

• **Application Module:** Controls system functionalities such as dashboards, job management, application tracking, and AI features.

• **Output Module:** Displays processed results to the user, such as successful login, job listings, application status updates, and AI-generated feedback or interview questions.

**III. INPUT AND OUTPUT SCREEN DESIGN**

### **Input Design**

Input design determines how users enter or interact with information within the system. The goal is to ensure accuracy, security, and ease of use.

In the AI-Based Placement Portal, input design includes user authentication, resume upload, job application, job posting, and navigation features.

### **Key Input Screens:**

#### **1\. User Registration & Login Form:**

• Fields: Name, Email, Password  
• Features: Input validation and secure authentication with session handling  
• Purpose: Allows students and administrators to securely register and log in to the system

#### **2\. Resume Upload Form:**

• Fields: File Upload (PDF Resume)  
• Features: File validation, PDF processing, and data storage  
• Purpose: Enables students to upload resumes for job applications and AI analysis

#### **3\. Job Application Form:**

• Inputs: Apply button with resume attachment  
• Features: Prevents duplicate applications, validates resume availability  
• Purpose: Allows students to apply for placement drives

#### **4\. Job Posting Panel (Admin):**

• Fields: Job Title, Company Name, Description, Salary, Deadline  
• Features: Add and manage placement drives  
• Purpose: Allows administrators to create and manage job opportunities

#### **5\. Navigation Menu:**

• Inputs: Click actions for “Home,” “Login,” “Student Dashboard,” and “Admin Dashboard”  
• Purpose: Ensures smooth navigation and access to different system features

### **Output Design**

Output design defines how processed information is presented to the user. The system focuses on clarity, structured display, and dynamic content presentation to enhance user experience.

**Key Output Screens:**

### **Key Output Screens:**

#### **1\. Homepage:**

• Displays project introduction with navigation menu  
• Provides access to login and system features

#### **2\. Student Dashboard:**

• Displays available job listings  
• Shows application status (pending, shortlisted, rejected)  
• Displays resume upload status and AI feedback

#### **3\. Admin Dashboard:**

• Displays job postings and application details  
• Provides options to shortlist or reject candidates  
• Shows real-time updates of system data

#### **4\. Job Listings Page:**

• Displays job details such as company, role, salary, and deadline  
• Allows students to apply for jobs

#### **5\. AI Output (Feedback & Questions):**

• Displays resume analysis results  
• Shows AI-generated interview questions

#### **6\. Confirmation & Notification Messages:**

• Displays success or error messages for login, job application, and data operations

**IV. PROCESSES INVOLVED**

| Process | Description | Outcome |
| :---- | :---- | :---- |
| **Requirement Gathering** | Collecting and analyzing user and system requirements including authentication, job management, application handling, resume processing, and AI features | Clearly defined project objectives and system functionalities |
| **System Design** | Designing UI layouts, system architecture, modules, and data structure | Structured and scalable system ready for implementation |
| **Frontend Development** | Developing user interface using React, JavaScript, and CSS for responsive and interactive design | Visually consistent and user-friendly web interface |
| **Backend Development** | Implementing application logic using JavaScript, Context API, and AI integration for authentication, job handling, and resume analysis | Dynamic system with secure user interaction and efficient data handling |
| **Database Integration** | Configuring localStorage for storing users, jobs, applications, and resume data | Efficient data storage, retrieval, and real-time management |
| **Integration** | Integrating frontend with application logic and storage modules for seamless functionality | Fully integrated and interactive system |
| **Testing** | Verifying functionality, data operations, AI features, and responsiveness | Error-free, secure, and optimized web application |
| **Deployment** | Running the system in a browser environment for execution and demonstration | Fully functional system ready for use |

**V. METHODOLOGY USED FOR TESTING**

### **Testing Process**

Testing ensures that the system performs correctly, securely, and efficiently in real-time conditions. The AI-Based Placement Portal underwent multiple levels of testing to validate functionality, performance, and reliability.

### **1\. Unit Testing:**

• Tested individual modules such as user authentication (login/registration), job listing, application system, and resume upload  
• Verified that each component works independently without errors

### **2\. Integration Testing:**

• Verified proper interaction between frontend (React) and localStorage  
• Ensured smooth data flow between application logic and storage system

### **3\. System Testing:**

• Tested the complete system including dashboards, job applications, and AI features  
• Verified overall system performance and functionality

### **4\. Performance Testing:**

• Tested system responsiveness and loading speed  
• Ensured smooth user interaction without delays

### **5\. Security Testing:**

• Verified authentication system and role-based access control  
• Ensured secure handling of user data

### **Testing Tools Used**

• **Google Chrome Developer Tools** – Used for debugging, responsiveness testing, and performance analysis

• **React Developer Tools** – Used to inspect React components, state management, and application behavior

• **Visual Studio Code** – Used for debugging code, identifying errors, and testing during development

• **Browser Console (Chrome/Edge)** – Used for monitoring logs, detecting runtime errors, and validating application logic

• **PDF.js (pdfjs-dist)** – Used for testing and validating PDF resume parsing functionality

• **AI API (OpenRouter / OpenAI)** – Used to test resume analysis and interview question generation features

**VI. TEST REPORTS**

| Test Case ID | Module | Test Objective | Expected Result | Actual Result | Status |
| :---- | :---- | :---- | :---- | :---- | :---- |
| TC\_01 | Homepage | Verify navigation and content loading | All links work and pages load correctly | Working as expected | Pass |
| TC\_02 | Login & Registration | Validate user input and authentication | Users can register and login successfully | Working correctly | Pass |
| TC\_03 | Student Dashboard | Verify job listing and dashboard display | Jobs displayed properly with correct details | Functioning correctly | Pass |
| TC\_04 | Admin Dashboard | Test job posting and management | Admin can add and manage job listings | Working properly | Pass |
| TC\_05 | Job Application | Validate job application process | Students can apply for jobs without errors | Application successful | Pass |
| TC\_06 | Resume Upload | Test resume upload and storage | Resume uploaded and stored correctly | Working correctly | Pass |
| TC\_07 | AI Features | Verify resume analysis and question generation | AI provides feedback and interview questions | Functioning as expected | Pass |
| TC\_08 | Data Storage | Verify data storage and retrieval using localStorage | Data stored and retrieved correctly | Working properly | Pass |
| TC\_09 | Responsiveness | Test system across different devices | Layout adjusts properly on different screens | Fully responsive | Pass |

**VII. CODE SHEET AND SCREEN OUTPUTS**

The complete source code and design files of the AI-Based Placement Portal project are included in the Appendix section of the report.

They include:

• **index.html** – Entry file that loads the React application  
• **main.jsx** – Application entry point for rendering React components  
• **App.jsx** – Main component managing routing and overall structure  
• **components/** – Contains reusable UI components such as Navbar, Dashboard, and Forms  
• **pages/** – Includes pages such as Homepage, Login, Student Dashboard, and Admin Dashboard  
• **context/** – Handles authentication and global state management using Context API  
• **services/** – Contains logic for job management, application handling, and AI integration  
• **utils/** – Includes helper functions such as localStorage handling and PDF processing  
• **style.css / Tailwind CSS** – Handles styling, layout, and responsiveness  
• **localStorage** – Stores users, jobs, applications, and session data  
• **AI Integration (OpenRouter / OpenAI)** – Handles resume analysis and interview question generation  
• **PDF.js (pdfjs-dist)** – Used for extracting text from uploaded resumes

**CHAPTER 8: CODING AND SCREENSHOT OF THE PROJECT**

The following representative code snippets demonstrate the core modules and functionality of the **AI-Based Placement Portal**. These snippets focus on the essential logic of each subsystem and highlight how the application is implemented using modern web technologies.

### **1\. Entry Point**

The following code snippet shows the initialization of the React application with routing and global state management before rendering the main interface.

import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  \<StrictMode\>

    \<AuthProvider\>

      \<BrowserRouter\>

        \<App /\>

      \</BrowserRouter\>

    \</AuthProvider\>

  \</StrictMode\>

)

### 

### 

### 

### **2\. Routing Setup**

This snippet demonstrates role-based access control using a custom private route to safely separate the Admin and Student dashboards, preventing unauthorized access.

import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';

const PrivateRoute \= ({ children, roleRequired }) \=\> {

  const { user } \= useAuth();


  if (\!user) return \<Navigate to="/auth" /\>;

  if (roleRequired && user.role \!== roleRequired) return \<Navigate to="/" /\>;


  return children;

};

function App() {

  return (

    \<Routes\>

      \<Route path="/auth" element={\<Auth /\>} /\>

      \<Route path="/student/\*" element={

        \<PrivateRoute roleRequired="student"\>\<StudentDashboard /\>\</PrivateRoute\>

      } /\>

      \<Route path="/admin/\*" element={

        \<PrivateRoute roleRequired="admin"\>\<AdminDashboard /\>\</PrivateRoute\>

      } /\>

    \</Routes\>

  );

}

### 

### **3\. Authentication Logic**

The authentication functionality is securely handled by saving the logged-in user's details directly into the `localStorage` (browser storage), keeping the session active across page reloads.

// Inside AuthContext.jsx

const login \= async (email, password) \=\> {

    const userData \= await apiLogin(email, password);

    setUser(userData);

    

    // Persist session to local storage

    localStorage.setItem('placement\_session', JSON.stringify(userData));

    return userData;

};

const logout \= () \=\> {

    setUser(null);

    localStorage.removeItem('placement\_session');

};

### **4\. Job Management**

This functionality allows the Training and Placement Officer (Admin) to post a new placement drive to the platform and immediately updates the system.

// Inside AdminDashboard.jsx

const \[jobForm, setJobForm\] \= useState({ title: '', company: '', description: '', salary: '', deadline: '' });

const handlePostJob \= async (e) \=\> {

    e.preventDefault();

    

    // Save job details to localStorage (browser storage)

    await apiCreateJob(jobForm); 

    

    // Reset form and UI

    setJobForm({ title: '', company: '', description: '', salary: '', deadline: '' });

    setShowForm(false);

    

    loadData(); // Refresh active drives list

};

### **5\. Local Storage Structure Implementation**

The following example explicitly shows how application data like new job postings is written directly to the `localStorage` (browser storage) database without relying on external backend systems.

// Example localStorage usage

const jobs \= JSON.parse(localStorage.getItem("jobs")) || \[\];

jobs.push(newJob);

localStorage.setItem("jobs", JSON.stringify(jobs));

### **6\. Job Application**

The application submission code dictates how a student applies to a job, verifying first that they have properly uploaded a resume to the platform.

// Inside StudentDashboard.jsx

const applyToJob \= async (jobId) \=\> {

    if (\!user.resume) {

        setError("Please upload your resume first before applying.");

        return;

    }

    

    try {

        await apiApplyForJob(user.id, jobId, user.resume);

        setSuccess('Applied successfully\!');

        loadData(); // Refresh student applications

    } catch (err) {

        setError(err.message);

    }

};

### **7\. Resume Upload**

This code extracts the chosen document file and converts the PDF to a Base64 string format so it can be correctly stored under the student's profile.

// Inside StudentDashboard.jsx

const handleFileUpload \= async (e) \=\> {

    const file \= e.target.files\[0\];

    if (\!file || file.size \> 2 \* 1024 \* 1024\) return; // Max 2MB limit

    // Convert PDF file to Base64 String for local storage

    const base64 \= await new Promise((resolve, reject) \=\> {

        const reader \= new FileReader();

        reader.onload \= () \=\> resolve(reader.result);

        reader.onerror \= reject;

        reader.readAsDataURL(file);

    });

    const updatedUser \= await apiUpdateUserResume(user.id, base64);

    updateUserInContext({ resume: updatedUser.resume });

};

### **8\. AI Analysis Feature**

The AI integration code contacts the GPT-4o-mini model to compare the details extracted from the student's resume against the requirements of active job postings.

// AI integration handling logic

const handleGenerateInsights \= async (extractedResumeText, jobs) \=\> {

    try {

        setAiLoading(true);

        

        // Fetch AI analysis matching the student's resume against active jobs

        const insights \= await getAiResumeInsights({

            resumeText: extractedResumeText,

            jobs: jobs,

            apiKey: import.meta.env.VITE\_AI\_API\_KEY

        });

        

        setAiFeedback(insights); // Update dashboard UI with scores & matches

    } catch (err) {

        console.error("AI Analysis failed:", err);

    } finally {

        setAiLoading(false);

    }

};

### 

### **9\. PDF Data Extraction (Resume Parsing)**

This snippet demonstrates how the system extracts text from uploaded PDF resumes using the **pdfjs-dist** library. The extracted text is later used for AI-based analysis and evaluation.

// Inside resumeParser.js

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

export const extractTextFromPdfFile \= async (file) \=\> {

  const arrayBuffer \= await file.arrayBuffer();

  const data \= new Uint8Array(arrayBuffer);

  const loadingTask \= getDocument({ data });

  const pdf \= await loadingTask.promise;

  const pageTexts \= \[\];

  // Loop through all pages of the PDF

  for (let pageNumber \= 1; pageNumber \<= pdf.numPages; pageNumber \+= 1\) {

    const page \= await pdf.getPage(pageNumber);

    const textContent \= await page.getTextContent();

    // Extract strings and normalize whitespace

    const lines \= textContent.items

      .map(item \=\> item.str || '')

      .join(' ')

      .replace(/\\s+/g, ' ')

      .trim();

    if (lines) pageTexts.push(lines);

  }

  return pageTexts.join('\\n\\n').trim();

};

### **10\. Mock Database Initialization (Seeding Data)**

This function initializes the **localStorage (browser storage)** with default users and job data when the application loads for the first time. It simulates a backend database environment.

// Inside storage.js

export const initializeStorageData \= () \=\> {

  // Seed default users if database is empty

  if (getStorageItem(USERS\_KEY).length \=== 0\) {

    setStorageItem(USERS\_KEY, \[

      { id: 'u1', name: 'Admin TPO', email: 'admin@college.edu', role: 'admin' },

      { id: 'u2', name: 'Student', email: 'student@college.edu', role: 'student', resume: null }

    \]);

  }

  // Seed default job postings

  const existingJobs \= getStorageItem(JOBS\_KEY);

  if (existingJobs.length \=== 0\) {

    setStorageItem(JOBS\_KEY, \[

      { id: 'j1', title: 'Software Engineer', company: 'Google', salary: '30 LPA' },

      { id: 'j2', title: 'Data Analyst', company: 'Amazon', salary: '20 LPA' }

    \]);

  }

  // Initialize applications storage

  if (getStorageItem(APPS\_KEY).length \=== 0\) {

    setStorageItem(APPS\_KEY, \[\]);

  }

};

### **11\. AI Prompt Construction (Prompt Engineering)**

This snippet shows how the system constructs a structured prompt for the AI model. The prompt ensures that the AI returns a well-formatted JSON response containing resume evaluation and job matching results.

// Inside aiResumeAdvisor.js

const buildPrompt \= (resumeText, jobsCompact) \=\> \[

  'You are an ATS and placement mentor.',

  'Return ONLY valid JSON with fields: rating (0-100), summary, strengths\[\], improvements\[\], matches\[\].',

  'Each matches\[\] item must include: jobId, score (0-100), reason.',

  'Do not include markdown. Keep reasons concise and practical.',

  '',

  \`Resume Text:\\n${resumeText}\`,

  '',

  \`Jobs Openings:\\n${JSON.stringify(jobsCompact)}\`

\].join('\\n');

### **12\. Simulated Network Latency (UX Enhancement)**

This snippet introduces an artificial delay in API-like functions to simulate real-world network latency. It helps in testing loading states such as spinners and improving user experience.

// Inside storage.js

// Simulated generic delay to mimic real network latency

const delay \= (ms \= 500\) \=\> new Promise(resolve \=\> setTimeout(resolve, ms));

export const apiLogin \= async (email, password) \=\> {

  await delay(); // Artificial pause before checking local storage


  const users \= getStorageItem(USERS\_KEY);

  const user \= users.find(u \=\> u.email \=== email && u.password \=== password);

  if (\!user) throw new Error("Invalid credentials");


  const { password: \_, ...safeUser } \= user;

  return safeUser;

};

### **13\. Resilient AI Output Parsing**

This utility ensures that AI responses are safely parsed into valid JSON. It handles cases where the AI wraps responses inside markdown code blocks, preventing application errors.

// Inside aiResumeAdvisor.js

const extractJsonBlock \= (text \= '') \=\> {

  // First, try parsing directly in case it's clean

  if (tryParseJson(text)) return tryParseJson(text);

  // If it's wrapped in a markdown fenced code block (\`\`\`json...\`\`\`)

  const fenced \= text.match(/\`\`\`json\\s\*(\[\\s\\S\]\*?)\`\`\`/i);

  if (fenced?.\[1\]) return tryParseJson(fenced\[1\].trim());

  // Fallback: strictly extract the first and last brace

  const firstBrace \= text.indexOf('{');

  const lastBrace \= text.lastIndexOf('}');

  if (firstBrace \!== \-1 && lastBrace \!== \-1 && lastBrace \> firstBrace) {

    return tryParseJson(text.slice(firstBrace, lastBrace \+ 1));

  }

  return null;

};

### **14\. File Reconstruction & Download Action**

This function allows administrators to download student resumes by converting stored Base64 data back into a file and triggering a download action in the browser.

// Inside AdminDashboard.jsx

const downloadBase64File \= (base64String, fileName) \=\> {

    // Create a temporary anchor element

    const link \= document.createElement("a");

    link.href \= base64String;

    link.download \= fileName;

    

    // Trigger download and clean up

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

};

### **15\. Fallback Ranking Algorithm (Local Execution)**

This snippet defines a backup scoring system that evaluates resumes locally when the AI service is unavailable. It calculates a score based on detected skills and resume content.

// Inside storage.js

const KNOWN\_SKILLS \= \[

  'javascript', 'react', 'node', 'python', 'java', 'sql', 'docker'

\];

const extractSkills \= (text \= '') \=\> {

  const normalized \= text.toLowerCase();

  return KNOWN\_SKILLS.filter(skill \=\> normalized.includes(skill));

};

const buildResumeRating \= (resumeText, hasResumeFile) \=\> {

  const text \= (resumeText || '').trim();

  const skills \= extractSkills(text);

  let score \= 0;

  if (hasResumeFile) score \+= 25; // Base score


  // Score based on resume length and skill matches

  score \+= Math.min(25, Math.max(0, Math.floor(text.length / 25)));

  score \+= Math.min(50, skills.length \* 5);

  return score;

};

**CHAPTER 9: CONCLUSION AND FUTURE SCOPE**

**Conclusion**

The AI-Based Placement Portal project has been a comprehensive and practical step toward digitizing and simplifying the placement process in educational institutions. In today’s competitive environment, students require efficient access to job opportunities, structured application systems, and proper guidance for interview preparation. However, traditional placement systems are often unorganized and lack intelligent support.

This project successfully addresses these challenges by developing a centralized, web-based platform that connects students and administrators in an organized and interactive manner. Unlike traditional systems, the Placement Portal integrates modern web technologies with Artificial Intelligence to provide not only job management but also intelligent assistance such as resume analysis and interview question generation.

The system acts as a digital bridge between students and recruiters by enabling features such as secure user authentication, job posting, application tracking, resume handling, and AI-based feedback. Students can easily explore job opportunities, apply for positions, and improve their preparation, while administrators can efficiently manage placement drives and candidate selection.

Developed using React and JavaScript for the frontend, along with localStorage for data management, the system ensures responsive design, efficient performance, and simplified data handling without requiring a backend server. The integration of AI features further enhances the system by providing intelligent insights and preparation support.

Through systematic implementation using the Software Development Life Cycle (SDLC) approach, the project successfully achieved its objectives — from requirement analysis and system design to development, testing, and evaluation.

The structured design, user-friendly interface, secure access control, and intelligent features make the system reliable and suitable as a major academic project. Beyond technical implementation, the project enhances digital placement management and supports students in improving their career readiness.

By combining web development concepts, client-side data management, and AI integration, this project demonstrates how technology can improve the placement experience and make it more efficient, accessible, and intelligent.

Thus, the AI-Based Placement Portal fulfills its objective of simplifying placement processes and enhancing student preparation in a modern digital environment.

### **Future Scope**

The AI-Based Placement Portal has strong potential for further development and expansion beyond its current implementation. With advancements in web technologies, Artificial Intelligence, and data analytics, the system can evolve into a more powerful and scalable placement management platform.

The following are possible directions for future enhancement:

#### **1\. Advanced AI-Based Resume Evaluation**

• Integrate more advanced AI models to provide detailed resume scoring and improvement suggestions  
• Use Natural Language Processing (NLP) to match resumes with job requirements more accurately

#### **2\. Real-Time Backend Integration**

• Replace localStorage with backend technologies such as Node.js and databases like MongoDB or MySQL  
• Enable real-time data storage, multi-user access, and scalability

#### **3\. Job Recommendation System**

• Implement personalized job recommendations based on student skills, interests, and previous applications  
• Use AI algorithms to improve job matching accuracy

#### **4\. Mobile Application Development**

• Develop Android and iOS applications for better accessibility  
• Provide features like notifications, job alerts, and application tracking on mobile devices

#### **5\. Notification System**

• Implement email or in-app notifications for job updates, application status, and deadlines  
• Improve communication between students and administrators

#### **6\. Advanced Analytics Dashboard**

• Provide analytics for administrators to track placement statistics, student performance, and application trends  
• Help in better decision-making and planning

#### **7\. Multi-User Role Expansion**

• Introduce additional roles such as recruiters and company representatives  
• Allow companies to directly post jobs and review applications

#### **8\. Interview Preparation Module**

• Expand AI features to include mock interviews, real-time feedback, and performance analysis  
• Provide interactive preparation tools for students

#### **9\. Security Enhancements**

• Implement stronger authentication mechanisms such as JWT and encryption  
• Improve data security and user privacy

**CHAPTER 10: REFERENCES**

### **Books and Study Material**

• Software Engineering — Ian Sommerville, Pearson Education  
• Software Engineering: A Practitioner’s Approach — Roger S. Pressman,    McGraw-Hill Education  
• Systems Analysis and Design — Gary B. Shelly and Harry J. Rosenblatt, Course Technology  
• Programming the World Wide Web — Robert W. Sebesta, Pearson Education  
• Web Programming: Building Internet Applications — Chris Bates, Wiley India Pvt. Ltd.

### **Websites and Online Sources**

• W3Schools — Reference for HTML, CSS, JavaScript, and React basics  
• GeeksforGeeks — For understanding SDLC, React concepts, and data structures  
• TutorialsPoint — For software engineering and web development concepts  
• MDN Web Docs — For JavaScript and browser API references  
• OpenAI / OpenRouter — For AI-based resume analysis and interview question generation  
• React Documentation — For building the frontend application  
• Vite Documentation — For project setup and development  
• PDF.js — For extracting text from resumes  
• Canva — For designing visual elements  
• Figma — For interface design and planning

---

### **Research and Reference Articles**

• “Artificial Intelligence in Recruitment Systems and Resume Screening” — International Journal of Computer Applications, 2023  
• “Web-Based Placement Management Systems in Educational Institutions” — IEEE Access, 2024  
• “Impact of AI on Career Development and Hiring Processes” — Journal of Information Technology, 2022  
• “Modern Web Applications Using React and Client-Side Technologies” — Elsevier Publications, 2023

**Tools and Software Used**

| Category | Tool / Platform | Purpose |
| :---- | :---- | :---- |
| **Design & Development** | Visual Studio Code | Frontend development and scripting (React, JavaScript, CSS) |
| **Front-End Framework** | React | Building interactive user interface and components |
| **Build Tool** | Vite | Fast development server and project bundling |
| **Data Storage** | localStorage | Storing user data, job details, and applications |
| **AI Integration** | OpenRouter / OpenAI API | Resume analysis and interview question generation |
| **Runtime Environment** | Web Browser (Chrome/Edge) | Running and testing the application |
| **Graphic Design** | Canva, Figma | UI design and visual elements |
| **Web Browser** | Google Chrome, Microsoft Edge | Testing and debugging |
| **Validation Tools** | Browser Console / DevTools | Validating JavaScript logic and debugging |
| **Testing Tools** | Chrome DevTools | Responsiveness, debugging, and performance testing |

