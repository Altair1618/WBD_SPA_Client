// Create Responsive Navbar using Shadcn UI

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return <nav className="fixed h-24 w-full bg-white text-white"></nav>;
}
