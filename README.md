
# Zenara: Preventing Child Abuse

![image](https://github.com/user-attachments/assets/d4c6fb76-db90-4520-b3a0-4b4e27081105)



Zenara is a cutting-edge platform designed to prevent and address child abuse through advanced monitoring, reporting, and awareness tools. The application combines a React.js frontend with a Java-based  to offer a seamless and responsive user experience.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction
Zenara is dedicated to preventing child abuse by providing a safe space for reporting, tracking potential signs, and educating parents, guardians, and educators about child safety. The app offers intuitive reporting and alert features, helping the community take immediate action.

## Features
- **Anonymous Reporting**: Allows individuals to report suspected cases of abuse anonymously.
- **Monitoring Tools**: Keeps track of behavior and warning signs, providing insights to prevent harm.
- **Awareness & Education**: A knowledge base that educates users on identifying and preventing child abuse.
- **Real-time Alerts**: Sends notifications to responsible authorities when a case is flagged.
- **Secure and Private**: Ensures all user data is securely handled and kept confidential.

## Technology Stack

### Frontend
- **React.js**: A powerful JavaScript library for building user interfaces.
- **Tailwind CSS**: For styling and creating responsive, modern UI components.

### Backend
- **Java (Spring Boot)**: Used to handle API requests, process data, and ensure the security and scalability of the application.
- **MySQL / PostgreSQL**: A robust relational database to manage user data, reports, and resources.
  
### Other Tools
- **JWT (JSON Web Tokens)**: For secure authentication and session management.
- **RESTful APIs**: To connect the frontend and backend seamlessly.

## Installation

### Prerequisites
- Node.js and npm installed for the frontend.
- Java JDK and Maven installed for the backend.
- A running instance of MySQL or PostgreSQL.

### Backend Setup
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/zenara-backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd zenara-backend
   ```
3. Set up the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/zenara
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```
4. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/your-username/zenara-frontend.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd zenara-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
5. Visit `http://localhost:3000` in your browser to view the app.

## Usage
- **Reporting**: Users can submit reports of suspected abuse through an easy-to-use form.
- **Dashboard**: Authorized personnel can view reports, track progress, and provide support.
- **Educational Content**: Available in the knowledge section, aimed at raising awareness about child safety.

## Contributing
Contributions are welcome! Whether it’s a bug fix, new feature, or an enhancement, we’d love to work with the community.

To contribute:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
Zenara is licensed under the MIT License. See [LICENSE](./LICENSE) for more details.

---

Feel free to modify the content based on specific details or additional features you want to highlight.
