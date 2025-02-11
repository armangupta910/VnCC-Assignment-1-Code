# Microservices Deployment Guide

## Overview

This document outlines the steps to deploy three microservices (frontend, notes, and search) and a MySQL database on Google Cloud Platform (GCP). The frontend service comprises static HTML, CSS, and JavaScript files, while the notes and search services are Spring Boot applications. This guide includes instructions for setting up VMs, configuring firewall rules, deploying the applications, and setting up the MySQL database.

## Microservices Architecture

- **Frontend:** Serves static content (HTML, CSS, JavaScript) on port 8080.
- **Notes:** Spring Boot backend application.
- **Search:** Spring Boot application for search functionality.
- **MySQL:** Database server for data persistence.

## Prerequisites

- A Google Cloud Platform (GCP) account with billing enabled.
- Basic knowledge of GCP services such as Compute Engine and VPC networks.
- Familiarity with Spring Boot, Maven, and MySQL.

## Step-by-Step Deployment Guide

### 1. Set Up Virtual Machines (VMs) on GCP

Create four Compute Engine VMs on GCP:

- **frontend-vm:** For serving the frontend application.
- **notes-vm:** For the notes microservice.
- **search-vm:** For the search microservice.
- **mysql-vm:** For the MySQL database.

### 2. Configure Firewall Rules

Set up firewall rules in your GCP project to allow communication between the VMs:

- Allow internal traffic between `notes-vm`, `search-vm`, and `mysql-vm`.
- Allow inbound traffic to `frontend-vm` on port 8080 to make the frontend accessible publicly.

### 3. Deploy the Frontend Application

1.  **SSH into `frontend-vm`.**
2.  **Install Python:**

    ```
    sudo apt update
    sudo apt install python3 python3-pip
    ```
3.  **Create a directory for the frontend files:**

    ```
    mkdir /var/www/frontend
    cd /var/www/frontend
    ```
4.  **Upload your HTML, CSS, and JavaScript files to `/var/www/frontend`.**
5.  **Create a simple Python server:**

    ```
    python3 -m http.server 8080
    ```
6.  **Run the server in the background:**

    ```
    nohup python3 -m http.server 8080 &
    ```

### 4. Deploy the Notes and Search Microservices

1.  **Build the Spring Boot applications:**

    ```
    mvn install -DskipTests
    ```
2.  **SSH into `notes-vm` and `search-vm`.**
3.  **Upload the JAR files to the respective VMs using the GCP SSH console.**
4.  **Run the JAR files as background processes:**

    ```
    nohup java -jar your-application.jar &
    ```

    Replace `your-application.jar` with the actual name of your JAR file.

### 5. Set Up the MySQL Database

1.  **SSH into `mysql-vm`.**
2.  **Install MySQL:**

    ```
    sudo apt update
    sudo apt install mysql-server
    ```
3.  **Secure MySQL installation:**

    ```
    sudo mysql_secure_installation
    ```
4.  **Configure MySQL:**

    Create a database and user for your applications.

    ```
    sudo mysql -u root -p
    CREATE DATABASE your_database_name;
    CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_user'@'%';
    FLUSH PRIVILEGES;
    EXIT;
    ```

    Replace `your_database_name`, `your_user`, and `your_password` with your actual database name, username, and password.

### 6. Configure Internal IP Addresses

Ensure that the `notes` and `search` microservices are configured to communicate with the MySQL database using the internal IP address of the `mysql-vm`.

### 7. Access the Frontend

Open your web browser and navigate to the external IP address of the `frontend-vm` on port 8080 (e.g., `http://your_external_ip:8080`).

## Troubleshooting

- **Firewall Issues:** Ensure that the firewall rules are correctly configured to allow traffic between the VMs.
- **Application Errors:** Check the application logs for any errors.
- **Database Connection:** Verify that the microservices can connect to the MySQL database using the correct credentials and internal IP address.
