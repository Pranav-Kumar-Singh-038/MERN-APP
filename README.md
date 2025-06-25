# Full Stack MERN Application Deployment on EC2

This guide walks you through the process of setting up and deploying a full stack MERN application on an AWS EC2 instance. It covers connecting to your instance via SSH, installing necessary dependencies, running the backend and frontend, and notes for local development.

## Step 1: Connect to EC2 via SSH

Once your EC2 instance is launched and running:

Use the following command to connect to your instance from your local machine:

```bash
ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
````

Replace `your-key.pem` with the name of your private key file, and `<your-ec2-public-ip>` with your actual EC2 IP address.

## Step 2: Install Node.js and Git

After connecting to your EC2 instance, run the following commands to install Node.js and Git:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git
```

## Step 3: Clone the Application Repository

```bash
git clone https://github.com/Pranav-Kumar-Singh-038/MERN-APP.git
cd MERN-APP
```

## Step 4: Backend Setup

Navigate to the backend directory, install dependencies, and start the server in the background:

```bash
cd backend
npm install
nohup node server.js > server.log 2>&1 &
```

If running **locally**, you can use:

```bash
node server.js
```

## Step 5: Frontend Setup

In the same EC2 instance (or a **new SSH session**), build and run the frontend:

```bash
cd frontend
npm install
npm run build
npm install -g serve
nohup serve -s dist -l 5173 > serve.log 2>&1 &
```

If running **locally**, you can use:

```bash
npm run dev
```

## Step 6: Update API Endpoint in App.jsx

In your `frontend/src/App.jsx` file, there is a fetch call like this:

```javascript
await fetch('http://<ec2_ip_of_backend>:3000/tasks', {
```

You must replace `<ec2_ip_of_backend>` with:

* Your actual EC2 IP (e.g. `http://35.54.1437.47:3000`) when deploying on the cloud
* `http://localhost:3000` when running the app locally

Make sure both the backend and frontend can communicate through public IPs and open ports.

## Notes

* Make sure port 3000 (for backend) and 5173 (for frontend) are open in your EC2 instance's Security Group.
* You can check if the services are running by visiting `http://<ec2-ip>:5173` for the frontend and using tools like Postman or the browser console to confirm backend responses.


