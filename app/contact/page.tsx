"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const email = "ralphvincentrodriguez@sksu.edu.ph";
const emailHref =
  "mailto:ralphvincentrodriguez@sksu.edu.ph?subject=Portfolio%20inquiry";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: emailHref,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Sultan Kudarat, Philippines",
      href: null,
    },
    {
      icon: Phone,
      label: "Available for",
      value: "Remote Opportunities",
      href: null,
    },
  ];

  return (
    <main className="px-6 mx-auto mt-20 mb-20 max-w-7xl md:px-16 lg:mt-32">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-8 text-6xl font-bold font-incognito">Get In Touch</h1>
        <p className="max-w-3xl mb-12 text-lg text-gray-600 sm:text-xl dark:text-gray-400">
          I&apos;m always interested in hearing about new opportunities, especially
          ambitious or large-scale projects. Whether you&apos;re a company looking to
          hire, or you&apos;re a fellow developer who&apos;d like to collaborate, I&apos;d love
          to hear from you.
        </p>
      </motion.section>

      <div className="grid gap-12 lg:grid-cols-3">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <h2 className="mb-6 text-2xl font-bold font-incognito">
            Let&apos;s Connect
          </h2>
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
              >
                <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                  <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="p-8 bg-white border rounded-lg dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <h2 className="mb-4 text-2xl font-bold font-incognito">
              Send a Message
            </h2>
            <p className="max-w-xl mb-6 text-zinc-600 dark:text-zinc-400">
              Your email app will open with a new draft. Send it from there and
              I&apos;ll receive it directly.
            </p>
            <a
              href={emailHref}
              className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
            >
              <Mail className="w-4 h-4" />
              Open Email
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
