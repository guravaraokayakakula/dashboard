# Employee Management Dashboard 

# Project Overview
Employee Management Dashboard is a React-based web application that allows users to manage employee records through a clean and modern UI.  
The application supports authentication (mock login), employee CRUD operations (Add / Edit / Delete), profile image upload with preview, search & filter functionality, and employee printing.

This project was developed in a real-time project scenario using React + Bootstrap.

---

#Features Implemented

# Step 1: Authentication
- Login Page with mock authentication
- Valid credentials:
  - Username: **admin**
  - Password: **admin**
- After successful login, user is redirected to Dashboard
- Dashboard access is restricted without login (Private Route)


---

# Step 2: Employee Management Dashboard
## Dashboard Summary
- Total Employees count
- Active Employees count
- Inactive Employees count

##Employee Form (Add / Edit)
- Fields:
  - Full Name
  - Gender
  - Date of Birth (DOB)
  - State (Dropdown)
  - Active/Inactive Toggle
  - Profile Image upload (image picker)
- Image preview before save 
- Form validation 
- Same form used for Add and Edit 
- After Update, form resets back to Add mode 

## Employee List Table
- Columns:
  - Employee ID (EMP001 format)
  - Profile Image
  - Full Name
  - Gender
  - DOB
  - State
  - Active/Inactive Toggle
  - Actions: Edit / Delete / Print
- Delete confirmation popup 
- Print employee details 
- Empty state message when no results found 

---

# 🔍 Search & Filter
- Search employees by name
- Filter by:
  - Gender
  - Active/Inactive Status
- Filters work together (combined filtering) 
- Reset button clears search + filters 
- Empty state shown if no employee matches search/filter 

---

# Tech Stack Used
- **React.js** (Frontend UI framework)
- **JavaScript (ES6+)**
- **HTML5**
- **Bootstrap 5** (UI styling)
- **React Router DOM** (Routing & protected routes)

---

## Steps to Run the Project Locally

## 1. Clone the repository
```bash
git clone <your-repo-url>

2. Go to project folder
cd employee-dashboard

3. Install dependencies
npm install

4. Run application
npm start

5. Open in Browser
http://localhost:3000

# Assumptions / Design Decisions

1.Mock Authentication
-> Backend is not required, login is mocked with admin/admin
-> Auth state is stored in localStorage

2.Employee ID Generation
-> Employee IDs are generated in professional format: EMP001, EMP002, etc.
-> Helps maintain clean UI and real-time project standard

3.Data Storage
-> Employee data is stored in React state (in-memory)
-> Can be extended to localStorage / REST API / JSON server easily

4.Profile Image Handling
-> Uploaded image is converted to base64 and stored in employee object
->Preview shown before saving the employee

5.UI/UX
-> Built with clean modern UI using Bootstrap and custom spacing
-> Loading + empty states handled gracefully
