<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microservices Deployment Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #333;
        }
        h1 {
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
        }
        h2 {
            margin-top: 30px;
        }
        h3 {
            margin-top: 20px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: auto;
        }
        ul {
            list-style-type: square;
            padding-left: 20px;
        }
    </style>
</head>
<body>
    <h1>Microservices Deployment Guide</h1>

    <h2>Overview</h2>
    <p>This document outlines the steps to deploy three microservices (frontend, notes, and search) and a MySQL database on Google Cloud Platform (GCP). The frontend service comprises static HTML, CSS, and JavaScript files, while the notes and search services are Spring Boot applications. This guide includes instructions for setting up VMs, configuring firewall rules, deploying the applications, and setting up the MySQL database.</p>

    <h2>Microservices Architecture</h2>
    <ul>
        <li><strong>Frontend:</strong> Serves static content (HTML, CSS, JavaScript) on port 8080.</li>
        <li><strong>Notes:</strong> Spring Boot backend application.</li>
        <li><strong>Search:</strong> Spring Boot application for search functionality.</li>
        <li><strong>MySQL:</strong> Database server for data persistence.</li>
    </ul>

    <h2>Prerequisites</h2>
    <ul>
        <li>A Google Cloud Platform (GCP) account with billing enabled.</li>
        <li>Basic knowledge of GCP services such as Compute Engine and VPC networks.</li>
        <li>Familiarity with Spring Boot, Maven, and MySQL.</li>
    </ul>

    <h2>Step-by-Step Deployment Guide</h2>

    <h3>1. Set Up Virtual Machines (VMs) on GCP</h3>
    <p>Create four Compute Engine VMs on GCP:</p>
    <ul>
        <li><strong>frontend-vm:</strong> For serving the frontend application.</li>
        <li><strong>notes-vm:</strong> For the notes microservice.</li>
        <li><strong>search-vm:</strong> For the search microservice.</li>
        <li><strong>mysql-vm:</strong> For the MySQL database.</li>
    </ul>

    <h3>2. Configure Firewall Rules</h3>
    <p>Set up firewall rules in your GCP project to allow communication between the VMs:</p>
    <ul>
        <li>Allow internal traffic between <code>notes-vm</code>, <code>search-vm</code>, and <code>mysql-vm</code>.</li>
        <li>Allow inbound traffic to <code>frontend-vm</code> on port 8080 to make the frontend accessible publicly.</li>
    </ul>

    <h3>3. Deploy the Frontend Application</h3>
    <ol>
        <li><strong>SSH into <code>frontend-vm</code>.</strong></li>
        <li><strong>Install Python:</strong>
            <pre><code>sudo apt update
sudo apt install python3 python3-pip</code></pre>
        </li>
        <li><strong>Create a directory for the frontend files:</strong>
            <pre><code>mkdir /var/www/frontend
cd /var/www/frontend</code></pre>
        </li>
        <li><strong>Upload your HTML, CSS, and JavaScript files to <code>/var/www/frontend</code>.</strong></li>
        <li><strong>Create a simple Python server:</strong>
            <pre><code>python3 -m http.server 8080</code></pre>
        </li>
        <li><strong>Run the server in the background:</strong>
            <pre><code>nohup python3 -m http.server 8080 &</code></pre>
        </li>
    </ol>

    <h3>4. Deploy the Notes and Search Microservices</h3>
    <ol>
        <li><strong>Build the Spring Boot applications:</strong>
            <pre><code>mvn install -DskipTests</code></pre>
        </li>
        <li><strong>SSH into <code>notes-vm</code> and <code>search-vm</code>.</strong></li>
        <li><strong>Upload the JAR files to the respective VMs using the GCP SSH console.</strong></li>
        <li><strong>Run the JAR files as background processes:</strong>
            <pre><code>nohup java -jar your-application.jar &</code></pre>
            <p>Replace <code>your-application.jar</code> with the actual name of your JAR file.</p>
        </li>
    </ol>

    <h3>5. Set Up the MySQL Database</h3>
    <ol>
        <li><strong>SSH into <code>mysql-vm</code>.</strong></li>
        <li><strong>Install MySQL:</strong>
            <pre><code>sudo apt update
sudo apt install mysql-server</code></pre>
        </li>
        <li><strong>Secure MySQL installation:</strong>
            <pre><code>sudo mysql_secure_installation</code></pre>
        </li>
        <li><strong>Configure MySQL:</strong>
            <p>Create a database and user for your applications.</p>
            <pre><code>sudo mysql -u root -p
CREATE DATABASE your_database_name;
CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_user'@'%';
FLUSH PRIVILEGES;
EXIT;</code></pre>
            <p>Replace <code>your_database_name</code>, <code>your_user</code>, and <code>your_password</code> with your actual database name, username, and password.</p>
        </li>
    </ol>

    <h3>6. Configure Internal IP Addresses</h3>
    <p>Ensure that the <code>notes</code> and <code>search</code> microservices are configured to communicate with the MySQL database using the internal IP address of the <code>mysql-vm</code>.</p>

    <h3>7. Access the Frontend</h3>
    <p>Open your web browser and navigate to the external IP address of the <code>frontend-vm</code> on port 8080 (e.g., <code>http://your_external_ip:8080</code>).</p>

    <h2>Troubleshooting</h2>
    <ul>
        <li><strong>Firewall Issues:</strong> Ensure that the firewall rules are correctly configured to allow traffic between the VMs.</li>
        <li><strong>Application Errors:</strong> Check the application logs for any errors.</li>
        <li><strong>Database Connection:</strong> Verify that the microservices can connect to the MySQL database using the correct credentials and internal IP address.</li>
    </ul>

</body>
</html>
