"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ralphvincentrodriguez@sksu.edu.ph",
      href: "mailto:ralphvincentrodriguez@sksu.edu.ph",
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
            {contactInfo.map((item, index) => (
              <div
                key={index}
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
            <h2 className="mb-6 text-2xl font-bold font-incognito">
              Send a Message
            </h2>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800"
              >
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-green-700 dark:text-green-300">
                  Thanks for your message! I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-colors border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border rounded-lg resize-none bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full gap-2 px-8 py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg md:w-auto hover:bg-green-700 disabled:bg-green-400"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
