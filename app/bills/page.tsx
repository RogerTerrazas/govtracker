"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Bill {
  congress: number;
  number: string;
  type: string;
  originChamber: string;
  title: string;
  latestAction: { actionDate: string; text: string };
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(`/api/bills`);
        const data = await res.json();
        setBills(data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bills...</p>;
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Congress Bill Updates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill, index) => (
          <Card
            key={index}
            className="shadow-md border border-gray-200 h-[240px] flex flex-col m-2"
          >
            <CardContent className="flex flex-col grow">
              {/* Wrap text content inside a flex-grow div */}
              <div className="grow">
                <h2 className="text-lg font-semibold line-clamp-3">
                  {bill.title}
                </h2>

                <p className="text-sm text-gray-500 truncate">
                  <strong>Chamber:</strong> {bill.originChamber}
                </p>

                <p className="text-sm text-gray-500 line-clamp-2">
                  <strong>Latest Action:</strong> {bill.latestAction.text} (
                  {bill.latestAction.actionDate})
                </p>
              </div>
              {/* Button stays at the bottom */}
              <Link
                href={`/bills/${bill.congress}/${bill.type.toLowerCase()}/${
                  bill.number
                }`}
              >
                <Button variant="default" className="w-full">
                  View Details
                </Button>
              </Link>
              <div />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
