const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const courses = [
  {
    title: 'Docker Masterclass',
    description: 'Master containerization from the ground up. Learn images, volumes, networks, and orchestration.',
    difficulty: 'Beginner',
    modules: [
      {
        title: 'Docker Core Concepts',
        content: 'Docker is a platform for developers and sysadmins to build, run, and share applications with containers. The use of containers to deploy applications is called containerization.',
        duration: 20,
        videoUrl: 'https://www.youtube.com/embed/gAkwW2tuIqE',
        assignments: ['Install Docker Desktop', 'Run a hello-world container', 'List all containers'],
        quiz: [
          {
            question: 'What command is used to list running containers?',
            options: ['docker ls', 'docker ps', 'docker containers', 'docker running'],
            correctAnswer: 1
          },
          {
            question: 'What is a Docker Image?',
            options: ['A running container', 'A read-only template for creating containers', 'A type of virtual machine', 'A cloud storage service'],
            correctAnswer: 1
          },
          {
            question: 'Which component is responsible for running containers?',
            options: ['Docker Hub', 'Docker CLI', 'Docker Engine', 'Docker Compose'],
            correctAnswer: 2
          }
        ],
        resources: [{ name: 'Docker Docs', url: 'https://docs.docker.com/', type: 'Doc' }]
      },
      {
        title: 'Dockerfile Deep Dive',
        content: 'Learn how to automate image creation using Dockerfiles. We will cover FROM, RUN, CMD, and EXPOSE instructions.',
        duration: 35,
        videoUrl: 'https://www.youtube.com/embed/3c-iBn73dDE',
        assignments: ['Write a Dockerfile for a Python app', 'Build and tag your image', 'Use .dockerignore'],
        quiz: [
          {
            question: 'Which instruction sets the default command for a container?',
            options: ['START', 'RUN', 'CMD', 'ENTRY'],
            correctAnswer: 2
          },
          {
            question: 'What does the FROM instruction do?',
            options: ['Sets the working directory', 'Copies files', 'Specifies the base image', 'Exposes a port'],
            correctAnswer: 2
          },
          {
            question: 'Which instruction is used to execute a command during the image build process?',
            options: ['CMD', 'RUN', 'EXEC', 'DO'],
            correctAnswer: 1
          }
        ]
      }
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg'
  },
  {
    title: 'CI/CD with GitHub Actions',
    description: 'Automate your entire software development lifecycle. Build, test, and deploy with every commit.',
    difficulty: 'Intermediate',
    modules: [
      {
        title: 'Introduction to GitHub Actions',
        content: 'GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD.',
        duration: 25,
        videoUrl: 'https://www.youtube.com/embed/R8_veQiYBjI',
        assignments: ['Create a .github/workflows directory', 'Run your first CI pipeline'],
        quiz: [
          {
            question: 'Where are GitHub Actions workflow files stored?',
            options: ['/config', '/.github/workflows', '/actions', '/scripts'],
            correctAnswer: 1
          },
          {
            question: 'What is a "Job" in GitHub Actions?',
            options: ['A single command', 'A set of steps that run on the same runner', 'A type of repository', 'A user role'],
            correctAnswer: 1
          },
          {
            question: 'Which event can trigger a workflow?',
            options: ['push', 'pull_request', 'schedule', 'All of the above'],
            correctAnswer: 3
          }
        ],
        resources: [{ name: 'Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'Doc' }]
      }
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg'
  },
  {
    title: 'Linux for DevOps',
    description: 'The foundation of cloud computing. Master the command line, file systems, and bash scripting.',
    difficulty: 'Beginner',
    modules: [
      {
        title: 'Linux Command Line Basics',
        content: 'Learn how to navigate the file system, manage files, and use pipes and redirects.',
        duration: 30,
        videoUrl: 'https://www.youtube.com/embed/v_Uf8K6AfGg',
        assignments: ['Create a nested directory structure', 'Search for a string in a file using grep'],
        quiz: [
          {
            question: 'Which command is used to change directories?',
            options: ['ls', 'pwd', 'cd', 'mkdir'],
            correctAnswer: 2
          },
          {
            question: 'How do you create a new empty file?',
            options: ['new file', 'touch', 'create', 'make'],
            correctAnswer: 1
          },
          {
            question: 'Which command shows the current working directory?',
            options: ['cd', 'whereami', 'pwd', 'dir'],
            correctAnswer: 2
          }
        ],
        resources: [{ name: 'Linux Command Library', url: 'https://linuxcommand.org/', type: 'Doc' }]
      }
    ],
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'
  }
];

const importData = async () => {
  try {
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('Richer Courses with 3 Questions each Imported Successfully! 🚀');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
