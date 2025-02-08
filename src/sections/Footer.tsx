"use client"

import * as React from "react"
import { Button } from "@/components/buttonnew"
import { Input } from "@/components/input"
import { Label } from "@/components/label"
import { Switch } from "@/components/switch"
import { Textarea } from "@/components/textarea"
import LogoIcon from "../assets/Logo_Rev_1_Transparent.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

export default function Footerdemo() {


  return (
    <footer className="relative bg-black text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className=" h-[5rem] -mt-2 w-full inline-flex justify-center items-center ">
            <img src={LogoIcon.src} className="h-full w-full" />
            </div>
            <p className="mb-6 text-muted-foreground text-white/70">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-black text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block transition-colors text-white/70 hover:text-white">
                Home
              </a>
              <a href="#" className="block transition-colors text-white/70 hover:text-white">
                About Us
              </a>
              <a href="#" className="block transition-colors text-white/70 hover:text-white">
                Services
              </a>
              <a href="#" className="block transition-colors text-white/70 hover:text-white">
                Products
              </a>
              <a href="#" className="block transition-colors text-white/70 hover:text-white">
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg text-white font-semibold">Contact Us</h3>
            <address className="space-y-2 text-white/70 text-sm not-italic">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
           
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-center md:flex-row">
          <p className="text-sm text-white/70 text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors text-white/70 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors text-white/70 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="transition-colors text-white/70 hover:text-white">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
      
    </footer>
  )
}