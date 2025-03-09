"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface Bill {
  congress: number;
  latestAction: { actionDate: string; text: string };
  number: string;
  originChamber: string;
  title: string;
  type: string;
  url: string;
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("/api/bills");
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
      <h1 className="text-3xl font-bold mb-6 text-center">Government Bills</h1>
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Chamber</TableHead>
                <TableHead>Latest Action</TableHead>
                <TableHead>More Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.number}>
                  <TableCell>{bill.title}</TableCell>
                  <TableCell>{bill.originChamber}</TableCell>
                  <TableCell>
                    {bill.latestAction.text} ({bill.latestAction.actionDate})
                  </TableCell>
                  <TableCell>
                    <a
                      href={bill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Bill
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
