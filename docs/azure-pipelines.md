Here’s a professional and well-structured GitHub documentation (`azure-pipelines.md`) you can add to your **employee app** repo to describe the **CI/CD process using Azure Pipelines and AWS SSM + S3**:

---

# 🚀 Azure CI/CD Pipeline for Employee React App (via AWS SSM + S3)

This document describes how we implement CI/CD for the Employee React App using:

* **Azure Pipelines (CI/CD)**
* **AWS S3** for storing deployment artifacts
* **AWS SSM** for remote instance deployment
* **PM2** and **NGINX** for process and web server management

---

## 🔧 Azure DevOps Library Setup

### 📁 Variable Group: `aws-ssm-secrets`

| Name                    | Value                 |
| ----------------------- | --------------------- |
| `AWS_ACCESS_KEY_ID`     | (your access key)     |
| `AWS_SECRET_ACCESS_KEY` | (your secret key)     |
| `AWS_REGION`            | `ap-south-1`          |
| `EC2_INSTANCE_ID`       | `i-0ea343a8c6dc009a8` |
| `S3_BUCKET_NAME`        | `react-fullstack-s3`  |

---

## ✅ Azure CI Pipeline (Continuous Integration)

This pipeline builds the frontend, creates a tarball, and uploads it to S3.

### 🧩 Linked Variable Group:

Make sure the CI pipeline links the `aws-ssm-secrets` variable group.

### 🏗️ Pipeline Tasks

#### **Task 1: Install Frontend Dependencies**

```bash
npm install
```

---

#### **Task 2: Build React Frontend**

```bash
npm run build
```

---

#### **Task 3: Package Full Repo (excluding .git and node\_modules)**

```bash
mkdir -p deploy-package
shopt -s dotglob
for item in * .[^.]*; do
  if [[ "$item" != "deploy-package" && "$item" != ".git" && "$item" != "node_modules" ]]; then
    cp -r "$item" deploy-package/
  fi
done
cd deploy-package
tar -czf ../employee-frontend-deploy.tar.gz .
```

---

#### **Task 4: Debug Environment Variables**

```bash
echo "Using AWS Region: $(AWS_REGION)"
echo "Using S3 Bucket: $(S3_BUCKET_NAME)"
aws configure list
aws sts get-caller-identity
```

---

#### **Task 5: Upload `.tar.gz` to S3**

```bash
#!/bin/bash

AWS_REGION=$(AWS_REGION)
S3_BUCKET=$(S3_BUCKET_NAME)

aws s3 cp employee-frontend-deploy.tar.gz \
  "s3://$S3_BUCKET/deployment/employee-frontend/employee-frontend-deploy.tar.gz" \
  --region "$AWS_REGION"
```

---

## 🚀 Azure CD Pipeline (Continuous Deployment)

This pipeline downloads the package from S3 and uses **AWS SSM** to trigger a remote deployment script on the EC2 instance.

---

### 🧩 Linked Variable Group:

Ensure the same `aws-ssm-secrets` variable group is linked to this release pipeline.

### 💡 Environment Variables

Add these variables to the environment in the release pipeline:

```bash
AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID)
AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY)
AWS_REGION=$(AWS_REGION)
S3_BUCKET_NAME=$(S3_BUCKET_NAME)
```

---

### 📦 Task 1: Download and Extract from S3

```bash
aws configure set aws_access_key_id $(AWS_ACCESS_KEY_ID)
aws configure set aws_secret_access_key $(AWS_SECRET_ACCESS_KEY)
aws configure set region $(AWS_REGION)

mkdir -p /tmp/frontend-deploy
aws s3 cp s3://$(S3_BUCKET_NAME)/deployment/employee-frontend/employee-frontend-deploy.tar.gz /tmp/
tar -xzf /tmp/employee-frontend-deploy.tar.gz -C /tmp/frontend-deploy
```

---

### 🔄 Task 2: Remote EC2 Deployment via SSM

```bash
aws ssm send-command \
  --document-name "AWS-RunShellScript" \
  --targets "Key=InstanceIds,Values=$(EC2_INSTANCE_ID)" \
  --parameters commands='[
    "aws s3 cp s3://$(S3_BUCKET_NAME)/deployment/employee-frontend/employee-frontend-deploy.tar.gz /tmp/",
    "mkdir -p /var/www/employee-frontend",
    "tar -xzf /tmp/employee-frontend-deploy.tar.gz -C /var/www/employee-frontend",
    "cd /var/www/employee-frontend",
    "npm install",
    "npm run build",
    "pm2 start ecosystem.config.cjs",
    "pm2 save",
    "pm2 startup",
    "sudo cp nginx.conf /etc/nginx/sites-available/employee-frontend",
    "sudo ln -sf /etc/nginx/sites-available/employee-frontend /etc/nginx/sites-enabled/",
    "sudo rm -f /etc/nginx/sites-enabled/default",
    "sudo nginx -t",
    "sudo systemctl restart nginx",
    "rm -f /tmp/employee-frontend-deploy.tar.gz"
  ]' \
  --timeout-seconds 1200 \
  --cloud-watch-output-config '{"CloudWatchOutputEnabled":true}'
```

