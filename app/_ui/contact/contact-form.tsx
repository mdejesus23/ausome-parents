'use client';

import { useState } from 'react';
import Button from '@/app/_ui/button';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to API or email service
    console.log(form);
  };

  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-text-secondary mb-4 text-center text-2xl font-bold md:text-3xl">
          We’d love to hear from you
        </h2>
        <p className="mb-12 text-center text-lg text-gray-700">
          Feel free to reach out with any questions, ideas, or just to say hi!
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-800">
            <div>
              <h3 className="mb-1 text-lg font-semibold">Email</h3>
              <p className="text-gray-600">contact@awesomeparents.com</p>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Location</h3>
              <p className="text-gray-600">123 Grace Avenue, Joy City, PH</p>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+63 912 345 6789</p>
            </div>
            <div>
              <h3 className="mb-1 text-lg font-semibold">Follow Us</h3>
              <p className="text-gray-600">Instagram, Facebook, Twitter</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
              className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              onChange={handleChange}
              className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
