import { Bell, CreditCard, PieChart, Receipt, Users, Wallet, BarChartBig, Cloud } from "lucide-react";

export const FEATURES = [
  {
    title: "Group Expenses",
    Icon: Users,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Create groups for roommates, trips, or events to keep shared expenses organized.",
  },
  {
    title: "Smart Settlements",
    Icon: CreditCard,
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Our algorithm minimizes the number of transactions while settling debts with friends.",
  },
  {
    title: "Expense Analytics",
    Icon: PieChart,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Track trends in both personal and shared spending to gain meaningful financial insights.",
  },
  {
    title: "Payment Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Get reminders for pending payments and stay up-to-date with your expense activity.",
  },
  {
    title: "Flexible Splits",
    Icon: Receipt,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Split equally, by percentage, share, or exact amounts—tailored for every scenario.",
  },
  {
    title: "Personal Expense Tracker",
    Icon: Wallet,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    description:
      "Track your individual expenses alongside shared ones and stay in full control of your budget.",
  },
  {
    title: "Real‑time Updates",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "See expenses and repayments the moment they’re added—personal or group-based.",
  },

  {
  title: "Monthly Summary",
  Icon: BarChartBig,
  bg: "bg-violet-100",
  color: "text-violet-600",
  description:
    "Get a monthly breakdown of your personal and shared expenses to reflect and plan better.",
},
{
  title: "Cloud Sync",
  Icon: Cloud,
  bg: "bg-sky-100",
  color: "text-sky-600",
  description:
    "Access your data anytime across devices. Your expense records stay safe and in sync.",
}

];

export const STEPS = [
  {
    label: "1",
    title: "Track Solo or with a Group",
    description:
      "Start by tracking your own expenses or create a group for roommates, trips, or events.",
  },
  {
    label: "2",
    title: "Add Expenses",
    description:
      "Record personal purchases or shared bills and decide how they should be split.",
  },
  {
    label: "3",
    title: "Settle Up",
    description:
      "Easily see who owes what and log repayments—whether for yourself or your group.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Ye babu rao ka style hai! With Welth, I finally stopped getting confused about who paid for what!",
    name: "Babu Rao",
    image: "/testimonials/babubhaiya.png",
    role: "Rental Property Manager",
  },
  {
    quote:
      "Welth's calculations are so accurate, they're even better than my scheme to double money in 25 days!",
    name: "Raju",
    image: "/testimonials/raju.jpg",
    role: "Stock Market Expert",
  },
  {
    quote:
      "Now that I have Welth, Raju won’t get away with selling my shoes and coat! I’ll add it to his debt!",
    name: "Shyam",
    image: "/testimonials/shyam.png",
    role: "Job Searcher",
  },
];
