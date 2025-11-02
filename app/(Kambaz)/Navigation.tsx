"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();

  // Active flags (decouple Courses highlight from its href)
  const dashActive = pathname === "/";                           // highlight on root
  const coursesActive = pathname.startsWith("/Courses");         // highlight only on /Courses/*
  const calendarActive = pathname.startsWith("/Calendar");
  const inboxActive = pathname.startsWith("/Inbox");
  const labsActive = pathname.startsWith("/Labs");

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
    >
      {/* NEU logo */}
      <ListGroup.Item
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width={75} alt="Northeastern University" />
      </ListGroup.Item>

      {/* Account */}
      <ListGroup.Item className="border-0 bg-black text-center">
        <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br /> Account
        </Link>
      </ListGroup.Item>

      {/* Dashboard (root) */}
      <ListGroup.Item className={`border-0 text-center ${dashActive ? "bg-white" : "bg-black"}`}>
        <Link
          href="/"
          id="wd-dashboard-link"
          className={`text-decoration-none ${dashActive ? "text-danger" : "text-white"}`}
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br /> Dashboard
        </Link>
      </ListGroup.Item>

      {/* Courses — links to "/", but only highlights on /Courses/* routes */}
      <ListGroup.Item className={`border-0 text-center ${coursesActive ? "bg-white" : "bg-black"}`}>
        <Link
          href="/"
          id="wd-course-link"
          className={`text-decoration-none ${coursesActive ? "text-danger" : "text-white"}`}
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br /> Courses
        </Link>
      </ListGroup.Item>

      {/* Calendar */}
      <ListGroup.Item className={`border-0 text-center ${calendarActive ? "bg-white" : "bg-black"}`}>
        <Link
          href="/Calendar"
          id="wd-calendar-link"
          className={`text-decoration-none ${calendarActive ? "text-danger" : "text-white"}`}
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br /> Calendar
        </Link>
      </ListGroup.Item>

      {/* Inbox */}
      <ListGroup.Item className={`border-0 text-center ${inboxActive ? "bg-white" : "bg-black"}`}>
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className={`text-decoration-none ${inboxActive ? "text-danger" : "text-white"}`}
        >
          <FaInbox className="fs-1 text-danger" />
          <br /> Inbox
        </Link>
      </ListGroup.Item>

      {/* Labs */}
      <ListGroup.Item className={`border-0 text-center ${labsActive ? "bg-white" : "bg-black"}`}>
        <Link
          href="/Labs"
          id="wd-labs-link"
          className={`text-decoration-none ${labsActive ? "text-danger" : "text-white"}`}
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br /> Labs
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
}
