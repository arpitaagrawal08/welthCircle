"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Users, 
  ArrowRight, 
  BarChart3, 
  Receipt, 
  PieChart,
  CreditCard,
  Split,
  Calculator
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto text-center">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl pb-6 gradient-title">
            Your Complete <br /> Finance Solution
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose how you want to manage your finances - track personal expenses with AI-powered insights 
            or split shared expenses with friends and family seamlessly.
          </p>

          {/* Finance Options Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Personal Finance Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Personal Finance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600 mb-6">
                  AI-powered personal finance management with smart insights, 
                  budget tracking, and automated expense categorization.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Receipt className="h-4 w-4 text-blue-500" />
                    <span>AI Receipt Scanner</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PieChart className="h-4 w-4 text-blue-500" />
                    <span>Budget Planning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 text-blue-500" />
                    <span>Multi-Account Support</span>
                  </div>
                </div>

                <Link href="https://welth-hww5.vercel.app/dashboard">
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all"
                  >
                    Start Personal Finance
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Shared Finance Card */}
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Shared Finance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600 mb-6">
                  Split expenses with friends, family, and roommates. 
                  Track shared costs and settle debts effortlessly.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Split className="h-4 w-4 text-purple-500" />
                    <span>Smart Bill Splitting</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Calculator className="h-4 w-4 text-purple-500" />
                    <span>Expense Calculator</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Group Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Receipt className="h-4 w-4 text-purple-500" />
                    <span>Debt Settlement</span>
                  </div>
                </div>

                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white group-hover:shadow-lg transition-all"
                  >
                    Start Shared Finance
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Choose What Fits Your Needs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
                  Perfect for Personal Use
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Individual expense tracking</li>
                  <li>• AI-powered insights</li>
                  <li>• Budget management</li>
                  <li>• Investment tracking</li>
                  <li>• Financial goal setting</li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Perfect for Group Use
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Split bills with friends</li>
                  <li>• Group expense tracking</li>
                  <li>• Debt settlement</li>
                  <li>• Trip expense sharing</li>
                  <li>• Roommate finances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2B+</div>
              <div className="text-blue-100">Transactions Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're managing personal finances or splitting expenses with others, 
            we have the perfect solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="http://localhost:3000/dashboard" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Try Personal Finance
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8">
                Try Shared Finance
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}