import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import getBaseUrl from "../../utils/getBaseUrl";
import axios from "axios";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${getBaseUrl()}/contact`, data)
      .then((res) => {
        Swal.fire({
          width: "25rem",
          color: "white",
          background: "#09090b",
          position: "top-end",
          icon: "success",
          title: "Your Query has been saved",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        setSelected(people[0]);
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };

  const people = [
    { id: 1, name: "Select a subject" },
    { id: 2, name: "General Inquiry" },
    { id: 3, name: "Technical Support" },
    { id: 4, name: "Feedback" },
    { id: 5, name: "Partnership" },
  ];

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(people[0]);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className="rounded-md border-slate-700 border bg-card text-white shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">
            Send us a message
          </h3>
          <p className="text-sm text-gray-400">
            Fill out the form below and we'll respond as soon as possible.
          </p>
        </div>
        <div className="p-6 pt-0">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  First name
                </label>
                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This Field is Required",
                    },
                    minLength: {
                      value: 3,
                      message: "The Min. Length should be 3",
                    },
                  })}
                  id="first-name"
                  className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="John"
                />
                {errors.firstName && (
                  <div className=" text-xs text-pink-500">
                    {errors.firstName.message}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last name
                </label>
                <input
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "This Field is Required",
                    },
                    minLength: {
                      value: 3,
                      message: "The Min. Length should be 3",
                    },
                  })}
                  id="last-name"
                  className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <div className=" text-xs text-pink-500">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>

              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "This Field is Required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                id="email"
                className="flex mt-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <div className="text-xs text-pink-500">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subject
              </label>
              <div className="mt-2">
                <Combobox
                  value={selected}
                  onChange={(value) => setSelected(value)}
                  onClose={() => setQuery("")}
                >
                  <div className="relative">
                    <ComboboxInput
                      {...register("subject", {
                        required: {
                          value: true,
                          message: "This Field is Required",
                        },
                      })}
                      id="subject"
                      className={clsx(
                        "flex my-2 h-9 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      displayValue={(person) => person?.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />

                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                      <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                  </div>
                  {errors.subject && (
                    <div className=" text-xs text-pink-500">
                      {errors.subject.message}
                    </div>
                  )}

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      " w-[var(--input-width)] my-2 rounded-xl border border-white/5 bg-[hsl(var(--background))] p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                      "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                    )}
                  >
                    {filteredPeople.map((person) => (
                      <ComboboxOption
                        key={person.id}
                        value={person}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                      >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                        <div className="text-sm/6 text-white">
                          {person.name}
                        </div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Combobox>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message
              </label>
              <textarea
                {...register("message", {
                  required: {
                    value: true,
                    message: "This Field is Required",
                  },
                  minLength: {
                    value: 20,
                    message: "The Min. Length should be 20",
                  },
                })}
                id="message"
                className="flex mt-2 min-h-[60px] w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm shadow-sm  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Your message here..."
                rows={5}
              ></textarea>
              {errors.message && (
                <div className=" text-xs text-pink-500">
                  {errors.message.message}
                </div>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-black shadow hover:bg-white/90 h-9 px-4 py-2 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
