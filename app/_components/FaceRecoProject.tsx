"use client";

import { useState, useEffect } from "react";
import { Stack } from "./blocks/Stack";
import { ProjectSection } from "./ProjectSection";

type SectionType = "text" | "list" | "features";

function useCardDimensions() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ width: 300, height: 200 }); // mobile
      } else if (w < 1024) {
        setDimensions({ width: 600, height: 400 }); // tablet
      } else {
        setDimensions({ width: 1000, height: 600 }); // desktop
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return dimensions;
}

export function FaceRecoProject() {
  const cardDimensions = useCardDimensions();

  const projectDetails = [
    {
      Title: "Digital Attendance System",
      images: [
        { id: 1, img: "/face.png", alt: "Face Recognition 1" },
        { id: 2, img: "/face2.png", alt: "Face Recognition 2" },
        { id: 3, img: "/face3.png", alt: "Face Recognition 3" },
        { id: 4, img: "/face4.png", alt: "Face Recognition 4" },
        { id: 5, img: "/s.png", alt: "Face Recognition System" },
      ],
      Overview:
        "A face recognition-based attendance management system designed for educational institutions. The system simplifies attendance tracking through facial recognition technology, providing a contactless solution while enabling efficient management of student registrations and attendance records.",
      Technologies: [
        "Frontend: Next.js (15.0.3)",
        "Authentication: NextAuth.js",
        "Face Recognition: face-api.js",
        "Database: MongoDB with Mongoose",
        "UI Components: shadcn/ui",
        "Styling: Tailwind CSS",
        "PDF Generation: jsPDF",
      ],
      KeyFeatures: [
        {
          title: "Face Recognition Authentication",
          points: [
            "Real-time face detection and recognition",
            "Multiple face sample collection for improved accuracy",
            "Secure face data storage and comparison",
          ],
        },
        {
          title: "Role-Based Access Control",
          points: [
            "Admin Dashboard for managing system operations",
            "Student Portal for individual attendance tracking",
            "Secure authentication flows for all users",
          ],
        },
        {
          title: "Attendance Management",
          points: [
            "Create and manage attendance activities",
            "Track attendance in real time",
            "Export attendance reports to CSV format",
          ],
        },
      ],
      Architecture: {
        Frontend: [
          "Responsive design with a mobile-first approach",
          "Component-based architecture using React",
          "Client-side routing with Next.js",
          "Toast notifications for user feedback",
        ],
        Backend: [
          "RESTful API endpoints for seamless operations",
          "Secure handling of face data",
          "MongoDB integration for data persistence",
        ],
      },
      Challenges: [
        "Ensuring accuracy in face recognition for diverse student populations",
        "Optimizing real-time processing for better system performance",
      ],
    },
  ];
  const project = projectDetails[0];
  const sections = [
    {
      title: "Overview",
      content: project.Overview,
      type: "text" as SectionType,
    },
    {
      title: "Technologies",
      content: project.Technologies,
      type: "list" as SectionType,
    },
    {
      title: "Key Features",
      content: project.KeyFeatures,
      type: "features" as SectionType,
    },
    {
      title: "Architecture",
      content: [
        {
          title: "Frontend",
          points: project.Architecture.Frontend,
        },
        {
          title: "Backend",
          points: project.Architecture.Backend,
        },
      ],
      type: "features" as SectionType,
    },
    {
      title: "Challenges",
      content: project.Challenges,
      type: "list" as SectionType,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto sm:text-sm md:px-16 px-6 lg:mt-32 mt-20">
      <h1 className="font-incognito text-5xl font-bold pb-8">
        {project.Title}
      </h1>
      <div className="p-5 bg-zinc-500 flex items-center rounded-3xl">
        <Stack
          randomRotation={false}
          sensitivity={180}
          sendToBackOnClick={true}
          cardDimensions={cardDimensions}
          cardsData={project.images}
        />
      </div>
      {sections.map((section, index) => (
        <ProjectSection
          key={index}
          title={section.title}
          content={section.content}
          type={section.type}
        />
      ))}
    </main>
  );
}
